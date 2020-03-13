import { SchoolData } from "../../schema";
import { MAIN, MAIN_DARKER } from "../../styles";
import Button from "../Button";
import CircularProgress from "../CircularProgress";
import ContentCard from "../ContentCard";

const Admissions = (props: { school: SchoolData }) => {
  return (
    //<div style={{flex:"1 1 100%", marginLeft:40}}>
    <div style={{}}>
      <h4 style={styles.subheaderText}>Admissions</h4>
      <ContentCard style={{ padding: 20 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 20
          }}
        >
          {props.school.acceptance_rate && (
            <CircularProgress
              percentage={props.school.acceptance_rate * 100}
              size={95}
              text="Acceptance Rate"
            />
          )}

          {props.school.graduation_rate && (
            <CircularProgress
              percentage={props.school.graduation_rate * 100}
              size={95}
              text="Graduation Rate"
            />
          )}

          {props.school.test_competitiveness && (
            <CircularProgress
              percentage={props.school.test_competitiveness * 100}
              size={95}
              text="Test
                    Competitivness"
            />
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          {props.school.median_sat && (
            <Button
              style={{ width: 190, marginRight: 24 }}
              color={MAIN_DARKER}
              text={`SAT - ${props.school.median_sat}`}
            />
          )}
          {props.school.median_act && (
            <Button
              style={{ width: 190 }}
              color={MAIN_DARKER}
              text={`ACT - ${props.school.median_act}`}
            />
          )}
        </div>
      </ContentCard>
    </div>
  );
};

const styles = {
  subheaderText: {
    color: MAIN,
    fontSize: 22
  }
};

export default Admissions;
