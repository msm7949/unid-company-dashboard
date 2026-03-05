/*
 * OrgChart — Organization Chart Visualization
 * Design: Glassmorphism Operation Hub
 * CEO -> 6 teams hierarchy with member details
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import TeamIcon from "@/components/TeamIcon";
import { teams, type Team } from "@/lib/data";
import { ChevronDown, Crown, Users, User } from "lucide-react";

const ORG_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663390601743/LTeck75LWQhf6zPX4YRbnM/org-chart-bg-PBJaYQCMmkf7oHEaHU2QEN.webp";

// Mock member data for each team
const teamMembers: Record<string, { name: string; role: string }[]> = {
  ai: [
    { name: "김지능", role: "팀장" }, { name: "이데이터", role: "시니어 엔지니어" },
    { name: "박분석", role: "ML 엔지니어" }, { name: "최알고", role: "데이터 사이언티스트" },
    { name: "정수집", role: "데이터 엔지니어" }, { name: "한모델", role: "AI 리서처" },
    { name: "윤학습", role: "주니어 엔지니어" }, { name: "장파이프", role: "MLOps 엔지니어" },
  ],
  design: [
    { name: "박디자인", role: "팀장" }, { name: "김비주얼", role: "시니어 디자이너" },
    { name: "이프레임", role: "UX 디자이너" }, { name: "최아이콘", role: "그래픽 디자이너" },
    { name: "정모션", role: "모션 디자이너" }, { name: "한브랜드", role: "브랜드 디자이너" },
  ],
  manage: [
    { name: "이관리", role: "팀장" }, { name: "박서버", role: "시니어 DevOps" },
    { name: "김백업", role: "인프라 엔지니어" }, { name: "최캐시", role: "SRE 엔지니어" },
    { name: "정보안", role: "보안 엔지니어" },
  ],
  improve: [
    { name: "최개선", role: "팀장" }, { name: "김검색", role: "시니어 개발자" },
    { name: "이속도", role: "백엔드 개발자" }, { name: "박다국", role: "풀스택 개발자" },
    { name: "정기능", role: "프론트엔드 개발자" }, { name: "한최적", role: "성능 엔지니어" },
    { name: "윤테스트", role: "QA 엔지니어" },
  ],
  ui: [
    { name: "정유아이", role: "팀장" }, { name: "김접근", role: "시니어 프론트엔드" },
    { name: "이인터", role: "인터랙션 디자이너" }, { name: "박로딩", role: "프론트엔드 개발자" },
    { name: "최반응", role: "프론트엔드 개발자" },
  ],
  rnd: [
    { name: "한리서치", role: "팀장" }, { name: "김백테", role: "퀀트 개발자" },
    { name: "이포트", role: "시니어 리서처" }, { name: "박이상", role: "데이터 분석가" },
    { name: "최섹터", role: "리서치 애널리스트" }, { name: "정전략", role: "퀀트 리서처" },
    { name: "한시장", role: "시장 분석가" }, { name: "윤알파", role: "알고리즘 개발자" },
    { name: "장리스크", role: "리스크 분석가" },
  ],
};

export default function OrgChart() {
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden h-36">
        <img src={ORG_BG} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/50" />
        <div className="relative z-10 flex items-center h-full px-6">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>조직도</h2>
            <p className="text-sm text-muted-foreground">우니드 컴퍼니 한국 증권 프로젝트 조직 구조</p>
          </div>
        </div>
      </div>

      {/* CEO Node */}
      <div className="flex justify-center">
        <GlassCard delay={0.1} glow className="inline-flex items-center gap-4 px-6 py-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <Crown size={22} className="text-primary" />
          </div>
          <div>
            <p className="text-lg font-bold text-foreground" style={{ fontFamily: "'Outfit', sans-serif" }}>CEO</p>
            <p className="text-xs text-muted-foreground">우니드 컴퍼니 대표</p>
          </div>
        </GlassCard>
      </div>

      {/* Connecting line */}
      <div className="flex justify-center">
        <div className="w-px h-8 bg-gradient-to-b from-primary/40 to-border/30" />
      </div>

      {/* Horizontal connector */}
      <div className="hidden lg:flex justify-center">
        <div className="w-[85%] h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
      </div>

      {/* Team nodes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams.map((team, i) => (
          <motion.div
            key={team.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.06 }}
          >
            <div
              className={`glass rounded-xl overflow-hidden transition-all duration-300 ${
                expandedTeam === team.id ? "ring-1" : ""
              }`}
              style={{ borderColor: expandedTeam === team.id ? `${team.color}40` : undefined, boxShadow: expandedTeam === team.id ? `0 0 20px ${team.color}10` : undefined }}
            >
              {/* Team header */}
              <button
                onClick={() => setExpandedTeam(expandedTeam === team.id ? null : team.id)}
                className="w-full flex items-center gap-3 p-4 hover:bg-white/[0.03] transition-colors"
              >
                <TeamIcon team={team} />
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-foreground">{team.name}</p>
                  <p className="text-xs text-muted-foreground">{team.lead} 팀장</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users size={12} />
                    {team.members}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-muted-foreground transition-transform duration-200 ${
                      expandedTeam === team.id ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Expanded member list */}
              <AnimatePresence>
                {expandedTeam === team.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-border/30 p-4 space-y-2">
                      {teamMembers[team.id]?.map((member, j) => (
                        <motion.div
                          key={member.name}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: j * 0.03 }}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.03]"
                        >
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium"
                            style={{ backgroundColor: `${team.color}15`, color: team.color }}
                          >
                            {member.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-foreground">{member.name}</p>
                            <p className="text-[11px] text-muted-foreground">{member.role}</p>
                          </div>
                          {member.role === "팀장" && (
                            <Crown size={12} style={{ color: team.color }} />
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <GlassCard delay={0.4} className="p-4 text-center">
          <p className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Outfit', sans-serif" }}>6</p>
          <p className="text-xs text-muted-foreground mt-1">전문 팀</p>
        </GlassCard>
        <GlassCard delay={0.45} className="p-4 text-center">
          <p className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {teams.reduce((s, t) => s + t.members, 0)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">총 인원</p>
        </GlassCard>
        <GlassCard delay={0.5} className="p-4 text-center">
          <p className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Outfit', sans-serif" }}>10</p>
          <p className="text-xs text-muted-foreground mt-1">협업 연결</p>
        </GlassCard>
        <GlassCard delay={0.55} className="p-4 text-center">
          <p className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Outfit', sans-serif" }}>1</p>
          <p className="text-xs text-muted-foreground mt-1">프로젝트</p>
        </GlassCard>
      </div>
    </div>
  );
}
