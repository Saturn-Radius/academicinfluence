import { PersonLink } from "../../links";
import { PersonPartialData } from "../../schema";
import { MAIN, MAIN_DARKER } from "../../styles";
import Button from "../Button";
import ContentCard from "../ContentCard";

const InfluentialCard = (props: { person: PersonPartialData }) => {
  const trimDesc = (text: any) => {
    if (text.length > 140) {
      return text.slice(0, 140) + "...";
    }
  };
  return (
    <ContentCard style={styles.cardWrapper}>
      <div
        style={{
          flex: "1 1 100%",
          display: "flex",
          justifyContent: "flex-end"
        }}
      >
        {/* <span style={{ paddingRight: 20, fontSize: 12 }}>Add to My Locker</span>{" "}
        <CheckBox /> */}
      </div>

      <div style={{ width: "100%" }}>
        {props.person.image_url && (
          <img
            style={{ float: "left", marginRight: 20, height: 60, width: 60 }}
            src={props.person.image_url}
          />
        )}
        <div style={styles.influentialName}>{props.person.name}</div>
        <div style={{ paddingBottom: 6 }}>(1955-Present)</div>
        <div style={{ fontWeight: "bold" }}>
          {props.person.short_description}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between"
        }}
      >
        <div style={styles.influentialRow}>
          <div>IR Score</div>
          <div style={styles.influentialRowText}>
            {(props.person.overall.influence * 100).toFixed(2)}
          </div>
        </div>

        {/*
          TODO
        <div style={styles.influentialRow}>
          <div>School</div>
          <div style={styles.influentialRowText}>1st School</div>
        </div>
        */}

        <div style={styles.influentialRow}>
          <div>Disciplines</div>
          <div style={styles.influentialRowText}>Computer Science</div>
        </div>
      </div>

      <div>
        <div style={{ color: MAIN, fontWeight: "bold" }}>Influential Works</div>
        <div style={{ paddingBottom: 8 }}>
          Educated: A Memoir, The Body: A Guide for Occupants, Outliers: The
          Story of Success
        </div>

        <div style={{ float: "right" }}>
          <PersonLink person={props.person}>
            <Button color={MAIN_DARKER} text="See Profile" />
          </PersonLink>
        </div>
      </div>
    </ContentCard>
  );
};

const styles = {
  cardWrapper: {
    width: 280,
    minWidth: 280,
    height: 350,
    padding: 8,
    marginRight: 20,
    marginBottom: 20,
    display: "flex",
    flexWrap: "wrap",
    fontSize: 12,
    color: "#333333",
    lineHeight: 1.3
  } as React.CSSProperties,

  influentialRow: {
    //textAlign:'center'
  } as React.CSSProperties,
  influentialName: {
    color: MAIN,
    fontSize: 20,
    fontWeight: "bold"
  } as React.CSSProperties,
  influentialRowText: {
    color: MAIN,
    fontSize: 14,
    fontWeight: "bold"
  } as React.CSSProperties
};

export { InfluentialCard };
