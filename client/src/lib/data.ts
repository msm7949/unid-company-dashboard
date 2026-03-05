/*
 * UNID Company Dashboard - Data Layer
 * Design: Glassmorphism Operation Hub
 * All mock data for 6 teams parallel collaboration dashboard
 */

export interface Team {
  id: string;
  name: string;
  shortName: string;
  color: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  icon: string;
  lead: string;
  members: number;
  description: string;
}

export interface Task {
  id: string;
  teamId: string;
  title: string;
  status: "진행중" | "완료" | "대기" | "검토중";
  priority: "높음" | "중간" | "낮음";
  assignee: string;
  dueDate: string;
  progress: number;
}

export interface KPIData {
  teamId: string;
  metric: string;
  current: number;
  target: number;
  unit: string;
  trend: "up" | "down" | "stable";
}

export interface TimelineEvent {
  id: string;
  teamId: string;
  title: string;
  date: string;
  endDate?: string;
  type: "milestone" | "sprint" | "release" | "review";
}

export interface CommMessage {
  id: string;
  fromTeam: string;
  toTeam: string;
  message: string;
  timestamp: string;
  type: "request" | "update" | "review" | "alert";
}

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
}

export interface CollaborationLink {
  from: string;
  to: string;
  strength: number;
  activeProjects: number;
  label: string;
}

// ─── Teams ────────────────────────────────────────────────────────
export const teams: Team[] = [
  {
    id: "ai",
    name: "AI 분석팀",
    shortName: "AI",
    color: "#3B82F6",
    colorClass: "text-blue-400",
    bgClass: "bg-blue-500/15",
    borderClass: "border-blue-500/30",
    icon: "Brain",
    lead: "김지능",
    members: 8,
    description: "제미나이 AI 연동 주식/데이터 분석",
  },
  {
    id: "design",
    name: "웹 디자인팀",
    shortName: "디자인",
    color: "#8B5CF6",
    colorClass: "text-violet-400",
    bgClass: "bg-violet-500/15",
    borderClass: "border-violet-500/30",
    icon: "Palette",
    lead: "박디자인",
    members: 6,
    description: "웹사이트 UI/UX 디자인",
  },
  {
    id: "manage",
    name: "웹 관리팀",
    shortName: "관리",
    color: "#10B981",
    colorClass: "text-emerald-400",
    bgClass: "bg-emerald-500/15",
    borderClass: "border-emerald-500/30",
    icon: "Settings",
    lead: "이관리",
    members: 5,
    description: "웹사이트 운영 및 유지보수",
  },
  {
    id: "improve",
    name: "웹 개선팀",
    shortName: "개선",
    color: "#F59E0B",
    colorClass: "text-amber-400",
    bgClass: "bg-amber-500/15",
    borderClass: "border-amber-500/30",
    icon: "Rocket",
    lead: "최개선",
    members: 7,
    description: "웹사이트 기능 개선",
  },
  {
    id: "ui",
    name: "UI 개선팀",
    shortName: "UI",
    color: "#F43F5E",
    colorClass: "text-rose-400",
    bgClass: "bg-rose-500/15",
    borderClass: "border-rose-500/30",
    icon: "Layout",
    lead: "정유아이",
    members: 5,
    description: "사용자 인터페이스 개선",
  },
  {
    id: "rnd",
    name: "주식 R&D팀",
    shortName: "R&D",
    color: "#06B6D4",
    colorClass: "text-cyan-400",
    bgClass: "bg-cyan-500/15",
    borderClass: "border-cyan-500/30",
    icon: "FlaskConical",
    lead: "한리서치",
    members: 9,
    description: "주식 관련 리서치 및 개발",
  },
];

