import { Dictionary } from "lodash";
import * as React from "react";
import { PERSON_ENTITY_TYPE } from "./service/databasePerson";
import { lookupAll } from "./service/entityDatabase";

function allChildren(child: any) {
  return React.Children.map(child, x => x) || [];
}

function childrenByTag(child: any, tag: string) {
  return allChildren(child).filter(x => x.type == tag);
}

function childByTag(child: any, tag: string) {
  return childrenByTag(child, tag)[0];
}

export function ResolvePromise<T>(props: {
  promise: Promise<T>;
  children: (t: T) => React.ReactNode;
}): React.ReactElement {
  throw new Error("Should not be called");
}

function AsyncShortCode(
  request: (props: Dictionary<any>) => Promise<Dictionary<any>>,
  render: (props: Dictionary<any>) => React.ReactElement | string | number
) {
  return (props: Dictionary<any>) => {
    return (
      <ResolvePromise promise={request(props)}>
        {moreProps => render({ ...props, ...moreProps })}
      </ResolvePromise>
    );
  };
}

// This Define an async Short Code
// This a short code that looks up information in the database
const PeopleList = AsyncShortCode(
  async props => {
    // This first bit is code to lookup the database
    const query = await lookupAll(PERSON_ENTITY_TYPE)
      .where(
        "ai_people.slug in ?",
        childrenByTag(props.children, "Person").map(node => node.props.id)
      )
      .addIdentifiableFields(PERSON_ENTITY_TYPE)
      .execute();

    const names: { [K: string]: string } = {};

    for (const row of query.rows) {
      names[row.slug] = row.name;
    }

    // it returns data that will be added to the props
    return { names };
  },
  props => (
    // this function return the JSX for the short code
    <>
      <aside id="top-10" className="one-half alignright">
        <h1 className="center bold borderbottom">{props.title}</h1>
        <ol className="col2">
          {childrenByTag(props.children, "Person").map(child => {
            const id = child.props.id;
            return (
              <li key={id}>
                <a href={"#" + id}>{props.names[id]}</a>
              </li>
            );
          })}
        </ol>
      </aside>
      {childByTag(props.children, "Summary").children}
      {childrenByTag(props.children, "Person").map((person, index) => (
        <section>
          <h2 className="head clear" id={person.props.id}>
            <span className="box">{index + 1}.</span>
            {props.names[person.props.id]}
          </h2>
          {person.props.children}
        </section>
      ))}
    </>
  )
);

function LoremIpsum(props: Dictionary<any>): string {
  return "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
}

type ShortCodes = {
  [k: string]: (props: Dictionary<any>) => string | React.ReactElement;
};

export const SHORT_CODES: ShortCodes = { LoremIpsum, PeopleList };
export default SHORT_CODES;
