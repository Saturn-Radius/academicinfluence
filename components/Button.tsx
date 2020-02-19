import { PRIMARY_DARK } from "../styles"
import React, { Component } from 'react';


const Button = React.forwardRef(({ onClick, href, ...props }: any, ref) => {
    let style = {
        backgroundColor: props.color
    }
    return (
        <div onClick={onClick} style={{ ...styles.button , ...style, ...props.style}}>
            {props.text}
        </div>
    )
})
const styles = {
    button: {
        width: 140,
        borderRadius: 30,
        color:'white',
        padding:8,
        fontSize:14,
        textAlign:'center',
        boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.25)"
    }
}

export default Button