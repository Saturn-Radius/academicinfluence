import { MAIN } from "../../styles";

interface InfluenceScore {
  overall: { influence: number; world_rank: number; usa_rank: number | null };
}

const InfluenceScore = (props: InfluenceScore) => {
  let score = Math.floor(props.overall.influence * 100);
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
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          width: 170,
          marginRight: 10
        }}
      >
        {props.overall.influence && (
          <div>
            <div css={styles.sidebarText}>Influence Score:</div>
            <div css={styles.bodyText}>
              <li className="liStyle">{score}</li>
            </div>
          </div>
        )}
        {props.overall.world_rank && (
          <div>
            <div css={styles.rankingText}>World Ranking:</div>
            <div css={styles.bodyText}>
              <li className="liStyle">#{props.overall.world_rank} World</li>
            </div>
          </div>
        )}
        {props.overall.usa_rank && (
          <div>
            <div css={styles.rankingText}>USA Ranking:</div>
            <div css={styles.bodyText}>
              <li>#{props.overall.usa_rank} USA</li>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const styles = {
  sidebarText: {
    lineHeight: 1,
    fontSize: 16,
    fontWeight: 500
  },
  rankingText: {
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
