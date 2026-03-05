/*
 * KPI — Team Performance Metrics
 * Design: Glassmorphism Operation Hub
 * Radial gauges + bar charts + trend indicators per team
 */
import { useState } from "react";
import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import TeamIcon from "@/components/TeamIcon";
import { teams, kpiData, getKPIByTeam } from "@/lib/data";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Minus, Target, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, RadialBarChart, RadialBar, Cell } from "recharts";

const trendIcons = {
  up: <TrendingUp size={14} className="text-emerald-400" />,
  down: <TrendingDown size={14} className="text-rose-400" />,
  stable: <Minus size={14} className="text-zinc-400" />,
};

export default function KPI() {
  const [selectedTeam, setSelectedTeam] = useState<string>("all");

  const displayTeams = selectedTeam === "all" ? teams : teams.filter((t) => t.id === selectedTeam);

  // Overall completion rates for bar chart
  const overallData = teams.map((team) => {
    const teamKpis = getKPIByTeam(team.id);
    const avgCompletion = teamKpis.reduce((sum, k) => {
      const rate = Math.min((k.current / k.target) * 100, 100);
      return sum + rate;
    }, 0) / (teamKpis.length || 1);
    return { name: team.shortName, value: Math.round(avgCompletion), color: team.color };
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Outfit', sans-serif" }}>KPI / 성과 지표</h2>
          <p className="text-sm text-muted-foreground">각 팀별 핵심 성과 지표를 모니터링합니다.</p>
        </div>
        <Tabs value={selectedTeam} onValueChange={setSelectedTeam}>
          <TabsList className="glass h-9 p-1">
            <TabsTrigger value="all" className="text-xs px-3">전체</TabsTrigger>
            {teams.map((team) => (
              <TabsTrigger key={team.id} value={team.id} className="text-xs px-2">
                <span className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: team.color }} />
                {team.shortName}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Overall Performance Chart */}
      {selectedTeam === "all" && (
        <GlassCard delay={0.1} hover={false}>
          <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 size={18} className="text-primary" />
            팀별 KPI 달성률 종합
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={overallData} barSize={32}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ background: "rgba(15,20,40,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", fontSize: "12px" }}
                  labelStyle={{ color: "#94a3b8" }}
                  formatter={(value: number) => [`${value}%`, "달성률"]}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {overallData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} fillOpacity={0.7} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      )}

      {/* Team KPI Cards */}
      <div className="space-y-4">
        {displayTeams.map((team, idx) => {
          const teamKpis = getKPIByTeam(team.id);
          return (
            <GlassCard key={team.id} delay={0.1 + idx * 0.05} hover={false}>
              <div className="flex items-center gap-3 mb-4">
                <TeamIcon team={team} />
                <div>
                  <h3 className="text-base font-semibold text-foreground">{team.name}</h3>
                  <p className="text-xs text-muted-foreground">{team.description}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {teamKpis.map((kpi, j) => {
                  const rate = Math.min((kpi.current / kpi.target) * 100, 120);
                  const isGood = rate >= 90;
                  const radialData = [{ value: Math.min(rate, 100), fill: team.color }];

                  return (
                    <motion.div
                      key={kpi.metric}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + j * 0.05 }}
                      className="p-4 rounded-lg bg-white/[0.03] border border-border/30"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">{kpi.metric}</p>
                          <p className="text-xl font-bold text-foreground" style={{ fontFamily: "'Outfit', sans-serif" }}>
                            {kpi.current}{kpi.unit === "%" || kpi.unit === "점" || kpi.unit === "초" || kpi.unit === "분" ? "" : " "}{kpi.unit}
                          </p>
                        </div>
                        {trendIcons[kpi.trend]}
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Target size={11} />
                          목표: {kpi.target}{kpi.unit}
                        </span>
                        <span className={`font-semibold ${isGood ? "text-emerald-400" : "text-amber-400"}`}>
                          {Math.round(rate)}%
                        </span>
                      </div>
                      {/* Mini progress */}
                      <div className="mt-2 h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(rate, 100)}%` }}
                          transition={{ duration: 0.8, delay: 0.2 + j * 0.1 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: team.color }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
