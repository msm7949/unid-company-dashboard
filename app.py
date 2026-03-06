import streamlit as st
import yfinance as yf
import time
import requests
from bs4 import BeautifulSoup

# --- [웹 관리팀] UI 설정 ---
st.set_page_config(page_title="UNID - 아가방 전략 상황실", layout="wide")
st.title("🌬️ UNID (Wind) - 아가방컴퍼니 정책 상황실")
st.caption("정책의 바람을 가장 빠르게 잡는 우니드(UNID) 시스템 가동 중")
st.markdown("---")

TICKER = "013990.KS"

# --- [웹 관리팀] 실시간 제어반 ---
st.sidebar.header("⚙️ UNID 관제 센터")
auto_refresh = st.sidebar.toggle("🔄 전 채널 실시간 연동 (10초)", value=False)

@st.cache_data(ttl=60)
def get_stock_data():
    return yf.Ticker(TICKER).history(period="5d")

@st.cache_data(ttl=60)
def get_media_news(keyword):
    """[R&D팀] 연합/JTBC/MBC 중심 뉴스 크롤링"""
    news_results = []
    target_media = ["연합뉴스", "JTBC", "MBC"]
    for media in target_media:
        try:
            url = f"https://search.naver.com/search.naver?where=news&query={media}+{keyword}"
            headers = {'User-Agent': 'Mozilla/5.0'}
            res = requests.get(url, headers=headers)
            soup = BeautifulSoup(res.text, 'html.parser')
            links = soup.select('.news_tit')
            if links:
                news_results.append((f"[{media}] {links[0].text}", links[0]['href']))
        except:
            continue
    return news_results

def render_dashboard():
    df = get_stock_data()
    
    # 상단 지표
    col1, col2, col3 = st.columns(3)
    curr_p = df['Close'].iloc[-1]
    col1.metric("주식아가방 현재가", f"{int(curr_p):,}원")
    col2.info("📢 주요 타겟: 국무회의 저출산 대책 발표 모니터링")
    col3.success("✅ 미디어 엔진: 연합뉴스, JTBC, MBC 연결됨")

    st.markdown("---")
    
    # --- 3대 미디어 유튜브 라이브 탭 ---
    st.subheader("📺 실시간 미디어 라이브 상황판")
    tab_yh, tab_jtbc, tab_mbc = st.tabs(["🔴 연합뉴스TV (속보)", "🔵 JTBC (뉴스룸)", "⚪ MBC (뉴스데스크)"])
    
    with tab_yh:
        st.video("https://www.youtube.com/watch?v=GoXebE_Sshw")
    with tab_jtbc:
        st.video("https://www.youtube.com/watch?v=0_uE6-O7k_g")
    with tab_mbc:
        st.video("https://www.youtube.com/watch?v=yK_9-XN8XwY")

    st.markdown("---")

    # --- 정책 및 미디어 텍스트 속보 ---
    col_l, col_r = st.columns(2)
    with col_l:
        st.subheader("🏛️ 국무회의 정책 속보")
        policy_news = get_media_news("국무회의 저출산")
        for title, link in policy_news:
            st.warning(f"📌 {title} -> [원문보기]({link})")
            
    with col_r:
        st.subheader("📰 3사 미디어 반응")
        media_news = get_media_news("아가방컴퍼니")
        for title, link in media_news:
            st.success(f"🗞️ {title} -> [원문보기]({link})")

# 실행
placeholder = st.empty()
if auto_refresh:
    while True:
        with placeholder.container():
            render_dashboard()
        time.sleep(10)
else:
    with placeholder.container():
        render_dashboard()
