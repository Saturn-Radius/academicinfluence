import css from "@emotion/css";
import styled from "@emotion/styled";

{
  /* STYLE COLOR SECTION TO MATCH styles/features.css */
}
export const MAIN_LIGHTEST = "#95C3CB";
export const MAIN_LIGHTER = "#5997A2";
export const MAIN = "#367D8A";
export const MAIN_DARKER = "#1D6E7D";
export const MAIN_DARKEST = "#0D55461";

export const SECONDARY_LIGHTEST = "#7398A6";
export const SECONDARY_LIGHTER = "#437588";
export const SECONDARY = "#265D71";
export const SECONDARY_DARKER = "#12475B";
export const SECONDARY_DARKEST = "#033041";

export const ACCENT_LIGHTEST = "#FFBBA2";
export const ACCENT_LIGHTER = "#FF9872";
export const ACCENT = "#E57045";
export const ACCENT_DARKER = "#CC4C1C";
export const ACCENT_DARKEST = "#A13208";

export const SECONDARY_ACCENT_LIGHTEST = "#FFB99F";
export const SECONDARY_ACCENT_LIGHTER = "#DA7F5D";
export const SECONDARY_ACCENT = "#BE5732";
export const SECONDARY_ACCENT_DARKER = "#993A16";
export const SECONDARY_ACCENT_DARKEST = "#711E00";

export const GRAY_LIGHTEST = "#F5F5F5";
export const GRAY_LIGHTER = "#E6E6E6";
export const GRAY = "#CDCDCD";
export const GRAY_DARKER = "#9B9B9B";
export const GRAY_DARKEST = "#696969";

export const BG_PAGE = "#F9FBFA";
export const BG_PAGE_DARKER = "#EFF1F0";

{
  /* LEGACY STYLE SECTION - TO BE REMOVED */
}
export const HEADING_BG = "#EEF0EE";
export const YELLOW = "#FEFE76";

export const PRIMARY_DARK = MAIN;
export const SECONDARY_DARK = MAIN_DARKER;
export const TERTIARY_DARK = MAIN_DARKEST;

export const GREEN_MID = MAIN_DARKER;
export const GRAY_MEDI = MAIN;
export const GREEN_DARK = MAIN_DARKER;
export const GREEN_LIGHT = MAIN_LIGHTER;

export const GRAY_DARK = GRAY_DARKEST;
export const GRAY_MID = GRAY;
export const GRAY_LIGHT = GRAY_LIGHTEST;

export const BACKGROUND_1 = BG_PAGE;

export const ACTION_COLOR = ACCENT;

export const LIGHT_GRAY = GRAY_LIGHTER;
export const DARK_GRAY = GRAY_DARKER;

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
