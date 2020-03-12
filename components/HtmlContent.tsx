import * as React from "react";
import { Html } from "../schema";
import useMoreButton from "./useMoreButton";

function More(props: { children: React.ReactNode }) {
  const { isMore, moreButton } = useMoreButton();

  return (
    <>
      {isMore && props.children}
      {moreButton}
    </>
  );
}

function lookupComponent(name: string) {
  switch (name) {
    case "":
      return React.Fragment;
    case "More":
      return More;
    default:
      return name;
  }
}

function toReact(node: Html): React.ReactNode {
  if (typeof node !== "object") {
    return node;
  } else {
    return React.createElement(
      lookupComponent(node.component),
      node.props as any,
      ...node.children.map(toReact)
    );
  }
}
export default function HtmlContent(props: { html: Html[] }) {
  return React.createElement(
    React.Fragment,
    undefined,
    ...props.html.map(toReact)
  );
}
