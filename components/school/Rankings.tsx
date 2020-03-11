import { DESKTOP_MEDIA, TABLE_OR_MOBILE_MEDIA } from "../../utils/responsive";
import CircularProgress from "../CircularProgress";

const RankGauges = (props: any) => {
  return (
    <div style={{ display: "flex" }}>
      <CircularProgress
        style={{ paddingRight: 20 }}
        percentage={props.acceptance_rate * 100}
        size={props.size}
        fontSize={props.fontSize}
        text="Acceptance Rate"
      />

      <CircularProgress
        percentage={props.graduation_rate * 100}
        size={props.size}
        fontSize={props.fontSize}
        text="Graduation Rate"
      />
    </div>
  );
};

const Rankings = (props: any) => {
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
        <RankGauges
          size={95}
          acceptance_rate={props.acceptance_rate}
          graduation_rate={props.graduation_rate}
        />
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
          <RankGauges
            fontSize={12}
            size={70}
            acceptance_rate={props.acceptance_rate}
            graduation_rate={props.graduation_rate}
          />
        </div>
      </div>
    </>
  );
};

export default Rankings;
