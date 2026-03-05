/*
 * Collaboration — Team Collaboration Visualization
 * Design: Glassmorphism Operation Hub
 * Hexagonal network visualization + collaboration matrix + parallel workflow
 */
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import TeamIcon from "@/components/TeamIcon";
import { teams, collaborationLinks, tasks, getTeamById } from "@/lib/data";
import { GitBranch, ArrowRight, Zap } from "lucide-react";

const COLLAB_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663390601743/LTeck75LWQhf6zPX4YRbnM/team-collaboration-Lbgm9ukorxir5NNBBscNXu.webp";

export default function Collaboration() {
  const [hoveredTeam, setHoveredTeam] = useState<string | null>(null);

  // Build collaboration matrix
  const matrix = useMemo(() => {
    const m: Record<string, Record<string, number>> = {};
    teams.forEach((t) => {
      m[t.id] = {};
      teams.forEach((t2) => { m[t.id][t2.id] = 0; });
    });
    collaborationLinks.forEach((link) => {
      m[link.from][link.to] = link.strength;
      m[link.to][link.from] = link.strength;
    });
    return m;
  }, []);

  const filteredLinks = hoveredTeam
    ? collaborationLinks.filter((l) => l.from === hoveredTeam || l.to === hoveredTeam)
    : collaborationLinks;

  // Parallel workflow data
  const parallelWorkflows = teams.map((team) => {
    const teamTasks = tasks.filter((t) => t.teamId === team.id && t.status === "진행중");
    return { team, activeTasks: teamTasks.length, tasks: teamTasks };
  });

  return (
    <div className="space-y-6">
      {/* Hero with collaboration image */}
      <div className="relative rounded-2xl overflow-hidden h-40">
        <img src={COLLAB_BG} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/40" />
        <div className="relative z-10 flex items-center h-full px-6">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>팀 간 협업 현황</h2>
            <p className="text-sm text-muted-foreground">6개 팀의 병렬 작업 흐름과 협업 강도를 시각화합니다.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Collaboration Network */}
        <GlassCard delay={0.1} hover={false}>
          <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
            <GitBranch size={18} className="text-primary" />
            협업 네트워크
          </h3>
          <div className="space-y-2">
            {teams.map((team) => (
              <motion.div
                key={team.id}
                onHoverStart={() => setHoveredTeam(team.id)}
                onHoverEnd={() => setHoveredTeam(null)}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                  hoveredTeam === team.id ? "bg-white/[0.06]" : "bg-white/[0.02]"
                }`}
              >
                <TeamIcon team={team} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{team.name}</p>
                  <div className="flex gap-1 mt-1">
                    {teams.filter((t2) => t2.id !== team.id && matrix[team.id][t2.id] > 0).map((t2) => (
                      <span
                        key={t2.id}
                        className="w-3 h-3 rounded-full border border-white/10"
                        style={{ backgroundColor: `${t2.color}60` }}
                        title={`${t2.name}: 강도 ${matrix[team.id][t2.id]}`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">
                  {collaborationLinks.filter((l) => l.from === team.id || l.to === team.id).length}개 연결
                </span>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        {/* Collaboration Matrix */}
        <GlassCard delay={0.15} hover={false}>
          <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
            <Zap size={18} className="text-amber-400" />
            협업 강도 매트릭스
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr>
                  <th className="p-2 text-left text-muted-foreground"></th>
                  {teams.map((t) => (
                    <th key={t.id} className="p-2 text-center">
                      <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: t.color }} />
                      <span className="block text-muted-foreground mt-0.5">{t.shortName}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {teams.map((row) => (
                  <tr key={row.id}>
                    <td className="p-2 text-muted-foreground font-medium whitespace-nowrap">{row.shortName}</td>
                    {teams.map((col) => {
                      const val = matrix[row.id][col.id];
                      return (
                        <td key={col.id} className="p-1.5 text-center">
                          {row.id === col.id ? (
                            <span className="w-8 h-8 rounded-md bg-white/[0.03] flex items-center justify-center mx-auto text-muted-foreground/30">—</span>
                          ) : val > 0 ? (
                            <motion.span
                              whileHover={{ scale: 1.15 }}
                              className="w-8 h-8 rounded-md flex items-center justify-center mx-auto text-foreground font-semibold"
                              style={{
                                backgroundColor: `${row.color}${Math.round((val / 10) * 40 + 10).toString(16).padStart(2, "0")}`,
                              }}
                            >
                              {val}
                            </motion.span>
                          ) : (
                            <span className="w-8 h-8 rounded-md bg-white/[0.02] flex items-center justify-center mx-auto text-muted-foreground/20">0</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>

      {/* Active Collaboration Flows */}
      <GlassCard delay={0.2} hover={false}>
        <h3 className="text-base font-semibold text-foreground mb-4">활성 협업 흐름</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredLinks.sort((a, b) => b.strength - a.strength).map((link, i) => {
            const fromTeam = getTeamById(link.from);
            const toTeam = getTeamById(link.to);
            if (!fromTeam || !toTeam) return null;
            return (
              <motion.div
                key={`${link.from}-${link.to}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] border border-border/30"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold" style={{ backgroundColor: `${fromTeam.color}20`, color: fromTeam.color }}>
                  {fromTeam.shortName}
                </div>
                <ArrowRight size={14} className="text-muted-foreground shrink-0" />
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold" style={{ backgroundColor: `${toTeam.color}20`, color: toTeam.color }}>
                  {toTeam.shortName}
                </div>
                <div className="flex-1 min-w-0 ml-1">
                  <p className="text-xs font-medium text-foreground truncate">{link.label}</p>
                  <p className="text-[10px] text-muted-foreground">{link.activeProjects}개 프로젝트 · 강도 {link.strength}/10</p>
                </div>
                {/* Strength bar */}
                <div className="w-12 h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${(link.strength / 10) * 100}%`, backgroundColor: fromTeam.color }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </GlassCard>

      {/* Parallel Workflow Visualization */}
      <GlassCard delay={0.25} hover={false}>
        <h3 className="text-base font-semibold text-foreground mb-4">병렬 작업 흐름</h3>
        <div className="space-y-3">
          {parallelWorkflows.map((wf, i) => (
            <motion.div
              key={wf.team.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i }}
              className="flex items-center gap-4"
            >
              <div className="w-24 shrink-0 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: wf.team.color }} />
                <span className="text-xs font-medium text-foreground truncate">{wf.team.shortName}</span>
              </div>
              <div className="flex-1 flex gap-1.5 items-center overflow-x-auto py-1">
                {wf.tasks.map((task, j) => (
                  <motion.div
                    key={task.id}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.1 * j + 0.05 * i }}
                    className="h-8 rounded-md flex items-center px-3 text-[11px] font-medium text-foreground/90 whitespace-nowrap shrink-0"
                    style={{
                      backgroundColor: `${wf.team.color}15`,
                      borderLeft: `3px solid ${wf.team.color}`,
                      minWidth: `${Math.max(task.progress * 1.5, 80)}px`,
                    }}
                  >
                    {task.title.length > 20 ? task.title.slice(0, 20) + "..." : task.title}
                  </motion.div>
                ))}
                {wf.tasks.length === 0 && (
                  <span className="text-xs text-muted-foreground/40 italic">진행중 작업 없음</span>
                )}
              </div>
              <span className="text-xs text-muted-foreground shrink-0 w-16 text-right">{wf.activeTasks}건 진행</span>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
