import { useState } from "react";
import { PRIMARY_DARK } from "../../styles";
import ContentCard from "../ContentCard";

const Weather = (props: any) => {
  const [scale, setScale] = useState("f");
  let weather = props.data;

  return (
    <div style={{ minWidth: 300 }}>
      <h4 style={styles.subheaderText}>Weather</h4>
      <ContentCard style={{ padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div style={{ fontSize: 10 }}>High</div>
          <div style={{ fontSize: 10, marginLeft: 20 }}>Low</div>
        </div>

        <Season
          name="Spring"
          high={weather.spring.high}
          low={weather.spring.low}
        />
        <Season
          name="Summer"
          high={weather.summer.high}
          low={weather.summer.low}
        />
        <Season name="Fall" high={weather.fall.high} low={weather.fall.low} />
        <Season
          name="Winter"
          high={weather.winter.high}
          low={weather.winter.low}
        />
      </ContentCard>
    </div>
  );
};

const Season = (props: any) => {
  let [low, high] = [props.high.toFixed(0), props.low.toFixed(0)];

  return (
    <div style={styles.seasonContainer}>
      <div style={styles.seasonName}>{props.name}</div>

      <div style={styles.tempContainer}>
        <div style={{ marginRight: 30 }}>{high}</div>
        <div>{low}</div>
      </div>
    </div>
  );
};

const styles = {
  subheaderText: {
    color: PRIMARY_DARK,
    fontSize: 22
  },
  seasonName: {
    fontWeight: "bold"
  } as React.CSSProperties,
  seasonContainer: {
    display: "flex",
    marginBottom: 20
    //justifyContent:'flex-start'
  },
  tempContainer: {
    display: "flex",
    marginLeft: "auto",
    width: 68,
    color: "#666666"
  }
};

export default Weather;
