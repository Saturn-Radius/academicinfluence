import { PostgresSelect } from "squel";
import * as squel from "../squel";

export interface EntityType {
    kind: string;
    editor_table: string;
    data_table: string;
}

export function lookupBySlug(entityType: EntityType, slug: string) {
    return squel.select().from(entityType.editor_table)
        .where(entityType.editor_table + ".slug = ?", slug)
        .where(entityType.editor_table + ".active")
        .join(entityType.data_table, undefined, entityType.editor_table + ".id = " + entityType.data_table + ".id")
}

export function addIdentifiableFields(query: PostgresSelect, entityType: EntityType) {
    return query.field(entityType.data_table + ".name")
        .field(entityType.editor_table + ".slug")
 
}


export function addDescribableFields(query: PostgresSelect, entityType: EntityType) {
    return addIdentifiableFields(query, entityType)
        .field(`coalesce(nullif(${entityType.editor_table}.description, ''), ${entityType.data_table}.description)`, "description")
}

export function extractIdentifiableFields(row: any) {
    return {
        name: row.name,
        slug: row.slug
    }
}

export function extractDescribableFields(row: any) {
    return {
        ...extractIdentifiableFields(row),
        description: row.description
    }
}