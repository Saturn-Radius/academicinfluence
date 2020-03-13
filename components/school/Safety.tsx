import { SchoolData } from "../../schema";
import { MAIN } from "../../styles";
import ContentCard from "../ContentCard";

const CampusSafety = (props: { school: SchoolData }) => {
  return (
    <div style={{ minWidth: 300 }}>
      <h4 style={styles.subheaderText}>Campus Safety</h4>
      <ContentCard style={{ padding: 20 }}>
        {/* TODO <p style={styles.crimeHeader}>CRIME: LOW</p>*/}

        <div style={styles.crimeSubheader}>On Campus</div>
        <CrimeRate
          name="Property"
          value={props.school.campus_property_crime_rate}
        />
        <CrimeRate
          name="Violent"
          value={props.school.campus_violent_crime_rate}
        />
        <div style={styles.crimeSubheader}>On Campus</div>
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
    <div style={styles.crimeContainer}>
      <div style={styles.crimeName}>{props.name}</div>

      <div style={styles.tempContainer}>
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
    fontWeight: "bold",
    fontSize: 18,
    paddingBottom: 10
  } as React.CSSProperties,
  crimeHeader: {
    color: MAIN,
    fontSize: 22,
    fontWeight: "bold",
    paddingBottom: 20,
    margin: 0
  } as React.CSSProperties,
  crimeName: {
    //fontWeight:'bold',
    paddingBottom: 10
  } as React.CSSProperties,
  crimeContainer: {
    display: "flex",
    color: "#666666"
    //justifyContent:'flex-start'
  } as React.CSSProperties,
  tempContainer: {
    display: "flex",
    marginLeft: "auto",
    color: "#666666"
  }
};

export default CampusSafety;
