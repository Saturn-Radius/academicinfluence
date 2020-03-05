import * as React from "react";
import { Html } from "../schema";

function toReact(node: Html): React.ReactNode {
    if (typeof node !== "object") {
        return node
    } else {
        return React.createElement(
            node.component === '' ? React.Fragment : node.component,
            node.props,
            ...node.children.map(toReact)
        )
    }
}
export default function HtmlContent(props: {
    html: Html[]
}) {
    return React.createElement(React.Fragment, undefined , ...props.html.map(toReact))
}