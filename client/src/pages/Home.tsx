/*
 * Home — Dashboard Overview
 * Design: Glassmorphism Operation Hub
 * Hero banner + team summary cards + quick stats + recent activity
 */
import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import TeamIcon from "@/components/TeamIcon";
import { StatusBadge } from "@/components/StatusBadge";
import { teams, tasks, stockIndices, getTeamTaskStats, commMessages } from "@/lib/data";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Users, CheckCircle2, Clock, AlertCircle, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { kospiChartData } from "@/lib/data";
import { Link } from "wouter";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663390601743/LTeck75LWQhf6zPX4YRbnM/hero-bg-E2aG4dUyFrTdrgxeBikzSP.webp";

const totalStats = {
  totalMembers: teams.reduce((sum, t) => sum + t.members, 0),
  totalTasks: tasks.length,
  completedTasks: tasks.filter((t) => t.status === "완료").length,
  inProgressTasks: tasks.filter((t) => t.status === "진행중").length,
};

const miniChartData = kospiChartData.slice(-10);

export default function Home() {
  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-2xl overflow-hidden h-44 sm:h-52"
      >
        <img src={HERO_BG} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
        <div className="relative z-10 flex flex-col justify-center h-full px-6 sm:px-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
            UNID Operation Hub
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-lg">
            6개 팀 병렬 협업 현황을 실시간으로 모니터링하고, 한국 증권 시장 데이터를 한눈에 확인하세요.
          </p>
          <div className="flex gap-3 mt-4">
            <Link href="/teams">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary/20 text-primary text-sm font-medium hover:bg-primary/30 transition-colors">
                팀 현황 보기 <ArrowUpRight size={14} />
              </span>
            </Link>
            <Link href="/stock">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/5 text-foreground text-sm font-medium hover:bg-white/10 transition-colors">
                증권 대시보드
              </span>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard delay={0.05} className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground font-medium">전체 인원</span>
            <Users size={16} className="text-primary" />
          </div>
          <p className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Outfit', sans-serif" }}>{totalStats.totalMembers}</p>
          <p className="text-xs text-muted-foreground mt-1">6개 팀</p>
        </GlassCard>
        <GlassCard delay={0.1} className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground font-medium">진행중 작업</span>
            <Clock size={16} className="text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Outfit', sans-serif" }}>{totalStats.inProgressTasks}</p>
          <p className="text-xs text-muted-foreground mt-1">전체 {totalStats.totalTasks}건 중</p>
        </GlassCard>
        <GlassCard delay={0.15} className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground font-medium">완료된 작업</span>
            <CheckCircle2 size={16} className="text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Outfit', sans-serif" }}>{totalStats.completedTasks}</p>
          <p className="text-xs text-emerald-400 mt-1">
            {Math.round((totalStats.completedTasks / totalStats.totalTasks) * 100)}% 달성
          </p>
        </GlassCard>
        <GlassCard delay={0.2} className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground font-medium">KOSPI</span>
            <TrendingUp size={16} className="text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {stockIndices[0].value.toLocaleString()}
          </p>
          <p className={`text-xs mt-1 ${stockIndices[0].change >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
            {stockIndices[0].change >= 0 ? "+" : ""}{stockIndices[0].change} ({stockIndices[0].changePercent}%)
          </p>
        </GlassCard>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Overview Cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground">팀별 진행 현황</h3>
            <Link href="/teams">
              <span className="text-xs text-primary hover:underline">전체 보기</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {teams.map((team, i) => {
              const stats = getTeamTaskStats(team.id);
              const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
              return (
                <GlassCard key={team.id} delay={0.1 + i * 0.05} className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <TeamIcon team={team} size="sm" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-foreground truncate">{team.name}</h4>
                      <p className="text-[11px] text-muted-foreground">{team.lead} · {team.members}명</p>
                    </div>
                    <span className="text-xs font-semibold" style={{ color: team.color }}>{completionRate}%</span>
                  </div>
                  <Progress value={completionRate} className="h-1.5 mb-2" />
                  <div className="flex gap-3 text-[11px] text-muted-foreground">
                    <span>진행 {stats.inProgress}</span>
                    <span>완료 {stats.completed}</span>
                    <span>대기 {stats.pending}</span>
                    {stats.reviewing > 0 && <span>검토 {stats.reviewing}</span>}
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>

        {/* Right sidebar: Market + Recent Messages */}
        <div className="space-y-4">
          {/* Mini Market Widget */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-foreground">시장 현황</h3>
              <Link href="/stock">
                <span className="text-xs text-primary hover:underline">상세 보기</span>
              </Link>
            </div>
            <GlassCard delay={0.15} className="p-4">
              <div className="h-24 mb-3">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={miniChartData}>
                    <defs>
                      <linearGradient id="kospiGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="value" stroke="#3B82F6" fill="url(#kospiGrad)" strokeWidth={2} />
                    <Tooltip
                      contentStyle={{ background: "rgba(15,20,40,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", fontSize: "12px" }}
                      labelStyle={{ color: "#94a3b8" }}
                      itemStyle={{ color: "#3B82F6" }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {stockIndices.map((idx) => (
                  <div key={idx.name} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{idx.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{idx.value.toLocaleString()}</span>
                      <span className={`flex items-center text-xs ${idx.change >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                        {idx.change >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                        {Math.abs(idx.changePercent)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Recent Communications */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-foreground">최근 커뮤니케이션</h3>
              <Link href="/comm-log">
                <span className="text-xs text-primary hover:underline">전체 보기</span>
              </Link>
            </div>
            <GlassCard delay={0.2} className="p-4">
              <div className="space-y-3">
                {commMessages.slice(0, 5).map((msg) => {
                  const fromTeam = teams.find((t) => t.id === msg.fromTeam);
                  const toTeam = teams.find((t) => t.id === msg.toTeam);
                  return (
                    <div key={msg.id} className="flex gap-3 text-xs">
                      <div className="w-1.5 rounded-full shrink-0 mt-1" style={{ backgroundColor: fromTeam?.color, height: "auto", minHeight: 16 }} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1 text-muted-foreground mb-0.5">
                          <span className="font-medium" style={{ color: fromTeam?.color }}>{fromTeam?.shortName}</span>
                          <span>→</span>
                          <span className="font-medium" style={{ color: toTeam?.color }}>{toTeam?.shortName}</span>
                          <span className="ml-auto text-[10px]">{msg.timestamp.split(" ")[1]}</span>
                        </div>
                        <p className="text-foreground/80 truncate">{msg.message}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
