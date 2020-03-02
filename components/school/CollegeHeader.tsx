import { PRIMARY_DARK } from "../../styles";
import { Desktop, TabletOrMobile } from "../../utils/responsive";

const CollegeHeader = (props: any) => {
  return (
    <>
      <Desktop>
        <div style={{ display: "flex" }}>
          <CollegeInfo
            name={props.name}
            logo_url={props.logo_url}
            city={props.city}
            state={props.state}
          />
        </div>
      </Desktop>

      <TabletOrMobile>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CollegeInfo
            style={{ paddingBottom: 10 }}
            name={props.name}
            logo_url={props.logo_url}
            city={props.city}
            state={props.state}
          />
        </div>
      </TabletOrMobile>
    </>
  );
};

const CollegeInfo = (props: any) => {
  return (
    <div
      style={{ ...{ display: "flex", marginBottom: "16px" }, ...props.style }}
    >
      <img style={styles.headerImg} src={props.logo_url} />
      <div style={{ paddingTop: 10 }}>
        <h1 id="top" style={styles.name}>
          {props.name}
        </h1>
        <div style={styles.locationText}>
          <div style={{ marginBottom: 10 }}>
            {props.city}, {props.state}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  name: {
    color: PRIMARY_DARK,
    fontSize: 28,
    margin: 0
  },
  locationText: {
    color: "black",
    fontSize: 16
  },
  headerImg: {
    maxWidth: 121,
    maxHeight: 121
  }
};

export default CollegeHeader;
