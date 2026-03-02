import streamlit as st
import sys
import io
import json
from solution import validate_and_fix_prices

st.set_page_config(layout="wide", page_title="Insurance Price Validator")
st.title("Insurance Price Validator")

left, right = st.columns(2)

with left:
    st.subheader("solution.py")
    with open("solution.py", "r") as f:
        code = f.read()
    st.code(code, language="python")

with right:
    st.subheader("Input Dictionary")

    default_dict = """{
    "mtpl": 400,
    "limited_casco_100": 850,
    "limited_casco_200": 900,
    "limited_casco_500": 700,
    "casco_100": 780,
    "casco_200": 950,
    "casco_500": 800
}"""

    user_text = st.text_area("Edit the dictionary below:", value=default_dict, height=230)

    if st.button("Run Validator", type="primary"):
        try:
            user_input = json.loads(user_text)
        except json.JSONDecodeError as e:
            st.error(f"Invalid dictionary format: {e}")
            st.stop()

        stdout_capture = io.StringIO()
        sys.stdout = stdout_capture
        result = validate_and_fix_prices(user_input)
        sys.stdout = sys.__stdout__
        printed_output = stdout_capture.getvalue()

        st.subheader("Anchor Analysis")
        st.text(printed_output)

        st.subheader("Output")
        st.json(result)
