import { GRAY_MID, PRIMARY_DARK } from "../../styles"
import ContentCard from "../ContentCard"

interface InfulentialData {
    works: {label: string}[];
}

const InfluentialWorks = (props: InfulentialData) => {
    return (
        <div style ={{ display: 'inline-block', maxWidth:"100vw", minWidth:320, marginRight:40 }}>
            <h4 style={styles.subheaderText}>Influential Works</h4>
            <ContentCard style={styles.container}>
                <div>
                    {props.works.map((work, i) => <li key={i}>{work.label}</li>)}
                </div>
            </ContentCard>
        </div>
    )
}


const styles = {
    subheaderText: {
        color: PRIMARY_DARK,
        fontFamily: 'SF UI Display Bold',
        fontSize: 22,
        marginTop: 10,
        marginBottom: 10
    },
    container: {
        fontSize: 16,
        lineHeight: 1.88,
        height:234,
        padding:20,
        color: GRAY_MID,
        listStyleType: "none",
        fontFamily: 'SF UI Display Medium'
    }
}

export default InfluentialWorks