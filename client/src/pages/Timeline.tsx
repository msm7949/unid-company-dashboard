/*
 * Timeline — Project Timeline
 * Design: Glassmorphism Operation Hub
 * Gantt-style timeline with milestones, sprints, releases, reviews
 */
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import { teams, timelineEvents, getTeamById, type TimelineEvent } from "@/lib/data";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Flag, Rocket, Eye, Zap } from "lucide-react";

const typeConfig: Record<string, { icon: React.ReactNode; label: string; color: string }> = {
  milestone: { icon: <Flag size={14} />, label: "마일스톤", color: "#3B82F6" },
  sprint: { icon: <Zap size={14} />, label: "스프린트", color: "#8B5CF6" },
  release: { icon: <Rocket size={14} />, label: "릴리즈", color: "#10B981" },
  review: { icon: <Eye size={14} />, label: "리뷰", color: "#F59E0B" },
};

export default function Timeline() {
  const [filter, setFilter] = useState<string>("all");

  const filteredEvents = useMemo(() => {
    let events = [...timelineEvents];
    if (filter !== "all") {
      events = events.filter((e) => e.teamId === filter);
    }
    return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [filter]);

  // Group events by month
  const groupedEvents = useMemo(() => {
    const groups: Record<string, TimelineEvent[]> = {};
    filteredEvents.forEach((event) => {
      const month = event.date.slice(0, 7);
      if (!groups[month]) groups[month] = [];
      groups[month].push(event);
    });
    return groups;
  }, [filteredEvents]);

  const today = "2026-03-05";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Outfit', sans-serif" }}>프로젝트 타임라인</h2>
          <p className="text-sm text-muted-foreground">전체 프로젝트 일정과 마일스톤을 확인합니다.</p>
        </div>
        <Tabs value={filter} onValueChange={setFilter}>
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

      {/* Legend */}
      <div className="flex flex-wrap gap-4">
        {Object.entries(typeConfig).map(([key, config]) => (
          <div key={key} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: config.color }} />
            <span>{config.label}</span>
          </div>
        ))}
      </div>

      {/* Gantt-style Timeline */}
      <GlassCard delay={0.1} hover={false}>
        <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
          <Calendar size={18} className="text-primary" />
          간트 차트
        </h3>
        <div className="overflow-x-auto">
          <div className="min-w-[700px]">
            {/* Date header */}
            <div className="flex items-center border-b border-border/30 pb-2 mb-3">
              <div className="w-48 shrink-0 text-xs text-muted-foreground font-medium">이벤트</div>
              <div className="flex-1 flex">
                {Array.from({ length: 28 }, (_, i) => {
                  const day = i + 1;
                  const dateStr = `2026-03-${day.toString().padStart(2, "0")}`;
                  const isToday = dateStr === today;
                  return (
                    <div
                      key={i}
                      className={`flex-1 text-center text-[10px] ${isToday ? "text-primary font-bold" : "text-muted-foreground/50"}`}
                    >
                      {day % 5 === 0 || day === 1 || isToday ? day : ""}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Today indicator */}
            <div className="relative">
              <div
                className="absolute top-0 bottom-0 w-px bg-primary/40 z-10"
                style={{ left: `calc(${((5 - 1) / 28) * 100}% + 192px)` }}
              />
            </div>

            {/* Events */}
            <div className="space-y-1.5">
              {filteredEvents
                .filter((e) => e.date.startsWith("2026-03"))
                .map((event, i) => {
                  const team = getTeamById(event.teamId);
                  const config = typeConfig[event.type];
                  const startDay = parseInt(event.date.split("-")[2]);
                  const endDay = event.endDate ? parseInt(event.endDate.split("-")[2]) : startDay;
                  const leftPercent = ((startDay - 1) / 28) * 100;
                  const widthPercent = Math.max(((endDay - startDay + 1) / 28) * 100, 3);

                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="flex items-center"
                    >
                      <div className="w-48 shrink-0 flex items-center gap-2 pr-3">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: team?.color }} />
                        <span className="text-xs text-foreground truncate">{event.title}</span>
                      </div>
                      <div className="flex-1 relative h-7">
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.4, delay: i * 0.05 }}
                          className="absolute top-1 h-5 rounded-md flex items-center px-2 text-[10px] font-medium text-white/90 origin-left"
                          style={{
                            left: `${leftPercent}%`,
                            width: `${widthPercent}%`,
                            backgroundColor: `${team?.color}90`,
                            minWidth: "24px",
                          }}
                        >
                          {config.icon}
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Vertical Timeline */}
      <div className="space-y-0">
        {Object.entries(groupedEvents).map(([month, events], gi) => (
          <div key={month}>
            <div className="flex items-center gap-3 mb-4 mt-6">
              <span className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {month.replace("2026-", "2026년 ")}월
              </span>
              <div className="flex-1 h-px bg-border/30" />
              <span className="text-xs text-muted-foreground">{events.length}개 이벤트</span>
            </div>
            <div className="relative pl-8">
              {/* Vertical line */}
              <div className="absolute left-3 top-0 bottom-0 w-px bg-border/30" />

              {events.map((event, i) => {
                const team = getTeamById(event.teamId);
                const config = typeConfig[event.type];
                const isPast = event.date < today;

                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: gi * 0.1 + i * 0.04 }}
                    className="relative mb-4 last:mb-0"
                  >
                    {/* Dot */}
                    <div
                      className="absolute -left-5 top-3 w-3 h-3 rounded-full border-2"
                      style={{
                        backgroundColor: isPast ? team?.color : "transparent",
                        borderColor: team?.color,
                      }}
                    />

                    <div className="p-3 rounded-lg bg-white/[0.03] border border-border/30 hover:border-border/50 transition-colors">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium"
                              style={{ backgroundColor: `${config.color}20`, color: config.color }}
                            >
                              {config.icon}
                              {config.label}
                            </span>
                            <span
                              className="text-[10px] font-medium px-1.5 py-0.5 rounded"
                              style={{ backgroundColor: `${team?.color}15`, color: team?.color }}
                            >
                              {team?.shortName}
                            </span>
                          </div>
                          <p className="text-sm font-medium text-foreground">{event.title}</p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {event.date.slice(5)}
                          {event.endDate && ` ~ ${event.endDate.slice(5)}`}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
