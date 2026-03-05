/*
 * DashboardLayout — Glassmorphism Operation Hub
 * Persistent sidebar navigation + top bar + main content area
 */
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  GitBranch,
  Network,
  BarChart3,
  Calendar,
  MessageSquare,
  TrendingUp,
  Moon,
  Sun,
  Menu,
  X,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663390601743/LTeck75LWQhf6zPX4YRbnM/unid-logo-abstract-QQ2YvPKn6e4n6Rnq796rk2.webp";

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { path: "/", label: "대시보드", icon: <LayoutDashboard size={20} /> },
  { path: "/teams", label: "팀별 현황", icon: <Users size={20} /> },
  { path: "/collaboration", label: "협업 현황", icon: <GitBranch size={20} /> },
  { path: "/org-chart", label: "조직도", icon: <Network size={20} /> },
  { path: "/kpi", label: "KPI 지표", icon: <BarChart3 size={20} /> },
  { path: "/timeline", label: "타임라인", icon: <Calendar size={20} /> },
  { path: "/comm-log", label: "커뮤니케이션", icon: <MessageSquare size={20} /> },
  { path: "/stock", label: "증권 대시보드", icon: <TrendingUp size={20} /> },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentPage = navItems.find((item) => item.path === location)?.label || "대시보드";

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        <motion.aside
          initial={false}
          animate={{ width: sidebarOpen ? 260 : 72 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className={`
            fixed lg:relative z-50 h-full flex flex-col
            glass-strong
            ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            transition-transform lg:transition-none duration-300
          `}
          style={{ minWidth: sidebarOpen ? 260 : 72 }}
        >
          {/* Logo area */}
          <div className="flex items-center gap-3 px-4 h-16 shrink-0">
            <img src={LOGO_URL} alt="UNID" className="w-9 h-9 rounded-lg object-cover" />
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  <h1 className="font-display text-lg font-bold tracking-tight text-foreground" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    UNID Company
                  </h1>
                  <p className="text-[10px] text-muted-foreground -mt-0.5 tracking-wider uppercase">
                    Operation Hub
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Separator className="opacity-30" />

          {/* Navigation */}
          <ScrollArea className="flex-1 py-3">
            <nav className="flex flex-col gap-1 px-2">
              {navItems.map((item) => {
                const isActive = location === item.path;
                return (
                  <Link key={item.path} href={item.path}>
                    <motion.div
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                        transition-all duration-200 relative group
                        ${isActive
                          ? "bg-primary/15 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                        }
                      `}
                      onClick={() => setMobileOpen(false)}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-primary rounded-r-full"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                      <span className={`shrink-0 ${isActive ? "text-primary" : ""}`}>{item.icon}</span>
                      <AnimatePresence>
                        {sidebarOpen && (
                          <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            className="overflow-hidden whitespace-nowrap"
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </Link>
                );
              })}
            </nav>
          </ScrollArea>

          {/* Sidebar footer */}
          <div className="p-3 shrink-0">
            <Separator className="opacity-30 mb-3" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-full justify-center text-muted-foreground hover:text-foreground hidden lg:flex"
            >
              <ChevronLeft
                size={16}
                className={`transition-transform duration-300 ${!sidebarOpen ? "rotate-180" : ""}`}
              />
              {sidebarOpen && <span className="ml-2 text-xs">사이드바 접기</span>}
            </Button>
          </div>
        </motion.aside>
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-16 shrink-0 flex items-center justify-between px-4 lg:px-6 glass-subtle border-b border-border/50">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-muted-foreground"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={20} />
            </Button>
            <div>
              <h2 className="text-base font-semibold text-foreground" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {currentPage}
              </h2>
              <p className="text-xs text-muted-foreground hidden sm:block">
                우니드 컴퍼니 · 한국 증권 프로젝트
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-xs text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>시스템 정상</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-foreground"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 lg:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