// ─── Tasks ────────────────────────────────────────────────────────
export const tasks: Task[] = [
  // AI 분석팀
  { id: "t1", teamId: "ai", title: "제미나이 API 연동 모듈 개발", status: "진행중", priority: "높음", assignee: "김지능", dueDate: "2026-03-15", progress: 72 },
  { id: "t2", teamId: "ai", title: "KOSPI 예측 모델 v2 학습", status: "진행중", priority: "높음", assignee: "이데이터", dueDate: "2026-03-20", progress: 45 },
  { id: "t3", teamId: "ai", title: "실시간 뉴스 감성 분석 파이프라인", status: "검토중", priority: "중간", assignee: "박분석", dueDate: "2026-03-10", progress: 90 },
  { id: "t4", teamId: "ai", title: "종목 추천 알고리즘 최적화", status: "대기", priority: "중간", assignee: "최알고", dueDate: "2026-03-25", progress: 10 },
  { id: "t5", teamId: "ai", title: "데이터 수집 자동화 스크립트", status: "완료", priority: "낮음", assignee: "정수집", dueDate: "2026-03-01", progress: 100 },
  // 웹 디자인팀
  { id: "t6", teamId: "design", title: "대시보드 메인 페이지 리디자인", status: "진행중", priority: "높음", assignee: "박디자인", dueDate: "2026-03-12", progress: 65 },
  { id: "t7", teamId: "design", title: "차트 컴포넌트 디자인 시스템", status: "완료", priority: "높음", assignee: "김비주얼", dueDate: "2026-03-05", progress: 100 },
  { id: "t8", teamId: "design", title: "모바일 반응형 와이어프레임", status: "진행중", priority: "중간", assignee: "이프레임", dueDate: "2026-03-18", progress: 40 },
  { id: "t9", teamId: "design", title: "아이콘 세트 제작", status: "완료", priority: "낮음", assignee: "최아이콘", dueDate: "2026-02-28", progress: 100 },
  // 웹 관리팀
  { id: "t10", teamId: "manage", title: "서버 모니터링 시스템 구축", status: "진행중", priority: "높음", assignee: "이관리", dueDate: "2026-03-14", progress: 80 },
  { id: "t11", teamId: "manage", title: "SSL 인증서 갱신 자동화", status: "완료", priority: "높음", assignee: "박서버", dueDate: "2026-03-02", progress: 100 },
  { id: "t12", teamId: "manage", title: "백업 스케줄링 최적화", status: "진행중", priority: "중간", assignee: "김백업", dueDate: "2026-03-16", progress: 55 },
  { id: "t13", teamId: "manage", title: "CDN 캐시 정책 업데이트", status: "대기", priority: "낮음", assignee: "최캐시", dueDate: "2026-03-22", progress: 0 },
  // 웹 개선팀
  { id: "t14", teamId: "improve", title: "실시간 알림 시스템 구현", status: "진행중", priority: "높음", assignee: "최개선", dueDate: "2026-03-13", progress: 58 },
  { id: "t15", teamId: "improve", title: "검색 기능 고도화", status: "검토중", priority: "높음", assignee: "김검색", dueDate: "2026-03-08", progress: 85 },
  { id: "t16", teamId: "improve", title: "API 응답 속도 최적화", status: "진행중", priority: "중간", assignee: "이속도", dueDate: "2026-03-19", progress: 35 },
  { id: "t17", teamId: "improve", title: "다국어 지원 모듈", status: "대기", priority: "낮음", assignee: "박다국", dueDate: "2026-03-28", progress: 5 },
  // UI 개선팀
  { id: "t18", teamId: "ui", title: "다크모드 전환 애니메이션", status: "진행중", priority: "높음", assignee: "정유아이", dueDate: "2026-03-11", progress: 70 },
  { id: "t19", teamId: "ui", title: "접근성 WCAG 2.1 준수 작업", status: "진행중", priority: "높음", assignee: "김접근", dueDate: "2026-03-17", progress: 50 },
  { id: "t20", teamId: "ui", title: "마이크로 인터랙션 개선", status: "완료", priority: "중간", assignee: "이인터", dueDate: "2026-03-03", progress: 100 },
  { id: "t21", teamId: "ui", title: "로딩 스켈레톤 UI 구현", status: "검토중", priority: "중간", assignee: "박로딩", dueDate: "2026-03-09", progress: 92 },
  // 주식 R&D팀
  { id: "t22", teamId: "rnd", title: "한국 증권 API 통합 리서치", status: "진행중", priority: "높음", assignee: "한리서치", dueDate: "2026-03-15", progress: 62 },
  { id: "t23", teamId: "rnd", title: "백테스팅 프레임워크 개발", status: "진행중", priority: "높음", assignee: "김백테", dueDate: "2026-03-21", progress: 38 },
  { id: "t24", teamId: "rnd", title: "포트폴리오 최적화 엔진", status: "대기", priority: "중간", assignee: "이포트", dueDate: "2026-03-26", progress: 15 },
  { id: "t25", teamId: "rnd", title: "시장 이상 탐지 알고리즘", status: "검토중", priority: "높음", assignee: "박이상", dueDate: "2026-03-07", progress: 88 },
  { id: "t26", teamId: "rnd", title: "섹터 분석 리포트 자동화", status: "완료", priority: "중간", assignee: "최섹터", dueDate: "2026-03-01", progress: 100 },
];

