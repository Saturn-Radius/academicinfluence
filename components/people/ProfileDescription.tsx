import { useState } from 'react';
import { Describable } from '../../schema';

const ProfileDescription =  (props: {
    style: any,
    person: Describable
}) => {
    const textLength = 540;
    const [isMore, setIsMore] = useState(true);
    const displayString = props.person.description.length > textLength ? props.person.description.substring(0, 540) + ' ...' : props.person.description;

    const clickButton = () => {
        setIsMore(!isMore);
    }
    return (
        <div style={{...styles.card, ...props.style}}>
            <div>{displayString}</div>
            {
                props.person.description.length > textLength && (
                    <div onClick={() => clickButton()} style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 16 }}>
                        {isMore && <div>More<img src="/images/arrow-down.png" /></div>}
                        {!isMore && <div>Less<img src="/images/small-arrow-up.png" /></div>}
                    </div>
                )
            }
            {props.person.wikipedia_description && <><b>Source:</b> Wikipedia</>}
        </div>
    )
}

const styles = {
    card: {
        borderRadius: 4,
        boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)",
        padding: 33,
        backgroundColor:'white'
    }
}

export default ProfileDescription