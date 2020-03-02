import { Desktop, TabletOrMobile } from "../../utils/responsive";
import CheckBox from "../Checkbox";
import CircularProgress from "../CircularProgress";

const AddToLocker = (props: any) => (
  <div
    style={{
      ...{ display: "flex", marginLeft: "auto", paddingBottom: 20 },
      ...props.style
    }}
  >
    <span style={{ color: "#666666", marginRight: 10 }}>Add to My Locker</span>
    <CheckBox />
  </div>
);

const RankGauges = (props: any) => {
  return (
    <div style={{ display: "flex" }}>
      <CircularProgress
        style={{ paddingRight: 20 }}
        percentage={95}
        size={props.size}
        fontSize={props.fontSize}
        text={
          <span>
            Overall
            <br /> IR
          </span>
        }
      />

      <CircularProgress
        style={{ paddingRight: 20 }}
        percentage={95}
        size={props.size}
        fontSize={props.fontSize}
        text="Discipline IR"
      />

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
      <Desktop>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <AddToLocker />
          <RankGauges
            size={95}
            acceptance_rate={props.acceptance_rate}
            graduation_rate={props.graduation_rate}
          />
        </div>
      </Desktop>

      <TabletOrMobile>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <RankGauges
              fontSize={12}
              size={70}
              acceptance_rate={props.acceptance_rate}
              graduation_rate={props.graduation_rate}
            />
          </div>
        </div>
        <AddToLocker style={{ margin: "auto", width: 200 }} />
      </TabletOrMobile>
    </>
  );
};

export default Rankings;
