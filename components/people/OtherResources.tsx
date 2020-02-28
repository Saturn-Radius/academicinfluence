import Link from "next/link"
import ContentCard from "../ContentCard"
import {PRIMARY_DARK, GRAY_MID, GRAY_LIGHT} from "../../styles"

interface ResourceData {
    links: string[];
}

const OtherResources = (props: ResourceData) => {
    return (
        <div style={{ display: 'inline-block', maxWidth:"100vw", minWidth:320, marginRight:40}}>
            <h4 style={styles.subheaderText}>Other resources</h4>
            <ContentCard style={styles.container}>
                <div>
                {
                    props.links.map((resource, i) =>
                    <div key={i}>
                        <a href={resource} style={styles.container}>{resource}</a>
                    </div>)
                }
                </div>
            </ContentCard>
        </div>
    )
}

const styles = {
    subheaderText: {
        color: PRIMARY_DARK,
        fontSize: 22,
        marginTop: 10,
        marginBottom: 10
    },
    container: {
        fontSize: 18,
        lineHeight: 1.78,
        height:234,
        padding:20,
        color: GRAY_LIGHT,
        listStyleType: "none",
        fontFamily: 'SF UI Display Bold',
    }
}

export default OtherResources