// ─── KPI Data ─────────────────────────────────────────────────────
export const kpiData: KPIData[] = [
  { teamId: "ai", metric: "모델 정확도", current: 87.3, target: 90, unit: "%", trend: "up" },
  { teamId: "ai", metric: "일일 분석 건수", current: 1250, target: 1500, unit: "건", trend: "up" },
  { teamId: "ai", metric: "API 응답시간", current: 120, target: 100, unit: "ms", trend: "down" },
  { teamId: "design", metric: "디자인 완성률", current: 78, target: 85, unit: "%", trend: "up" },
  { teamId: "design", metric: "사용자 만족도", current: 4.2, target: 4.5, unit: "점", trend: "stable" },
  { teamId: "design", metric: "컴포넌트 재사용률", current: 72, target: 80, unit: "%", trend: "up" },
  { teamId: "manage", metric: "서버 가동률", current: 99.7, target: 99.9, unit: "%", trend: "stable" },
  { teamId: "manage", metric: "장애 대응시간", current: 8, target: 5, unit: "분", trend: "down" },
  { teamId: "manage", metric: "배포 성공률", current: 96.5, target: 98, unit: "%", trend: "up" },
  { teamId: "improve", metric: "기능 구현 속도", current: 12, target: 15, unit: "건/주", trend: "up" },
  { teamId: "improve", metric: "버그 수정률", current: 91, target: 95, unit: "%", trend: "up" },
  { teamId: "improve", metric: "코드 커버리지", current: 82, target: 85, unit: "%", trend: "stable" },
  { teamId: "ui", metric: "접근성 점수", current: 88, target: 95, unit: "점", trend: "up" },
  { teamId: "ui", metric: "페이지 로드 시간", current: 1.8, target: 1.5, unit: "초", trend: "down" },
  { teamId: "ui", metric: "UI 일관성 점수", current: 82, target: 90, unit: "%", trend: "up" },
  { teamId: "rnd", metric: "리서치 논문 발행", current: 3, target: 5, unit: "편", trend: "up" },
  { teamId: "rnd", metric: "백테스트 수익률", current: 12.5, target: 15, unit: "%", trend: "up" },
  { teamId: "rnd", metric: "신규 전략 개발", current: 4, target: 6, unit: "개", trend: "stable" },
];

// ─── Timeline Events ──────────────────────────────────────────────
export const timelineEvents: TimelineEvent[] = [
  { id: "e1", teamId: "ai", title: "제미나이 API v2 통합 완료", date: "2026-02-15", type: "milestone" },
  { id: "e2", teamId: "design", title: "디자인 시스템 v3 릴리즈", date: "2026-02-20", type: "release" },
  { id: "e3", teamId: "rnd", title: "Q1 리서치 스프린트", date: "2026-02-01", endDate: "2026-03-15", type: "sprint" },
  { id: "e4", teamId: "manage", title: "인프라 마이그레이션", date: "2026-03-01", endDate: "2026-03-10", type: "sprint" },
  { id: "e5", teamId: "improve", title: "실시간 알림 시스템 베타", date: "2026-03-05", type: "milestone" },
  { id: "e6", teamId: "ui", title: "접근성 감사 완료", date: "2026-03-08", type: "review" },
  { id: "e7", teamId: "ai", title: "KOSPI 예측 모델 v2 출시", date: "2026-03-20", type: "release" },
  { id: "e8", teamId: "design", title: "모바일 UI 리디자인 스프린트", date: "2026-03-10", endDate: "2026-03-24", type: "sprint" },
  { id: "e9", teamId: "rnd", title: "백테스팅 프레임워크 v1 릴리즈", date: "2026-03-25", type: "release" },
  { id: "e10", teamId: "manage", title: "보안 점검 및 패치", date: "2026-03-12", type: "review" },
  { id: "e11", teamId: "improve", title: "검색 고도화 릴리즈", date: "2026-03-15", type: "release" },
  { id: "e12", teamId: "ui", title: "다크모드 v2 출시", date: "2026-03-18", type: "milestone" },
  { id: "e13", teamId: "ai", title: "감성 분석 파이프라인 리뷰", date: "2026-03-10", type: "review" },
  { id: "e14", teamId: "rnd", title: "시장 이상 탐지 알고리즘 검증", date: "2026-03-07", type: "review" },
  { id: "e15", teamId: "improve", title: "성능 최적화 스프린트", date: "2026-03-15", endDate: "2026-03-28", type: "sprint" },
];

