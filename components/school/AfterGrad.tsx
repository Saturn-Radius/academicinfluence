import { MAIN } from "../../styles";
import CircularProgress from "../CircularProgress";
import ContentCard from "../ContentCard";

const AfterGrad = (props: any) => {
  return (
    <div style={{ display: "inline-block", width: 460 }}>
      <h4 style={styles.subheaderText}>After Graduation</h4>
      <ContentCard style={{ height: 234, padding: 20 }}>
        {/* TODO
        <div style={styles.afterGradRow}>
          <b>Alumni</b> <p>70,000</p>
        </div>

        */}

        <div style={{ ...styles.afterGradRow, ...{ paddingTop: 0 } }}>
          <b>10 Years Employment</b>{" "}
          <CircularProgress
            size={70}
            percentage={props.school.employed_10_years * 100}
          />{" "}
        </div>

        <div style={{ ...styles.afterGradRow, ...{ paddingTop: 0 } }}>
          <b>Avg. Earnings</b>
          <p style={{ margin: 0 }}>
            ${props.school.undergrad_tuition_in_state.toLocaleString("en-US")}
          </p>
        </div>
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
