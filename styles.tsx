import css from "@emotion/css";
import styled from "@emotion/styled";

{
  /* STYLE COLOR SECTION TO MATCH styles/features.css */
}
export const MAIN_LIGHTER = "#65A9A9";
export const MAIN = "#087E8B";
export const MAIN_DARKER = "#19647E";
export const MAIN_DARKEST = "#033041";

export const HEADING_BG = "#EEF0EE";

export const GRAY_MEDI = "#e5e5e5";

export const ACCENT = "#E8772A";
export const ACCENT_DARKER = "#DF7128";

export const BG_PAGE = "#F9FBFA";
export const BG_PAGE_DARKER = "#EFF1F0";

export const LIGHT_GRAY = "#EDEDED";
export const DARK_GRAY = "#424B54";
export const YELLOW = "#FEFE76";

{
  /* LEGACY STYLE SECTION - TO BE REMOVED */
}
export const PRIMARY_DARK = MAIN;
export const SECONDARY_DARK = MAIN_DARKER;
export const TERTIARY_DARK = MAIN_DARKEST;

export const GREEN_MID = MAIN_DARKER;
export const GREEN_DARK = "#1e988a";

export const GRAY_DARK = "#999999";
export const GRAY_MID = "#666666";
export const GRAY_LIGHT = "#333333";
export const GRAY_LIGHTER = "#ededed";

export const BACKGROUND_1 = BG_PAGE;

export const ACTION_COLOR = ACCENT;

{
  /* END SECTION TO BE REMOVED */
}

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

export const PageDescription = styled.p`
  font-family: "SF UI Display Medium";
  font-size: 16px;
  font-weight: 600;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
  color: ${GRAY_MID};
`;

export const Header1 = styled.h1({
  color: SECONDARY_DARK,
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
  color: GRAY_MID,
  fontSize: "24px",
  fontWeight: "bold",
  lineHeight: "30px"
});

export const SectionTitle = styled.h2({
  color: PRIMARY_DARK,
  fontSize: "20px",
  "@media(min-width: 1248px)": {
    fontSize: "22px",
    lineHeight: 1.45,
    fontWeight: "bold"
  }
});

export const SectionDescription = styled.p({
  color: GRAY_MID,
  fontSize: "16px",
  fontWeight: "normal",
  lineHeight: "20px"
});
