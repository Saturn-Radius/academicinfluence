import { MAIN } from "../../styles";

interface SchoolsData {
  schools: { name: string; slug: string }[];
}

const ProfileSchools = (props: SchoolsData) => {
  if (props.schools && props.schools.length > 0) {
    return (
      <>
        <style jsx>
          {`
            @media (max-width: 800px) {
              .liStyle {
                font-size: 18px;
              }
            }
          `}
        </style>
        <div css={{ display: "flex", flexDirection: "column", width: 450 }}>
          <div css={styles.sidebarText}>Schools Associated With:</div>
          <div css={styles.bodyText}>
            {props.schools.map((school, i) => (
              <li className="liStyle" key={i}>
                {school.name}
              </li>
            ))}
          </div>
        </div>
      </>
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
