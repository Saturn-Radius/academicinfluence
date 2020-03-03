import { useState } from 'react';
import { GRAY_MID, PRIMARY_DARK } from "../../styles"
import ContentCard from "../ContentCard"

interface InfulentialData {
    style: any;
    works: {label: string}[];
}

const InfluentialWorks = (props: InfulentialData) => {
    const workLength = 8;
    const [displayWorks, setDisplayWorks] = useState(props.works.length > workLength ? props.works.slice(0, 7) : props.works);
    const [isMore, setIsMore] = useState(true);

    const clickButton = () => {
        if(isMore) {
            setDisplayWorks(props.works);
        } else {
            setDisplayWorks(props.works.length > workLength ? props.works.slice(0, 7) : props.works);
        }
        setIsMore(!isMore);
    }
    return (
        <div style ={props.style}>
            <h4 style={styles.subheaderText}>Influential Works</h4>
            <ContentCard style={props.works.length > workLength ? styles.container : styles.containerbox} >
                <div>
                    {displayWorks.map((work, i) => <li key={i}>{work.label}</li>)}
                </div>
                {
                    props.works.length > workLength && (
                        <div onClick={() => clickButton()} style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 16, fontFamily: 'SF UI Display Light' }}>
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
        fontFamily: 'SF UI Display Bold',
        fontSize: 22,
        marginTop: 10,
        marginBottom: 10
    },
    container: {
        fontSize: 16,
        lineHeight: 1.88,
        padding:20,
        color: GRAY_MID,
        listStyleType: "none",
        fontFamily: 'SF UI Display Medium'
    },
    containerbox: {
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