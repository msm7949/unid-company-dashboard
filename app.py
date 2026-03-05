import streamlit as st
import yfinance as yf
import pandas as pd
import plotly.graph_objects as go

# --- [웹 관리팀] UI 및 테마 설정 ---
st.set_page_config(page_title="UNID Operation Hub", layout="wide", initial_sidebar_state="collapsed")
st.title("🏭 UNID Operation Hub - AI 분석 엔진 가동 중")
st.markdown("---")

# 우니드 종목 코드 고정
TICKER = "014830.KS"

@st.cache_data(ttl=300) # 5분마다 데이터 갱신 (캐싱)
def get_unid_data():
    df = yf.Ticker(TICKER).history(period="6mo")
    return df

def get_ai_signal(df):
    """[AI 분석팀] 초간단 이동평균선 기반 트렌드 분석"""
    df['MA20'] = df['Close'].rolling(window=20).mean()
    current_price = df['Close'].iloc[-1]
    ma20_price = df['MA20'].iloc[-1]
    
    if current_price > ma20_price:
        return "🔴 단기 상승 추세 (매수 우위)"
    else:
        return "🔵 조정 구간 (관망)"

# 데이터 로딩
with st.spinner('우니드 실시간 데이터를 분석 중입니다...'):
    df = get_unid_data()

if not df.empty:
    # --- [주식 R&D팀] 핵심 KPI 지표 ---
    col1, col2, col3 = st.columns(3)
    current_price = df['Close'].iloc[-1]
    prev_price = df['Close'].iloc[-2]
    change = current_price - prev_price
    change_pct = (change / prev_price) * 100

    col1.metric("우니드 현재가", f"{int(current_price):,}원", f"{int(change):,}원 ({change_pct:.2f}%)")
    col2.metric("오늘 거래량", f"{int(df['Volume'].iloc[-1]):,}주")
    col3.metric("🤖 AI 트렌드 시그널", get_ai_signal(df))

    # --- [AI 분석팀] 고급 시각화 차트 ---
    st.markdown("### 📈 최근 6개월 추세 및 20일 이동평균선")
    fig = go.Figure(data=[go.Candlestick(x=df.index,
                    open=df['Open'],
                    high=df['High'],
                    low=df['Low'],
                    close=df['Close'],
                    name="우니드 주가")])
    
    # 20일선 추가
    fig.add_trace(go.Scatter(x=df.index, y=df['MA20'], mode='lines', name='20일 이평선', line=dict(color='orange')))
    
    fig.update_layout(height=500, margin=dict(l=0, r=0, t=30, b=0), template="plotly_dark", xaxis_rangeslider_visible=False)
    st.plotly_chart(fig, use_container_width=True)
else:
    st.error("데이터를 불러오지 못했습니다. 종목 코드를 확인하세요.")
