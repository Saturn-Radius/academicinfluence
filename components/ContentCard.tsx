import React, { Component } from 'react';


const ContentCard = (props:any) => {
    return (
        <div title={props.title} style={{...styles.card, ...props.style}}>
            {props.children}
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



export default ContentCard