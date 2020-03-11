import { GRAY, GRAY_LIGHTEST, MAIN } from "../../styles";
import CheckBox from "../Checkbox";

const AddToLocker = (props: any) => (
  <div
    style={{
      ...{ display: "flex", marginLeft: "auto", paddingBottom: 20 },
      ...props.style
    }}
  >
    <span
      style={{ color: "#666666", marginRight: 10, fontSize: 12, paddingTop: 2 }}
    >
      Add to My Locker
    </span>
    <CheckBox />
  </div>
);

const ProfileHeader = (props: any) => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <ProfileInfo
          name={props.name}
          image_url={props.image_url}
          birth_year={props.birth_year}
          death_year={props.death_year}
          short_description={props.short_description}
        />
        {/* <AddToLocker /> */}
      </div>
    </div>
  );
};

const formatYear = (year: number | null): string => {
  if (year === null) {
    return "";
  } else if (year < 0) {
    return `${-year} BC`;
  } else {
    return `${year} AD`;
  }
};

const ProfileInfo = (props: any) => {
  return (
    <div style={{ ...{ display: "flex" }, ...props.style }}>
      <img style={styles.headerImg} src={props.image_url} />
      <div style={{ marginLeft: 20 }}>
        <h1 style={styles.name}>{props.name}</h1>
        <div style={styles.lifePeriod}>
          <div style={styles.profileTitle}>{props.short_description}</div>
          <div style={{ marginBottom: 10 }}>
            {" "}
            ( {formatYear(props.birth_year)} – {formatYear(props.death_year)})
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
  lifePeriod: {
    color: GRAY,
    fontSize: 20
  },
  headerImg: {
    //width:80,
    width: 104,
    height: 104
  },
  profileTitle: {
    fontSize: 20,
    color: GRAY_LIGHTEST,
    fontWeight: 600
  }
};

export default ProfileHeader;
