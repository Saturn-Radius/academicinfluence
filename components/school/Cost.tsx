import { SchoolData } from "../../schema";
import { MAIN } from "../../styles";
import ContentCard from "../ContentCard";

const Cost = (props: { school: SchoolData }) => {
  return (
    <div css={{ minWidth: 320, marginRight: 40 }}>
      <h4 css={styles.subheaderText}>Cost</h4>
      <ContentCard style={{ padding: 20 }}>
        {props.school.undergrad_tuition_in_state && (
          <>
            <div css={styles.costHeader}>Tuition:</div>
            <div css={styles.costContent}>
              ${props.school.undergrad_tuition_in_state.toLocaleString("en-US")}
            </div>
          </>
        )}
        {props.school.undergrad_fees_in_state && (
          <>
            <div css={styles.costHeader}>Fees:</div>
            <div css={styles.costContent}>
              ${props.school.undergrad_fees_in_state.toLocaleString("en-US")}
            </div>
          </>
        )}
        {props.school.average_net_price && (
          <>
            <div css={styles.costHeader}>Avg. Cost for 60k Income:</div>
            <div css={styles.costContent}>
              ${props.school.average_net_price.toLocaleString("en-US")}
            </div>
          </>
        )}
      </ContentCard>
    </div>
  );
};

const styles = {
  subheaderText: {
    color: MAIN,
    fontSize: 22
  },

  costHeader: {
    fontSize: 18,
    fontWeight: "bold" as "bold"
  },

  costContent: {
    fontSize: 40,
    color: "#666666",
    paddingLeft: 8,
    fontWeight: 500,
    paddingBottom: 30
  }
};

export default Cost;
