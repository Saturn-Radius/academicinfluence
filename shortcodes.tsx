import { flatMap } from "lodash";
import { Html, HtmlNode } from "./schema";
import { PERSON_ENTITY_TYPE } from "./service/databasePerson";
import { lookupAll } from "./service/entityDatabase";

function PeopleList(props: HtmlNode["props"], children: Html[]) {
  return (
    <>
      <aside id="top-10" className="one-half alignright">
        <h1 className="center bold borderbottom">{props.title}</h1>
        <ol className="col2">
          {subcomponents(children, "Person").map(child => {
            const id = child.props.id;
            return (
              <li key={id}>
                <a href={"#" + id}>{props.names[id]}</a>
              </li>
            );
          })}
        </ol>
      </aside>
      {subcomponents(children, "Summary").map(summary => (
        <Insert children={summary.children} />
      ))}
      {subcomponents(children, "Person").map((person, index) => (
        <section>
          <h2 className="head clear" id={person.props.id}>
            <span className="box">{index + 1}.</span>
            {props.names[person.props.id]}
          </h2>
          <Insert children={person.children} />
        </section>
      ))}
    </>
  );
}

PeopleList.resolve = async function(nodes: HtmlNode[]) {
  const query = await lookupAll(PERSON_ENTITY_TYPE)
    .where(
      "ai_people.slug in ?",
      flatMap(nodes, node => subcomponents(node.children, "Person")).map(
        node => node.props.id
      )
    )
    .addIdentifiableFields(PERSON_ENTITY_TYPE)
    .execute();

  const names: { [K: string]: string } = {};

  for (const row of query.rows) {
    names[row.slug] = row.name;
  }

  for (const node of nodes) {
    node.props.names = names;
  }
};

function AuthorName(
  props: HtmlNode["props"],
  children: Html[]
): React.ReactElement {
  return <div>{props.name}</div>;
}

AuthorName.resolve = async function(nodes: HtmlNode[]) {
  const query = await lookupAll(PERSON_ENTITY_TYPE)
    .where(
      "ai_people.slug in ?",
      nodes.map(node => node.props.slug)
    )
    .addIdentifiableFields(PERSON_ENTITY_TYPE)
    .execute();

  const names: { [K: string]: string } = {};

  for (const row of query.rows) {
    names[row.slug] = row.name;
  }

  for (const node of nodes) {
    node.props.name = names[node.props.slug];
  }
};

function LoremIpsum(props: HtmlNode["props"], children: Html[]): string {
  return "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
}

type ShortCodes = {
  [k: string]: (
    props: HtmlNode["props"],
    children: Html[]
  ) => string | React.ReactElement;
};

export const SHORT_CODES: ShortCodes = { LoremIpsum, AuthorName, PeopleList };
export default SHORT_CODES;

export function Insert(props: { children: Html[] }) {
  return <></>;
}

function subcomponents(children: Html[], component: string): HtmlNode[] {
  return children.filter(
    node => typeof node === "object" && node.component === component
  ) as HtmlNode[];
}
