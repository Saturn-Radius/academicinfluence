import { SchoolData } from "../../schema";
import { MAIN } from "../../styles";
import CircularProgress from "../CircularProgress";
import ContentCard from "../ContentCard";

const AfterGrad = (props: { school: SchoolData }) => {
  return (
    <div css={{ display: "inline-block", width: 460 }}>
      <h4 css={styles.subheaderText}>After Graduation</h4>
      <ContentCard style={{ height: 234, padding: 20 }}>
        {/* TODO
        <div css={styles.afterGradRow}>
          <b>Alumni</b> <p>70,000</p>
        </div>

        */}
        {props.school.employed_10_years && (
          <div css={{ ...styles.afterGradRow, ...{ paddingTop: 0 } }}>
            <b>10 Years Employment</b>{" "}
            <CircularProgress
              size={70}
              percentage={props.school.employed_10_years * 100}
            />{" "}
          </div>
        )}

        {props.school.average_earnings && (
          <div css={{ ...styles.afterGradRow, ...{ paddingTop: 0 } }}>
            <b>Avg. Earnings</b>
            <p css={{ margin: 0 }}>
              ${props.school.average_earnings.toLocaleString("en-US")}
            </p>
          </div>
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
  afterGradRow: {
    display: "flex",
    alignItems: "center",
    paddingTop: 30,
    justifyContent: "space-between"
  }
};

export default AfterGrad;
