import { GRAY, MAIN } from "../../styles";

interface InfluenceScore {
  overall: { influence: number; world_rank: number; usa_rank: number | null };
}

const InfluenceScore = (props: InfluenceScore) => {
  let score = Math.floor(props.overall.influence * 100);
  return (
    <div style={{ display: "flex", flexDirection: "column", width: 170 }}>
      {props.overall.influence && (
        <div>
          <div style={styles.sidebarText}>Influence Score:</div>
          <div style={styles.bodyText}>
            <li>{score}</li>
          </div>
        </div>
      )}
      {props.overall.world_rank && (
        <div>
          <div style={styles.rankingText}>World Ranking:</div>
          <div style={styles.bodyText}>
            <li>#{props.overall.world_rank} World</li>
          </div>
        </div>
      )}
      {props.overall.usa_rank && (
        <div>
          <div style={styles.rankingText}>USA Ranking:</div>
          <div style={styles.bodyText}>
            <li>#{props.overall.usa_rank} USA</li>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  sidebarText: {
    color: GRAY,
    lineHeight: 1,
    fontSize: 16,
    fontWeight: 500
  },
  rankingText: {
    color: GRAY,
    lineHeight: 1,
    fontSize: 16,
    fontWeight: 500,
    paddingTop: 10
  },
  bodyText: {
    color: MAIN,
    fontSize: 24,
    listStyleType: "none",
    fontWeight: 600
  }
};

export default InfluenceScore;
