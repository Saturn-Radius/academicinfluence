import React from 'react';
import { useState } from 'react';
import { GRAY_MID, PRIMARY_DARK } from "../../styles";

const DropdownButton = React.forwardRef(({ onClick, href, ...props }: any, ref) => {
    const [isMore, setIsMore] = useState(true);

    const clickButton = () => {
        setIsMore(!isMore);
    }

    return (
        <div>
            <div onClick={() => clickButton() } style={{ ...styles.button, ...props.style}}>
                <img src={props.image_url} style={{ width: 75 }} />
                <span>{props.text}</span>
                {isMore && <img src="/images/arrow-down.png" />}
                {!isMore && <img src="/images/small-arrow-up.png" />}
            </div>
            {!isMore && <div>{props.disciplines}</div>}
        </div>
    )
})
const styles = {
    button: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 120,
        padding: 12,
        fontSize: 29,
        color: PRIMARY_DARK,
        fontWeight: 'bold',
        borderBottomColor: GRAY_MID,
        borderBottomStyle: 'solid',
        borderBottomWidth: 'thin'
    }
}

export default DropdownButton