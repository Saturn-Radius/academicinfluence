import css from "@emotion/css";
import styled from "@emotion/styled";

export const PRIMARY_DARK = "#038C8C";

export const GREEN_MID = "#37c2ab";

export const GRAY_DARK = "#999999";
export const GRAY_MID = "#666666";
export const GRAY_LIGHT = "#333333";
export const GRAY_MEDI = "#e5e5e5";

export const TERTIARY_DARK = "#08526D";

export const SECONDARY_DARK = "#037F8C";

export const BACKGROUND_1 = "#f9fbfa";

export const ACTION_COLOR = "#CC5023";

export const PAGE_WIDTH_STYLE = css({
  paddingLeft: "20px",
  paddingRight: "20px",
  "@media(min-width: 1025px)": {
    paddingLeft: "80px",
    paddingRight: "80px"
  }
});

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
