import { useState } from 'react';
import { GRAY_MID, PRIMARY_DARK } from "../../styles";
import ContentCard from "../ContentCard";

interface InfulentialData {
    style: any;
    works: {label: string}[];
}

const InfluentialWorks = (props: InfulentialData) => {
    const [isMore, setIsMore] = useState(true);
    const displayWorks = isMore ? props.works.slice(0,7): props.works;

    const clickButton = () => {
        setIsMore(!isMore);
    }
    return (
        <div style ={props.style}>
            <h4 style={styles.subheaderText}>Notable Books</h4>
            <ContentCard style={styles.container}>
                <div>
                    {displayWorks.map((work, i) => <li key={i}>{work.label}</li>)}
                </div>
                {
                    props.works.length > 8 && (
                        <div onClick={() => clickButton()} style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 16 }}>
                            {isMore && <div>More<img src="/images/arrow-down.png" /></div>}
                            {!isMore && <div>Less<img src="/images/small-arrow-up.png" /></div>}
                        </div>
                    )
                }
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
        padding: 20,
        minHeight: 234,
        color: GRAY_MID,
        listStyleType: "none",
    }
}

export default InfluentialWorks