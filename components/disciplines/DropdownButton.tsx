import React from 'react';
import { GRAY_MID } from "../../styles";

const DropdownButton = React.forwardRef(({ onClick, href, ...props }: any, ref) => {
    let style = {
        color: props.color
    }
    return (
        <div onClick={onClick} style={{ ...styles.button , ...style, ...props.style}}>
            <img src='/images/humanities.svg' style={{ width: 75 }} />
            <span>{props.text}</span>
            <img src="/images/arrow-down.png" />
        </div>
    )
})
const styles = {
    button: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color:'white',
        padding: 8,
        fontWeight: "bold",
        textAlign:'center',
        borderBottomColor: GRAY_MID,
        borderBottomStyle: "solid",
        borderBottomWidth: "thin"
    }
}

export default DropdownButton