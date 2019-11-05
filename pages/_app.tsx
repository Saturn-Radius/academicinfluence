import React from "react"
import App from 'next/app'

function NetworkHeader() {
    return <div>
        <style jsx>{`
            div {
                width: 100%;
                background-color: #1E222A;
                padding-left: 80px;
                padding-top: 12px;
                padding-bottom: 9px;
            }
            a {
                color: white;
                text-decoration: none;
                font-size: 16px;
                line-height: 19px;
                font-family: SF UI Display;
            }
            a.home {
                border-right: 0.5px solid #FFFFFF;
                padding-right: 19px;
                margin-right: 28px;
            }
        `}</style>
        <a href="/" className="home">ACADEMIC INFLUENCE</a>
        <a href="https://intelligenteducation.com">INTELLIGENT EDUCATION</a>
    </div>
}

class AIApp extends App {
    render() {
        const {Component, pageProps} = this.props;
        return <div>
            <style jsx global>{`
                body {
                    padding: 0px;
                    margin: 0px;
                }
            `}</style>
            <NetworkHeader />
            <Component {...pageProps}/>
        </div>
    }
}

export default AIApp