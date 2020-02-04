import { PostgresSelect } from "squel";
import { PersonPartialData } from "../schema";

export function addPartialPersonFields(
    select: PostgresSelect
) {
    return select.field("people.name")
        .field("ai_people.slug")
        .field("coalesce(nullif(ai_people.description, ''), people.description)", "description")
        .field("world_rank")
        .field("usa_rank")
}

export function extractPartialPerson(row: any): PersonPartialData {
    return ({
        name: row.name,
        description: row.description,
        slug: row.slug,
        overall: {
            influence: row.influence,
            world_rank: row.world_rank,
            usa_rank: row.usa_rank
        }
    })
}