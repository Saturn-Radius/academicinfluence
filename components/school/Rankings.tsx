import { SchoolData } from "../../schema";
import { DESKTOP_MEDIA, TABLE_OR_MOBILE_MEDIA } from "../../utils/responsive";
import CircularProgress from "../CircularProgress";

const RankGauges = (props: {
  school: SchoolData;
  size?: number;
  fontSize?: number;
}) => {
  return (
    <div style={{ display: "flex" }}>
      {props.school.acceptance_rate && (
        <CircularProgress
          style={{ paddingRight: 20 }}
          percentage={props.school.acceptance_rate * 100}
          size={props.size}
          fontSize={props.fontSize}
          text="Acceptance Rate"
        />
      )}

      {props.school.graduation_rate && (
        <CircularProgress
          percentage={props.school.graduation_rate * 100}
          size={props.size}
          fontSize={props.fontSize}
          text="Graduation Rate"
        />
      )}
    </div>
  );
};

const Rankings = (props: { school: SchoolData }) => {
  return (
    <>
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          [TABLE_OR_MOBILE_MEDIA]: {
            display: "none"
          }
        }}
      >
        <RankGauges size={95} school={props.school} />
      </div>

      <div
        css={{
          display: "flex",
          justifyContent: "center",
          [DESKTOP_MEDIA]: {
            display: "none"
          }
        }}
      >
        <div>
          <RankGauges fontSize={12} size={70} school={props.school} />
        </div>
      </div>
    </>
  );
};

export default Rankings;
