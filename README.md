# UNID Company Dashboard

> **우니드 컴퍼니 - AI 기반 한국 증권 팀 협업 대시보드**

[![Deploy](https://img.shields.io/badge/배포-Live-brightgreen)](https://unid-dash-lteck75l.manus.space)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)

---

## 📋 프로젝트 개요

우니드 컴퍼니의 6개 전문 팀이 한국 증권 프로젝트를 중심으로 병렬 협업하는 현황을 실시간으로 모니터링하는 대시보드 웹 애플리케이션입니다.

**배포 URL:** https://stockagabangsup.baby

---

## 🏢 6개 협업 팀

| 팀 | 색상 | 역할 |
|---|---|---|
| **AI 분석팀** | 🔵 Electric Blue | 제미나이 AI 연동 주식/데이터 분석 |
| **웹 디자인팀** | 🟣 Violet | 웹사이트 UI/UX 디자인 |
| **웹 관리팀** | 🟢 Emerald | 웹사이트 운영 및 유지보수 |
| **웹 개선팀** | 🟠 Amber | 웹사이트 기능 개선 |
| **UI 개선팀** | 🔴 Rose | 사용자 인터페이스 개선 |
| **주식 R&D팀** | 🩵 Cyan | 주식 관련 리서치 및 개발 |

---

## ✨ 주요 기능

### 📊 대시보드 (메인)
- 전체 팀 진행 현황 요약 카드
- 한국 주요 증권 지수 실시간 표시 (KOSPI, KOSDAQ, KOSPI200, KRX300)
- 최근 팀 간 커뮤니케이션 로그

### 👥 팀별 현황 보드
- 6개 팀별 칸반 보드 (진행중 / 검토중 / 대기 / 완료)
- 작업별 담당자, 우선순위, 진행률 표시
- 팀별 완료율 프로그레스 바

### 🔗 협업 현황 시각화
- 팀 간 협업 네트워크 다이어그램
- 협업 강도 매트릭스 (히트맵)
- 병렬 작업 흐름 타임라인

### 🏗️ 조직도
- CEO → 6개 팀 계층 구조 시각화
- 팀별 구성원 상세 정보 (클릭 확장)
- 조직 통계 요약

### 📈 KPI / 성과 지표
- 팀별 핵심 성과 지표 (KPI) 카드
- 달성률 프로그레스 바 및 트렌드 아이콘
- 전체 팀 KPI 달성률 비교 바 차트

### 📅 프로젝트 타임라인
- 간트 차트 (3월 일정 시각화)
- 마일스톤 / 스프린트 / 릴리즈 / 리뷰 이벤트
- 월별 그룹화된 수직 타임라인

### 💬 커뮤니케이션 로그
- 팀 간 메시지 로그 (요청 / 업데이트 / 리뷰 / 알림)
- 유형별 필터링
- 통계 요약 카드

### 📉 한국 증권 대시보드
- KOSPI 추이 영역 차트 (1W / 1M / 3M)
- 섹터별 성과 (반도체, 2차전지, 바이오, 금융 등)
- 관심 종목 테이블 (삼성전자, SK하이닉스 등 10종목)
- 섹터별 거래량 바 차트

---

## 🎨 디자인 시스템

**디자인 철학:** Glassmorphism Operation Hub

- **테마**: 딥 네이비 기반 다크 모드 + 라이트 모드 전환 지원
- **컴포넌트**: 반투명 글래스 카드 (backdrop-blur + 미세 테두리)
- **애니메이션**: Framer Motion 기반 부드러운 진입/전환 효과
- **타이포그래피**: Pretendard (한국어) + Outfit (숫자/영문) 조합
- **팀 색상 코딩**: 각 팀별 고유 색상으로 직관적 구분

---

## 🛠️ 기술 스택

| 분류 | 기술 |
|---|---|
| **프레임워크** | React 19 + TypeScript |
| **스타일링** | TailwindCSS 4 + Glassmorphism |
| **차트** | Recharts (영역, 막대, 방사형) |
| **애니메이션** | Framer Motion |
| **UI 컴포넌트** | shadcn/ui + Radix UI |
| **라우팅** | Wouter |
| **빌드** | Vite 7 |
| **패키지 매니저** | pnpm |

---

## 🚀 로컬 실행

```bash
# 저장소 클론
git clone https://github.com/msm7949/unid-company-dashboard.git
cd unid-company-dashboard

# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build
```

개발 서버는 `http://localhost:3000`에서 실행됩니다.

---

## 📁 프로젝트 구조

```
unid-company-dashboard/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── DashboardLayout.tsx   # 사이드바 + 메인 레이아웃
│   │   │   ├── GlassCard.tsx         # 글래스모피즘 카드 컴포넌트
│   │   │   ├── StatusBadge.tsx       # 상태/우선순위 배지
│   │   │   └── TeamIcon.tsx          # 팀 아이콘 컴포넌트
│   │   ├── pages/
│   │   │   ├── Home.tsx              # 메인 대시보드
│   │   │   ├── TeamBoard.tsx         # 팀별 현황 보드
│   │   │   ├── Collaboration.tsx     # 협업 현황 시각화
│   │   │   ├── OrgChart.tsx          # 조직도
│   │   │   ├── KPI.tsx               # KPI 성과 지표
│   │   │   ├── Timeline.tsx          # 프로젝트 타임라인
│   │   │   ├── CommLog.tsx           # 커뮤니케이션 로그
│   │   │   └── StockDashboard.tsx    # 한국 증권 대시보드
│   │   ├── lib/
│   │   │   └── data.ts               # 데이터 모델 및 목 데이터
│   │   ├── contexts/
│   │   │   └── ThemeContext.tsx      # 다크/라이트 모드 컨텍스트
│   │   ├── App.tsx                   # 라우팅 설정
│   │   └── index.css                 # 글로벌 스타일 + CSS 변수
│   └── index.html
├── server/
│   └── index.ts                      # Express 서버
└── package.json
```

---

## 📄 라이선스

MIT License © 2026 UNID Company
