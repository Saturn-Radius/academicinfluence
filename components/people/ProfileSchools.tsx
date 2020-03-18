import { MAIN } from "../../styles";

interface SchoolsData {
  schools: { name: string; slug: string }[];
}

const ProfileSchools = (props: SchoolsData) => {
  if (props.schools && props.schools.length > 0) {
    return (
      <div css={{ display: "flex", flexDirection: "column", width: 450 }}>
        <div css={styles.sidebarText}>Schools Associated With:</div>
        <div css={styles.bodyText}>
          {props.schools.map((school, i) => (
            <li key={i}>{school.name}</li>
          ))}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

const styles = {
  sidebarText: {
    lineHeight: 1,
    fontSize: 16,
    fontWeight: 500
  },
  bodyText: {
    color: MAIN,
    fontSize: 24,
    listStyleType: "disc",
    fontWeight: 600
  }
};

export default ProfileSchools;
