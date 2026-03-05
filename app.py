import streamlit as st
import yfinance as yf
import pandas as pd
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import time
import requests
from bs4 import BeautifulSoup

# --- [웹 관리팀] UI 및 테마 설정 ---
st.set_page_config(page_title="UNID Operation Hub", layout="wide", initial_sidebar_state="expanded")
st.title("🏭 UNID Operation Hub - 풀가동 모드 🚀")
st.markdown("---")

TICKER = "014830.KS"

# --- [웹 관리팀] 3. 자동 실시간 업데이트 로직 ---
st.sidebar.header("⚙️ 시스템 제어반")
auto_refresh = st.sidebar.toggle("🔄 실시간 자동 갱신 (10초)", value=False)
st.sidebar.caption("스위치를 켜면 10초마다 화면이 스스로 갱신됩니다.")

@st.cache_data(ttl=60)
def get_unid_data():
    return yf.Ticker(TICKER).history(period="6mo")

@st.cache_data(ttl=600)
def get_latest_news():
    """[주식 R&D팀] 네이버 금융 실시간 뉴스 크롤링"""
    try:
        url = "https://finance.naver.com/item/news_news.naver?code=014830"
        headers = {'User-Agent': 'Mozilla/5.0'}
        res = requests.get(url, headers=headers)
        soup = BeautifulSoup(res.text, 'html.parser')
        links = soup.select('.title a')
        news_list = [link.text.strip() for link in links[:5]]
        return news_list if news_list else ["최신 뉴스가 없습니다."]
    except Exception as e:
        return ["뉴스 연동 중 오류 발생"]

def calculate_indicators(df):
    """[AI 분석팀] 1. 고급 보조지표 계산 (볼린저밴드, MACD)"""
    # 볼린저 밴드
    df['MA20'] = df['Close'].rolling(window=20).mean()
    df['STD'] = df['Close'].rolling(window=20).std()
    df['Upper'] = df['MA20'] + (df['STD'] * 2)
    df['Lower'] = df['MA20'] - (df['STD'] * 2)
    
    # MACD 계산
    exp1 = df['Close'].ewm(span=12, adjust=False).mean()
    exp2 = df['Close'].ewm(span=26, adjust=False).mean()
    df['MACD'] = exp1 - exp2
    df['Signal_Line'] = df['MACD'].ewm(span=9, adjust=False).mean()
    return df

def get_smart_signal(df):
    current_price = df['Close'].iloc[-1]
    ma20 = df['MA20'].iloc[-1]
    macd = df['MACD'].iloc[-1]
    signal = df['Signal_Line'].iloc[-1]
    
    score = 0
    if current_price > ma20: score += 1
    if macd > signal: score += 1
    
    if score == 2: return "🔴 강력 매수 (상승장)"
    elif score == 1: return "🟡 관망 (추세 전환 대기)"
    else: return "🔵 보수적 접근 (하락장)"

# 메인 렌더링 함수
def render_dashboard():
    raw_df = get_unid_data()
    if raw_df.empty:
        st.error("데이터 로딩 실패")
        return

    df = calculate_indicators(raw_df)
    
    # 상단 KPI
    col1, col2, col3, col4 = st.columns(4)
    curr_p = df['Close'].iloc[-1]
    prev_p = df['Close'].iloc[-2]
    diff = curr_p - prev_p
    pct = (diff / prev_p) * 100
    
    col1.metric("우니드 현재가", f"{int(curr_p):,}원", f"{int(diff):,}원 ({pct:.2f}%)")
    col2.metric("오늘 거래량", f"{int(df['Volume'].iloc[-1]):,}주")
    col3.metric("🤖 종합 AI 시그널", get_smart_signal(df))
    col4.metric("📊 MACD 추세", "강세" if df['MACD'].iloc[-1] > df['Signal_Line'].iloc[-1] else "약세")

    st.markdown("---")
    
    # 차트와 뉴스 레이아웃 분리
    left_col, right_col = st.columns([3, 1])
    
    with left_col:
        st.markdown("### 📈 AI 정밀 분석 차트 (볼린저 밴드 & MACD)")
        fig = make_subplots(rows=2, cols=1, shared_xaxes=True, vertical_spacing=0.03, row_heights=[0.7, 0.3])
        
        # 캔들스틱 & 볼린저 밴드
        fig.add_trace(go.Candlestick(x=df.index, open=df['Open'], high=df['High'], low=df['Low'], close=df['Close'], name="주가"), row=1, col=1)
        fig.add_trace(go.Scatter(x=df.index, y=df['Upper'], line=dict(color='gray', dash='dash'), name='Upper Band'), row=1, col=1)
        fig.add_trace(go.Scatter(x=df.index, y=df['Lower'], line=dict(color='gray', dash='dash'), name='Lower Band'), row=1, col=1)
        fig.add_trace(go.Scatter(x=df.index, y=df['MA20'], line=dict(color='orange'), name='20일선'), row=1, col=1)
        
        # MACD
        fig.add_trace(go.Scatter(x=df.index, y=df['MACD'], line=dict(color='blue'), name='MACD'), row=2, col=1)
        fig.add_trace(go.Scatter(x=df.index, y=df['Signal_Line'], line=dict(color='red'), name='Signal'), row=2, col=1)
        
        fig.update_layout(height=600, margin=dict(l=0, r=0, t=0, b=0), template="plotly_dark", xaxis_rangeslider_visible=False)
        st.plotly_chart(fig, use_container_width=True)
        
    with right_col:
        st.markdown("### 📰 [R&D팀] 우니드 실시간 뉴스")
        news_list = get_latest_news()
        for i, news in enumerate(news_list):
            st.info(f"**{i+1}.** {news}")
            
        st.markdown("---")
        st.markdown("### ⚙️ 시스템 상태 모니터")
        st.success("✅ AI 엔진: 정밀 분석 중")
        st.success("✅ 뉴스 크롤러: 정상 가동")

# 실행 제어 (자동 새로고침)
placeholder = st.empty()
if auto_refresh:
    while True:
        with placeholder.container():
            render_dashboard()
        time.sleep(10)
else:
    with placeholder.container():
        render_dashboard()
