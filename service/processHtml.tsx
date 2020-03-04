import { DataNode, Node, NodeWithChildren } from "domhandler";
import { AllHtmlEntities } from "html-entities";
import { domToReact } from "html-react-parser";
import { ElementType, parseDOM } from "htmlparser2";
import { omit } from "lodash";
import React, { ReactElement } from "react";
import smartQuotes from "smart-quotes";
import { Html } from "../schema";
import SHORTCODES, { ResolvePromise } from "../shortcodes";
function allChildren(child: any) {
  return React.Children.map(child, x => x) || [];
}

function dereact(node: ReactPiece): Html {
  if (node == null) {
    return "";
  }
  if (typeof node !== "object") {
    return node;
  } else {
    const children: Html[] = [];
    React.Children.forEach(node.props.children, (child: React.ReactElement) => {
      children.push(dereact(child));
    });
    return {
      component: node.type === React.Fragment ? "" : (node.type as string),
      props: omit(node.props, "children"),
      children
    };
  }
}

type ReactPiece = string | number | React.ReactElement;

function hasUnresolved(element: ReactPiece) {
  if (typeof element === "object") {
    if (element.type in SHORTCODES) {
      return true;
    }
    if (element.type === ResolvePromise) {
      return true;
    }
    if (element.props && "children" in element.props) {
      if (allChildren(element.props.children).some(hasUnresolved)) {
        return true;
      }
    }
  }

  return false;
}

async function resolveElements(element: ReactPiece): Promise<ReactPiece> {
  if (typeof element !== "object") {
    return element;
  } else if (element.type in SHORTCODES) {
    const component = element.type as string;
    return SHORTCODES[component](element.props as any);
  } else if (element.type === ResolvePromise) {
    return element.props.children(await element.props.promise);
  } else {
    const children: ReactPiece[] = [];
    const kids = React.Children.map(element.props.children, child => child);
    if (kids !== null && kids !== undefined) {
      for (const child of kids) {
        children.push(await resolveElements(child));
      }
    }
    return React.cloneElement(element, undefined, ...children);
  }
}

const entities = new AllHtmlEntities();
function handleText(node: Node) {
  if (node.type == ElementType.Text) {
    let x = node as DataNode;
    x.nodeValue = entities.decode(smartQuotes(x.nodeValue));
  } else if (node instanceof NodeWithChildren) {
    for (const child of node.childNodes) {
      handleText(child);
    }
  }
}

export function processText(text: string): Html[] {
  return [smartQuotes(text)];
}

export default async function processHtml(html: string): Promise<Html[]> {
  const document = parseDOM(html, {
    decodeEntities: false,
    lowerCaseTags: false
  });
  for (const node of document) {
    handleText(node);
  }
  let elements: ReactPiece[] = domToReact(
    document,
    undefined as any
  ) as ReactElement[];
  if (!Array.isArray(elements)) {
    elements = [elements];
  }
  while (elements.some(hasUnresolved)) {
    elements = await Promise.all(elements.map(resolveElements));
  }

  const htmls = elements.map(dereact);
  return htmls;
}
