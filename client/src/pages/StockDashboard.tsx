/*
 * StockDashboard — Korean Stock Market Dashboard
 * Design: Glassmorphism Operation Hub
 * Market indices, watchlist, sector performance, KOSPI chart
 */
import { useState } from "react";
import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import {
  stockIndices,
  watchlistStocks,
  sectorPerformance,
  kospiChartData,
} from "@/lib/data";
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Activity,
  PieChart,
  Star,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  CartesianGrid,
} from "recharts";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const STOCK_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663390601743/LTeck75LWQhf6zPX4YRbnM/stock-chart-bg-K4AoDNsrEmwfwxwmsKhnk6.webp";

export default function StockDashboard() {
  const [chartPeriod, setChartPeriod] = useState("1M");

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden h-40">
        <img src={STOCK_BG} alt="" className="absolute inset-0 w-full h-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/40" />
        <div className="relative z-10 flex items-center h-full px-6">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
              한국 증권 대시보드
            </h2>
            <p className="text-sm text-muted-foreground">주요 지수, 관심 종목, 섹터별 성과를 모니터링합니다.</p>
          </div>
        </div>
      </div>

      {/* Market Indices */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stockIndices.map((idx, i) => (
          <GlassCard key={idx.name} delay={0.05 + i * 0.05} glow={i === 0} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground font-medium">{idx.name}</span>
              {idx.change >= 0 ? (
                <TrendingUp size={16} className="text-emerald-400" />
              ) : (
                <TrendingDown size={16} className="text-rose-400" />
              )}
            </div>
            <p className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {idx.value.toLocaleString()}
            </p>
            <div className={`flex items-center gap-1 mt-1 text-xs ${idx.change >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
              {idx.change >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              <span>{idx.change >= 0 ? "+" : ""}{idx.change.toFixed(2)}</span>
              <span>({idx.changePercent >= 0 ? "+" : ""}{idx.changePercent.toFixed(2)}%)</span>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Main chart + Sector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* KOSPI Chart */}
        <div className="lg:col-span-2">
          <GlassCard delay={0.15} hover={false}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                <Activity size={18} className="text-primary" />
                KOSPI 추이
              </h3>
              <Tabs value={chartPeriod} onValueChange={setChartPeriod}>
                <TabsList className="glass h-8 p-0.5">
                  {["1W", "1M", "3M"].map((p) => (
                    <TabsTrigger key={p} value={p} className="text-[11px] px-2.5 h-7">{p}</TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={kospiChartData}>
                  <defs>
                    <linearGradient id="kospiGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.35} />
                      <stop offset="50%" stopColor="#3B82F6" stopOpacity={0.1} />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b", fontSize: 11 }}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    domain={["dataMin - 20", "dataMax + 20"]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b", fontSize: 11 }}
                    width={50}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(10,14,39,0.95)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "10px",
                      fontSize: "12px",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                    }}
                    labelStyle={{ color: "#94a3b8", marginBottom: "4px" }}
                    itemStyle={{ color: "#3B82F6" }}
                    formatter={(value: number) => [value.toLocaleString(), "KOSPI"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#3B82F6"
                    strokeWidth={2.5}
                    fill="url(#kospiGradient)"
                    dot={false}
                    activeDot={{ r: 5, fill: "#3B82F6", stroke: "#0A0E27", strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Sector Performance */}
        <div>
          <GlassCard delay={0.2} hover={false}>
            <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
              <PieChart size={18} className="text-violet-400" />
              섹터별 성과
            </h3>
            <div className="space-y-2.5">
              {sectorPerformance.map((sector, i) => (
                <motion.div
                  key={sector.sector}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.04 }}
                  className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/[0.03] transition-colors"
                >
                  <span className="text-sm text-foreground font-medium w-20 shrink-0">{sector.sector}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${Math.min(Math.abs(sector.change) * 20, 100)}%`,
                        backgroundColor: sector.change >= 0 ? "#10B981" : "#F43F5E",
                      }}
                    />
                  </div>
                  <span className={`text-xs font-semibold w-14 text-right ${sector.change >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                    {sector.change >= 0 ? "+" : ""}{sector.change}%
                  </span>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Watchlist */}
      <GlassCard delay={0.25} hover={false}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Star size={18} className="text-amber-400" />
            관심 종목
          </h3>
          <span className="text-xs text-muted-foreground">{watchlistStocks.length}종목</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left text-xs text-muted-foreground font-medium py-2.5 px-3">종목</th>
                <th className="text-right text-xs text-muted-foreground font-medium py-2.5 px-3">현재가</th>
                <th className="text-right text-xs text-muted-foreground font-medium py-2.5 px-3">등락</th>
                <th className="text-right text-xs text-muted-foreground font-medium py-2.5 px-3">등락률</th>
                <th className="text-right text-xs text-muted-foreground font-medium py-2.5 px-3 hidden sm:table-cell">거래량</th>
              </tr>
            </thead>
            <tbody>
              {watchlistStocks.map((stock, i) => (
                <motion.tr
                  key={stock.symbol}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.03 }}
                  className="border-b border-border/20 hover:bg-white/[0.03] transition-colors"
                >
                  <td className="py-3 px-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{stock.name}</p>
                      <p className="text-[11px] text-muted-foreground">{stock.symbol}</p>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {stock.price.toLocaleString()}
                    </span>
                  </td>
                  <td className={`py-3 px-3 text-right text-sm ${stock.change >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                    <span className="flex items-center justify-end gap-0.5">
                      {stock.change >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                      {stock.change >= 0 ? "+" : ""}{stock.change.toLocaleString()}
                    </span>
                  </td>
                  <td className={`py-3 px-3 text-right text-sm font-medium ${stock.change >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                    {stock.changePercent >= 0 ? "+" : ""}{stock.changePercent.toFixed(2)}%
                  </td>
                  <td className="py-3 px-3 text-right text-sm text-muted-foreground hidden sm:table-cell">
                    {stock.volume}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Volume chart */}
      <GlassCard delay={0.3} hover={false}>
        <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
          <BarChart3 size={18} className="text-cyan-400" />
          섹터별 거래량
        </h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sectorPerformance} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="sector" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  background: "rgba(10,14,39,0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  fontSize: "12px",
                }}
                labelStyle={{ color: "#94a3b8" }}
                formatter={(value: string) => [value, "거래량"]}
              />
              <Bar dataKey="volume" radius={[6, 6, 0, 0]}>
                {sectorPerformance.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={entry.change >= 0 ? "#10B981" : "#F43F5E"}
                    fillOpacity={0.6}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
}
