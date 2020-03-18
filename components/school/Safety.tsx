import { SchoolData } from "../../schema";
import { MAIN } from "../../styles";
import ContentCard from "../ContentCard";

const CampusSafety = (props: { school: SchoolData }) => {
  return (
    <div css={{ minWidth: 300 }}>
      <h4 css={styles.subheaderText}>Campus Safety</h4>
      <ContentCard style={{ padding: 20 }}>
        {/* TODO <p style={styles.crimeHeader}>CRIME: LOW</p>*/}

        <div css={styles.crimeSubheader}>On Campus</div>
        <CrimeRate
          name="Property"
          value={props.school.campus_property_crime_rate}
        />
        <CrimeRate
          name="Violent"
          value={props.school.campus_violent_crime_rate}
        />
        <div css={styles.crimeSubheader}>Off Campus</div>
        <CrimeRate
          name="Property"
          value={props.school.city_property_crime_rate}
        />
        <CrimeRate
          name="Violent"
          value={props.school.city_violent_crime_rate}
        />
      </ContentCard>
    </div>
  );
};

const CrimeRate = (props: { name: string; value: number | null }) => {
  if (props.value == null) {
    return null;
  }
  return (
    <div css={styles.crimeContainer}>
      <div css={styles.crimeName}>{props.name}</div>

      <div css={styles.tempContainer}>
        <div>{(props.value * 100000).toFixed().toLocaleString()} per 100k</div>
      </div>
    </div>
  );
};

const styles = {
  subheaderText: {
    color: MAIN,
    fontSize: 22
  },
  crimeSubheader: {
    fontWeight: "bold" as "bold",
    fontSize: 18,
    paddingBottom: 10
  },
  crimeHeader: {
    color: MAIN,
    fontSize: 22,
    fontWeight: "bold" as "bold",
    paddingBottom: 20,
    margin: 0
  },
  crimeName: {
    //fontWeight:'bold',
    paddingBottom: 10
  },
  crimeContainer: {
    display: "flex" as "flex",
    color: "#666666"
    //justifyContent:'flex-start'
  },
  tempContainer: {
    display: "flex" as "flex",
    marginLeft: "auto" as "auto",
    color: "#666666"
  }
};

export default CampusSafety;
