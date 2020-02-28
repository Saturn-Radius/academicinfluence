import { useState } from 'react';

const ProfileDescription =  (props:any) => {
    const textLength = 500;
    const [displayString, setDisplayString] = useState(props.children.length > textLength ? props.children.substring(0, textLength) + ' ...' : props.children);
    const [isMore, setIsMore] = useState(true);

    const clickButton = () => {
        if (isMore) {
            setDisplayString(props.children);
        } else {
            setDisplayString(props.children.length > textLength ? props.children.substring(0, textLength) + ' ...' : props.children);
        }
        setIsMore(!isMore);
    }
    return (
        <div title={props.title} style={{...styles.card, ...props.style}}>
            <div>{displayString}</div>
            <div onClick={() => clickButton()} style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 16 }}>
                {isMore && <div>More<img src="/images/arrow-down.png" /></div>}
                {!isMore && <div>Less<img src="/images/small-arrow-up.png" /></div>}
            </div>
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