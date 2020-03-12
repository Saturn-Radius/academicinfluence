import { PersonData } from "../../schema";
import { GRAY, GRAY_LIGHTEST, MAIN } from "../../styles";
import { formatYear } from "../../utils/years";

const ProfileHeader = (props: { person: PersonData }) => {
  const { person } = props;
  return (
    <div>
      <div css={{ display: "flex" }}>
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center"
          }}
        >
          {person.image_url && (
            <img css={styles.headerImg} src={person.image_url} />
          )}
          {person.image_source_url && (
            <a href={person.image_source_url}>(Source)</a>
          )}
        </div>
        <div css={{ marginLeft: 20 }}>
          <h1 css={styles.name}>{person.name}</h1>
          <div css={styles.lifePeriod}>
            <div css={styles.profileTitle}>{person.short_description}</div>
            <div css={{ marginBottom: 10 }}>
              {" "}
              ( {formatYear(person.birth_year)} –{" "}
              {formatYear(person.death_year)})
            </div>
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
