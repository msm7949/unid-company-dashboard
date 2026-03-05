/*
 * CommLog — Communication Log
 * Design: Glassmorphism Operation Hub
 * Chat-style communication log between teams with filters
 */
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import { teams, commMessages, getTeamById } from "@/lib/data";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, ArrowRight, AlertTriangle, RefreshCw, Eye, Send } from "lucide-react";

const typeConfig: Record<string, { icon: React.ReactNode; label: string; color: string }> = {
  request: { icon: <Send size={12} />, label: "요청", color: "#3B82F6" },
  update: { icon: <RefreshCw size={12} />, label: "업데이트", color: "#10B981" },
  review: { icon: <Eye size={12} />, label: "리뷰", color: "#8B5CF6" },
  alert: { icon: <AlertTriangle size={12} />, label: "알림", color: "#F43F5E" },
};

export default function CommLog() {
  const [teamFilter, setTeamFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filteredMessages = useMemo(() => {
    let msgs = [...commMessages];
    if (teamFilter !== "all") {
      msgs = msgs.filter((m) => m.fromTeam === teamFilter || m.toTeam === teamFilter);
    }
    if (typeFilter !== "all") {
      msgs = msgs.filter((m) => m.type === typeFilter);
    }
    return msgs;
  }, [teamFilter, typeFilter]);

  // Stats - count from all messages, not filtered
  const stats = useMemo(() => ({
    total: commMessages.length,
    request: commMessages.filter((m) => m.type === "request").length,
    update: commMessages.filter((m) => m.type === "update").length,
    review: commMessages.filter((m) => m.type === "review").length,
    alert: commMessages.filter((m) => m.type === "alert").length,
  }), []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Outfit', sans-serif" }}>커뮤니케이션 로그</h2>
          <p className="text-sm text-muted-foreground">팀 간 커뮤니케이션 기록을 확인합니다.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Tabs value={teamFilter} onValueChange={setTeamFilter}>
            <TabsList className="glass h-9 p-1">
              <TabsTrigger value="all" className="text-xs px-3">전체 팀</TabsTrigger>
              {teams.map((team) => (
                <TabsTrigger key={team.id} value={team.id} className="text-xs px-2">
                  <span className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: team.color }} />
                  {team.shortName}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <Tabs value={typeFilter} onValueChange={setTypeFilter}>
            <TabsList className="glass h-9 p-1">
              <TabsTrigger value="all" className="text-xs px-3">전체 유형</TabsTrigger>
              {Object.entries(typeConfig).map(([key, config]) => (
                <TabsTrigger key={key} value={key} className="text-xs px-2">
                  <span className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: config.color }} />
                  {config.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <GlassCard delay={0.05} className="p-3 text-center">
          <p className="text-lg font-bold text-foreground" style={{ fontFamily: "'Outfit', sans-serif" }}>{stats.total}</p>
          <p className="text-[11px] text-muted-foreground">전체 메시지</p>
        </GlassCard>
        {Object.entries(typeConfig).map(([key, config], i) => (
          <GlassCard key={key} delay={0.1 + i * 0.03} className="p-3 text-center">
            <p className="text-lg font-bold" style={{ color: config.color, fontFamily: "'Outfit', sans-serif" }}>
              {stats[key as keyof typeof stats]}
            </p>
            <p className="text-[11px] text-muted-foreground">{config.label}</p>
          </GlassCard>
        ))}
      </div>

      {/* Message list */}
      <GlassCard delay={0.15} hover={false}>
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare size={18} className="text-primary" />
          <h3 className="text-base font-semibold text-foreground">메시지 로그</h3>
          <span className="text-xs text-muted-foreground ml-auto">{filteredMessages.length}건</span>
        </div>

        <div className="space-y-3">
          {filteredMessages.map((msg, i) => {
            const fromTeam = getTeamById(msg.fromTeam);
            const toTeam = getTeamById(msg.toTeam);
            const config = typeConfig[msg.type];

            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="p-4 rounded-lg bg-white/[0.03] border border-border/30 hover:border-border/50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  {/* From team indicator */}
                  <div
                    className="w-2 rounded-full shrink-0 mt-1"
                    style={{ backgroundColor: fromTeam?.color, height: "auto", minHeight: 40, alignSelf: "stretch" }}
                  />

                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-center flex-wrap gap-2 mb-2">
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded"
                        style={{ backgroundColor: `${fromTeam?.color}15`, color: fromTeam?.color }}
                      >
                        {fromTeam?.name}
                      </span>
                      <ArrowRight size={12} className="text-muted-foreground" />
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded"
                        style={{ backgroundColor: `${toTeam?.color}15`, color: toTeam?.color }}
                      >
                        {toTeam?.name}
                      </span>
                      <span
                        className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded ml-auto"
                        style={{ backgroundColor: `${config.color}15`, color: config.color }}
                      >
                        {config.icon}
                        {config.label}
                      </span>
                    </div>

                    {/* Message body */}
                    <p className="text-sm text-foreground/90 leading-relaxed">{msg.message}</p>

                    {/* Timestamp */}
                    <p className="text-[11px] text-muted-foreground mt-2">{msg.timestamp}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {filteredMessages.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <MessageSquare size={32} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm">해당 조건의 메시지가 없습니다.</p>
            </div>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
