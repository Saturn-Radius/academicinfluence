import { PersonData } from "../../schema";
import { GRAY, MAIN } from "../../styles";

const ProfileDiscipline = (props: {
  disciplines: PersonData["disciplines"];
}) => {
  if (props.disciplines && Object.keys(props.disciplines).length > 0) {
    return (
      <div css={{ display: "flex", flexDirection: "column", width: 300 }}>
        <div css={styles.sidebarText}>Top Disciplines Influenced:</div>
        <div css={styles.bodyText}>
          {Object.entries(props.disciplines).map(([discipline, data]) => (
            <li key={discipline}>{discipline}</li>
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
    color: GRAY,
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

export default ProfileDiscipline;
