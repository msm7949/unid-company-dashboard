import streamlit as st
import pandas as pd
import yfinance as yf


def render_market_signal():

    st.markdown("## 🧭 오늘의 시장 결론")

    kospi = yf.download("^KS11", period="5d", interval="1d")

    if kospi.empty:
        st.warning("시장 데이터 로드 중...")
        return

    today = kospi["Close"].iloc[-1]
    prev = kospi["Close"].iloc[-2]

    change = (today - prev) / prev * 100

    if change > 0.5:
        signal = "🟢 상승 시장"
        strategy = "주도 섹터 중심 단기 대응"
    elif change < -0.5:
        signal = "🔴 하락 위험"
        strategy = "현금 비중 확대 / 관망"
    else:
        signal = "🟡 중립 시장"
        strategy = "확인 후 대응"

    col1, col2 = st.columns([2,1])

    with col1:
        st.info(f"""
### 시장 상태 : {signal}

코스피 변화율 : {change:.2f} %

오늘 전략  
→ **{strategy}**
""")

    with col2:
        st.metric("KOSPI", f"{today:.0f}", f"{change:.2f}%")

    st.markdown("### 📊 초보 투자자 체크포인트")

    c1, c2, c3 = st.columns(3)

    with c1:
        st.success("""
**시장 방향**

코스피 추세 확인  
지수 상승 여부
""")

    with c2:
        st.warning("""
**수급 흐름**

외국인 / 기관  
순매수 여부
""")

    with c3:
        st.info("""
**주도 섹터**

반도체  
AI  
방산
""")

    st.markdown("---")
