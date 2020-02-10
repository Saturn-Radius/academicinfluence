import { Html, HtmlNode } from "./schema";
import * as squel from "./squel";
import { lookupAll } from "./service/entityDatabase";
import { PERSON_ENTITY_TYPE } from "./service/databasePerson";

function AuthorName(props: HtmlNode['props'], children: Html[]): React.ReactElement {
    return <div>{props.name}</div>
}

AuthorName.resolve = async function(nodes: HtmlNode[]) {
    const query = await lookupAll(PERSON_ENTITY_TYPE)
        .where('ai_people.slug in ?', nodes.map(node => node.props.slug))
        .addIdentifiableFields(PERSON_ENTITY_TYPE)
        .execute()

    const names:{[K: string]: string} = {}

    for (const row of query.rows) {
        names[row.slug] = row.name
    }

    for (const node of nodes) {
        node.props.name = names[node.props.slug]
    }
}


function LoremIpsum(props: HtmlNode['props'], children: Html[]): string{
  return "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
}

type ShortCodes = {[k: string]: (props: HtmlNode['props'], children: Html[]) => string | React.ReactElement};

export const SHORT_CODES: ShortCodes = { LoremIpsum, AuthorName }
export default SHORT_CODES