// ─── Communication Log ────────────────────────────────────────────
export const commMessages: CommMessage[] = [
  { id: "m1", fromTeam: "ai", toTeam: "rnd", message: "KOSPI 예측 모델 v2 학습 데이터셋 공유 요청드립니다.", timestamp: "2026-03-05 09:15", type: "request" },
  { id: "m2", fromTeam: "rnd", toTeam: "ai", message: "2024-2025 KOSPI 일별 데이터셋 전달 완료했습니다.", timestamp: "2026-03-05 09:45", type: "update" },
  { id: "m3", fromTeam: "design", toTeam: "ui", message: "차트 컴포넌트 디자인 가이드 v3 전달합니다. 리뷰 부탁드립니다.", timestamp: "2026-03-05 10:00", type: "review" },
  { id: "m4", fromTeam: "ui", toTeam: "design", message: "디자인 가이드 확인했습니다. 다크모드 색상 조정 필요합니다.", timestamp: "2026-03-05 10:30", type: "update" },
  { id: "m5", fromTeam: "manage", toTeam: "improve", message: "서버 모니터링 알림 API 엔드포인트 준비 완료되었습니다.", timestamp: "2026-03-05 11:00", type: "update" },
  { id: "m6", fromTeam: "improve", toTeam: "manage", message: "실시간 알림 시스템 연동 테스트 시작합니다.", timestamp: "2026-03-05 11:15", type: "update" },
  { id: "m7", fromTeam: "ai", toTeam: "design", message: "AI 분석 결과 시각화 컴포넌트 디자인 요청합니다.", timestamp: "2026-03-05 13:00", type: "request" },
  { id: "m8", fromTeam: "rnd", toTeam: "improve", message: "백테스팅 결과 표시 API 스펙 공유합니다.", timestamp: "2026-03-05 13:30", type: "update" },
  { id: "m9", fromTeam: "manage", toTeam: "ai", message: "AI 서버 GPU 사용률 90% 초과 알림입니다.", timestamp: "2026-03-05 14:00", type: "alert" },
  { id: "m10", fromTeam: "ui", toTeam: "improve", message: "검색 결과 UI 개선안 전달합니다.", timestamp: "2026-03-05 14:30", type: "review" },
  { id: "m11", fromTeam: "design", toTeam: "manage", message: "새 디자인 에셋 CDN 배포 요청합니다.", timestamp: "2026-03-05 15:00", type: "request" },
  { id: "m12", fromTeam: "improve", toTeam: "ui", message: "검색 기능 고도화 완료. UI 반영 부탁드립니다.", timestamp: "2026-03-05 15:30", type: "update" },
  { id: "m13", fromTeam: "rnd", toTeam: "design", message: "포트폴리오 분석 화면 와이어프레임 검토 요청합니다.", timestamp: "2026-03-05 16:00", type: "review" },
  { id: "m14", fromTeam: "ai", toTeam: "improve", message: "뉴스 감성 분석 결과 실시간 피드 API 준비 완료.", timestamp: "2026-03-05 16:30", type: "update" },
  { id: "m15", fromTeam: "manage", toTeam: "rnd", message: "R&D 서버 스케일업 완료. 새 인스턴스 정보 공유합니다.", timestamp: "2026-03-05 17:00", type: "update" },
];

// ─── Collaboration Links ──────────────────────────────────────────
export const collaborationLinks: CollaborationLink[] = [
  { from: "ai", to: "rnd", strength: 9, activeProjects: 4, label: "데이터 분석 협업" },
  { from: "ai", to: "design", strength: 6, activeProjects: 2, label: "시각화 디자인" },
  { from: "ai", to: "improve", strength: 5, activeProjects: 2, label: "AI 기능 통합" },
  { from: "design", to: "ui", strength: 8, activeProjects: 3, label: "디자인 시스템" },
  { from: "design", to: "manage", strength: 4, activeProjects: 1, label: "에셋 배포" },
  { from: "manage", to: "improve", strength: 7, activeProjects: 3, label: "인프라 연동" },
  { from: "manage", to: "rnd", strength: 5, activeProjects: 2, label: "서버 관리" },
  { from: "improve", to: "ui", strength: 7, activeProjects: 3, label: "기능-UI 연동" },
  { from: "rnd", to: "design", strength: 4, activeProjects: 1, label: "리서치 시각화" },
  { from: "rnd", to: "improve", strength: 6, activeProjects: 2, label: "기능 개발" },
];

