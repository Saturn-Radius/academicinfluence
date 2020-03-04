import { GRAY_MID, PRIMARY_DARK } from "../../styles"

interface InfluenceScore {
    overall: {influence: number, world_rank: number, usa_rank: number | null };
}

const InfluenceScore = (props: InfluenceScore) => {
    let score = Math.floor(props.overall.influence * 100)
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: 170 }}>
            <div style={styles.sidebarText}>Influence Score</div>
            <div style={styles.bodyText}>
                <li>{score}</li>
                {/* <li>{props.overall.world_rank}</li> */}
                {/* <li>{props.overall.usa_rank} (USA)</li> */}
            </div>
        </div>
    )
}

const styles = {
    sidebarText: {
        color: GRAY_MID,
        lineHeight: 1,
        fontSize: 16,
        fontWeight: 500
    },
    bodyText: {
        color: PRIMARY_DARK,
        fontSize:24,
        listStyleType: "none",
        fontWeight: 600
    }
}

export default InfluenceScore