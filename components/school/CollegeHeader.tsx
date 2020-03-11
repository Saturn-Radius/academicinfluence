import { MAIN } from "../../styles";
import { DESKTOP_MEDIA } from "../../utils/responsive";

const CollegeHeader = (props: any) => {
  return (
    <div
      css={{
        display: "flex",
        justifyContent: "center",
        paddingBottom: 10,
        [DESKTOP_MEDIA]: {
          justifyContent: "inherit",
          paddingBottom: "inherit"
        }
      }}
    >
      <CollegeInfo
        name={props.name}
        logo_url={props.logo_url}
        city={props.city}
        state={props.state}
      />
    </div>
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
    color: MAIN,
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
