import streamlit as st
import yfinance as yf
import requests
from bs4 import BeautifulSoup

# --- [UI/UX 팀] 화면 구성 ---
st.set_page_config(page_title="UNID - 정보 폭격 상황실", layout="wide")
st.title("🌬️ UNID (Wind) - 클릭 정보 무제한 연동 시스템")
st.subheader("🚀 아가방 1만 가자! (정보 클릭 시 즉시 연결)")

# --- [데이터 엔진] 실시간 정보 수집 함수 ---
def get_extended_info(keyword):
    headers = {'User-Agent': 'Mozilla/5.0'}
    url = f"https://search.naver.com/search.naver?where=news&query={keyword}"
    res = requests.get(url, headers=headers)
    soup = BeautifulSoup(res.text, 'html.parser')
    news_list = []
    items = soup.select('.news_area')
    for item in items[:8]:
        title_tag = item.select_one('.news_tit')
        desc_tag = item.select_one('.news_dsc')
        media_tag = item.select_one('.info.press')
        if title_tag and desc_tag and media_tag:
            title = title_tag.text
            link = title_tag['href']
            desc = desc_tag.text[:80] + "..."
            media = media_tag.text.replace("선정", "")
            news_list.append({"title": title, "link": link, "desc": desc, "media": media})
    return news_list

# --- [메인 상황판] 정보 3분할 배치 ---
col1, col2, col3 = st.columns(3)

with col1:
    st.error("🔴 연합뉴스 & 실시간 정책 속보")
    st.caption("국무회의 및 저출산 대책 핵심 키워드")
    policy_data = get_extended_info("국무회의 저출산 정책")
    for news in policy_data:
        with st.expander(f"📌 {news['media']} | {news['title']}"):
            st.write(f"**[기사 요약]**
{news['desc']}")
            st.page_link(news['link'], label="👉 기사 원문 및 상세 정보 열기", icon="🔗")

with col2:
    st.info("🔵 JTBC & MBC 미디어 분석")
    st.caption("방송사별 아가방컴퍼니 테마 분석")
    media_data = get_extended_info("JTBC MBC 아가방컴퍼니")
    for news in media_data:
        with st.expander(f"🎬 {news['media']} | {news['title']}"):
            st.write(f"**[분석 내용]**
{news['desc']}")
            st.page_link(news['link'], label="👉 영상 리포트 및 분석글 보기", icon="🎥")

with col3:
    st.success("🏛️ 정부 공식 보도자료 & 공고")
    st.caption("저출산고령사회위원회 및 관련 부처 공식 발표")
    gov_data = get_extended_info("저출산고령사회위원회 공고")
    for news in gov_data:
        with st.expander(f"📑 {news['media']} | {news['title']}"):
            st.write(f"**[핵심 요약]**
{news['desc']}")
            st.page_link(news['link'], label="👉 공식 보도자료 원문 확인", icon="📁")

st.markdown("---")
st.warning("⚠️ **대표님 필독:** 현재 'Billing Issue'로 데이터 로딩이 지연될 수 있습니다. 마누스에게 결제 확인을 꼭 독촉하십시오!")
