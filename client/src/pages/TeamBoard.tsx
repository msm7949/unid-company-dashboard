/*
 * TeamBoard — Team Status Board
 * Design: Glassmorphism Operation Hub
 * Shows each team's tasks grouped by status with filters
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import TeamIcon from "@/components/TeamIcon";
import { StatusBadge, PriorityBadge } from "@/components/StatusBadge";
import { teams, tasks, getTeamTaskStats, type Team, type Task } from "@/lib/data";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, User } from "lucide-react";

export default function TeamBoard() {
  const [selectedTeam, setSelectedTeam] = useState<string>("all");

  const filteredTeams = selectedTeam === "all" ? teams : teams.filter((t) => t.id === selectedTeam);

  return (
    <div className="space-y-6">
      {/* Team filter tabs */}
      <div className="flex items-center gap-4 overflow-x-auto pb-2">
        <Tabs value={selectedTeam} onValueChange={setSelectedTeam}>
          <TabsList className="glass h-10 p-1">
            <TabsTrigger value="all" className="text-xs px-3">전체</TabsTrigger>
            {teams.map((team) => (
              <TabsTrigger key={team.id} value={team.id} className="text-xs px-3">
                <span className="w-2 h-2 rounded-full mr-1.5 shrink-0" style={{ backgroundColor: team.color }} />
                {team.shortName}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Team boards */}
      <div className="space-y-6">
        <AnimatePresence mode="wait">
          {filteredTeams.map((team, idx) => (
            <TeamSection key={team.id} team={team} delay={idx * 0.05} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function TeamSection({ team, delay }: { team: Team; delay: number }) {
  const teamTasks = tasks.filter((t) => t.teamId === team.id);
  const stats = getTeamTaskStats(team.id);
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const statusGroups: Record<string, Task[]> = {
    "진행중": teamTasks.filter((t) => t.status === "진행중"),
    "검토중": teamTasks.filter((t) => t.status === "검토중"),
    "대기": teamTasks.filter((t) => t.status === "대기"),
    "완료": teamTasks.filter((t) => t.status === "완료"),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, delay }}
    >
      <GlassCard hover={false} className="p-0 overflow-hidden">
        {/* Team header */}
        <div className="flex items-center gap-4 p-5 border-b border-border/50">
          <TeamIcon team={team} size="lg" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground">{team.name}</h3>
            <p className="text-xs text-muted-foreground">{team.description} · {team.lead} 팀장 · {team.members}명</p>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-2xl font-bold" style={{ color: team.color, fontFamily: "'Outfit', sans-serif" }}>{completionRate}%</p>
            <p className="text-xs text-muted-foreground">완료율</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="px-5 py-3 border-b border-border/30">
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
            <span>진행 <strong className="text-blue-400">{stats.inProgress}</strong></span>
            <span>검토 <strong className="text-amber-400">{stats.reviewing}</strong></span>
            <span>대기 <strong className="text-zinc-400">{stats.pending}</strong></span>
            <span>완료 <strong className="text-emerald-400">{stats.completed}</strong></span>
          </div>
          <Progress value={completionRate} className="h-1.5" />
        </div>

        {/* Task columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-border/30">
          {Object.entries(statusGroups).map(([status, groupTasks]) => (
            <div key={status} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <StatusBadge status={status} />
                <span className="text-xs text-muted-foreground">{groupTasks.length}</span>
              </div>
              <div className="space-y-2">
                {groupTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    whileHover={{ scale: 1.01 }}
                    className="p-3 rounded-lg bg-white/[0.03] border border-border/30 hover:border-border/60 transition-colors"
                  >
                    <p className="text-sm font-medium text-foreground mb-2 leading-snug">{task.title}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <User size={12} />
                        <span>{task.assignee}</span>
                      </div>
                      <PriorityBadge priority={task.priority} />
                    </div>
                    {task.status === "진행중" && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
                          <span>진행률</span>
                          <span>{task.progress}%</span>
                        </div>
                        <Progress value={task.progress} className="h-1" />
                      </div>
                    )}
                  </motion.div>
                ))}
                {groupTasks.length === 0 && (
                  <p className="text-xs text-muted-foreground/50 text-center py-4">작업 없음</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
}
