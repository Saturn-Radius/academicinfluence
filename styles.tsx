import css from "@emotion/css";
import styled from "@emotion/styled";

{
  /* STYLE COLOR SECTION TO MATCH styles/features.css */
}
export const MAIN_LIGHTEST = "var(--main_lightest)";
export const MAIN_LIGHTER = "var(--main_lighter)";
export const MAIN = "var(--main)";
export const MAIN_DARKER = "var(--main_darker)";
export const MAIN_DARKEST = "var(--main_darkest)";

export const SECONDARY_LIGHTEST = "var(--secondary_lightest)";
export const SECONDARY_LIGHTER = "var(--secondary_lighter)";
export const SECONDARY = "var(--secondary)";
export const MAIN_DARKERER = "var(--MAIN_DARKERer)";
export const MAIN_DARKEREST = "var(--MAIN_DARKERest)";

export const ACCENT_LIGHTEST = "var(--accent_lightest)";
export const ACCENT_LIGHTER = "var(--accent_lighter)";
export const ACCENT = "var(--accent)";
export const ACCENT_DARKER = "var(--accent_darker)";
export const ACCENT_DARKEST = "var(--accent_darkest)";

export const SECONDARY_ACCENT_LIGHTEST = "var(--secondary_accent_lightest)";
export const SECONDARY_ACCENT_LIGHTER = "var(--secondary_accent_lighter)";
export const SECONDARY_ACCENT = "var(--secondary_accent)";
export const SECONDARY_ACCENT_DARKER = "var(--secondary_accent_darker)";
export const SECONDARY_ACCENT_DARKEST = "var(--secondary_accent_darkest)";

export const GRAY_LIGHTEST = "var(--GRAY_LIGHTEST)";
export const GRAY_LIGHTER = "var(--GRAY_LIGHTER)";
export const GRAY = "var(--gray)";
export const GRAY_DARKER = "var(--GRAY_DARKER)";
export const GRAY_DARKEST = "var(--GRAY_DARKEST)";

export const BG_PAGE = "var(--bg_page)";
export const BG_PAGE_DARKER = "var(--bg_page_darker)";

export const PAGE_WIDTH_STYLE = css({
  paddingLeft: "20px",
  paddingRight: "20px",
  "@media(min-width: 1025px)": {
    paddingLeft: "80px",
    paddingRight: "80px"
  }
});

export const PageTitle = styled.h2`
  font-family: "SF UI Display Bold";
  font-size: 20px;
  font-style: normal;
  line-height: 1.6;
  letter-spacing: normal;
  color: #000000;
`;

export const PageDescription = styled.div`
  font-family: "SF UI Display Medium";
  font-size: 16px;
  font-weight: 600;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
  color: ${GRAY};
`;

export const Header1 = styled.h1({
  color: MAIN_DARKER,
  fontSize: "24px",
  lineHeight: "30px",
  "@media(min-width: 1248px)": {
    fontSize: "48px",
    lineHeight: "100px",
    fontWeight: "bold",
    margin: 0
  }
});

export const DescriptionText = styled.p({
  color: GRAY,
  fontSize: "24px",
  fontWeight: "bold",
  lineHeight: "30px"
});

export const SectionTitle = styled.h2({
  color: MAIN,
  fontSize: "20px",
  "@media(min-width: 1248px)": {
    fontSize: "22px",
    lineHeight: 1.45,
    fontWeight: "bold"
  }
});

export const SectionDescription = styled.p({
  color: GRAY,
  fontSize: "16px",
  fontWeight: "normal",
  lineHeight: "20px"
});