// ─── Stock Data ───────────────────────────────────────────────────
export const stockIndices = [
  { name: "KOSPI", value: 2687.45, change: 23.12, changePercent: 0.87 },
  { name: "KOSDAQ", value: 872.31, change: -5.67, changePercent: -0.65 },
  { name: "KOSPI 200", value: 362.18, change: 3.45, changePercent: 0.96 },
  { name: "KRX 300", value: 1523.67, change: 12.34, changePercent: 0.82 },
];

export const watchlistStocks: StockData[] = [
  { symbol: "005930", name: "삼성전자", price: 72400, change: 1200, changePercent: 1.68, volume: "15.2M" },
  { symbol: "000660", name: "SK하이닉스", price: 178500, change: 3500, changePercent: 2.0, volume: "8.7M" },
  { symbol: "035420", name: "NAVER", price: 215000, change: -2000, changePercent: -0.92, volume: "3.1M" },
  { symbol: "035720", name: "카카오", price: 52800, change: 800, changePercent: 1.54, volume: "5.4M" },
  { symbol: "051910", name: "LG화학", price: 385000, change: -5000, changePercent: -1.28, volume: "1.2M" },
  { symbol: "006400", name: "삼성SDI", price: 412000, change: 8000, changePercent: 1.98, volume: "0.9M" },
  { symbol: "068270", name: "셀트리온", price: 178000, change: 2500, changePercent: 1.42, volume: "2.3M" },
  { symbol: "105560", name: "KB금융", price: 82300, change: 1100, changePercent: 1.35, volume: "1.8M" },
  { symbol: "055550", name: "신한지주", price: 51200, change: -300, changePercent: -0.58, volume: "2.1M" },
  { symbol: "003670", name: "포스코퓨처엠", price: 265000, change: 4500, changePercent: 1.73, volume: "1.5M" },
];

export const sectorPerformance = [
  { sector: "반도체", change: 2.3, volume: "28.5M" },
  { sector: "2차전지", change: 1.8, volume: "15.2M" },
  { sector: "바이오", change: -0.5, volume: "12.1M" },
  { sector: "금융", change: 1.1, volume: "9.8M" },
  { sector: "자동차", change: 0.7, volume: "7.3M" },
  { sector: "IT서비스", change: -0.3, volume: "6.5M" },
  { sector: "화학", change: -1.2, volume: "5.1M" },
  { sector: "건설", change: 0.4, volume: "3.8M" },
];

// ─── Chart data for KOSPI ─────────────────────────────────────────
export const kospiChartData = [
  { date: "02/03", value: 2612 },
  { date: "02/04", value: 2625 },
  { date: "02/05", value: 2618 },
  { date: "02/06", value: 2640 },
  { date: "02/07", value: 2635 },
  { date: "02/10", value: 2648 },
  { date: "02/11", value: 2652 },
  { date: "02/12", value: 2645 },
  { date: "02/13", value: 2660 },
  { date: "02/14", value: 2655 },
  { date: "02/17", value: 2668 },
  { date: "02/18", value: 2672 },
  { date: "02/19", value: 2665 },
  { date: "02/20", value: 2678 },
  { date: "02/21", value: 2682 },
  { date: "02/24", value: 2670 },
  { date: "02/25", value: 2658 },
  { date: "02/26", value: 2665 },
  { date: "02/27", value: 2675 },
  { date: "02/28", value: 2680 },
  { date: "03/03", value: 2672 },
  { date: "03/04", value: 2678 },
  { date: "03/05", value: 2687 },
];

// ─── Helpers ──────────────────────────────────────────────────────
export function getTeamById(id: string): Team | undefined {
  return teams.find((t) => t.id === id);
}

export function getTasksByTeam(teamId: string): Task[] {
  return tasks.filter((t) => t.teamId === teamId);
}

export function getKPIByTeam(teamId: string): KPIData[] {
  return kpiData.filter((k) => k.teamId === teamId);
}

export function getTimelineByTeam(teamId: string): TimelineEvent[] {
  return timelineEvents.filter((e) => e.teamId === teamId);
}

export function getTeamTaskStats(teamId: string) {
  const teamTasks = getTasksByTeam(teamId);
  return {
    total: teamTasks.length,
    inProgress: teamTasks.filter((t) => t.status === "진행중").length,
    completed: teamTasks.filter((t) => t.status === "완료").length,
    pending: teamTasks.filter((t) => t.status === "대기").length,
    reviewing: teamTasks.filter((t) => t.status === "검토중").length,
  };
}
