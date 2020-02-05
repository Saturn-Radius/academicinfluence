import { BaseBuilder, Expression, FieldOptions, PostgresSelect } from "squel";
import databasePool from "../databasePool";
import { influenceScoreColumn } from "../influenceScore";
import * as squel from "../squel";

export interface EntityType {
  kind: string;
  editor_table: string;
  data_table: string;
}

export function addIdentifiableFields(
  query: PostgresSelect,
  entityType: EntityType
) {
  return query
    .field(entityType.data_table + ".name")
    .field(entityType.editor_table + ".slug");
}

export function addDescribableFields(
  query: PostgresSelect,
  entityType: EntityType
) {}

export function extractIdentifiableFields(row: any) {
  return {
    name: row.name,
    slug: row.slug
  };
}

export function extractDescribableFields(row: any) {
  return {
    ...extractIdentifiableFields(row),
    description: row.description
  };
}

export function extractOverall(row: any) {
  return {
    influence: row.influence,
    world_rank: row.world_rank,
    usa_rank: row.usa_rank
  };
}

export class EntityQuery {
  _query: PostgresSelect;

  constructor(query: PostgresSelect) {
    this._query = query;
  }

  addIdentifiableFields(entityType: EntityType) {
    this._query
      .field(entityType.data_table + ".name")
      .field(entityType.editor_table + ".slug");
    return this;
  }

  addDescribableFields(entityType: EntityType) {
    this.addIdentifiableFields(entityType);
    this._query.field(
      `coalesce(nullif(${entityType.editor_table}.description, ''), ${entityType.data_table}.description)`,
      "description"
    );
    return this;
  }

  addInfluenceFields(entityType: EntityType) {
    this._query
      .join(
        "ai_data.scores",
        undefined,
        entityType.data_table + ".id = scores.id and scores.keyword is null"
      )
      .where("scores.kind = ?", entityType.kind)
      .field(influenceScoreColumn(1900, 2020), "influence")
      .field("world_rank")
      .field("usa_rank");
    return this;
  }

  addPartialFields(entityType: EntityType) {
    this.addDescribableFields(entityType);
    this.addInfluenceFields(entityType);
    return this;
  }

  followLink(entityType: EntityType, link: string) {
    this._query
      .join(
        entityType.data_table,
        undefined,
        entityType.data_table + ".id = " + link
      )
      .join(
        entityType.editor_table,
        undefined,
        entityType.editor_table + ".id = " + entityType.data_table + ".id"
      )
      .where(entityType.editor_table + ".active");
    return this;
  }

  field(name: string | BaseBuilder, alias?: string, options?: FieldOptions) {
    this._query.field(name, alias, options);
    return this;
  }

  join(
    name: string | BaseBuilder,
    alias?: string,
    condition?: string | Expression
  ) {
    this._query.join(name, alias, condition);
    return this;
  }

  left_join(
    name: string | BaseBuilder,
    alias?: string,
    condition?: string | Expression
  ) {
    this._query.left_join(name, alias, condition);
    return this;
  }

  order(field: string, direction?: boolean | null) {
    this._query.order(field, direction);
    return this;
  }

  where(condition: string | Expression, ...args: any[]) {
    this._query.where(condition, ...args);
    return this;
  }

  limit(limit: number) {
    this._query.limit(limit);
    return this;
  }

  apply(f: (e: EntityQuery) => void) {
    f(this);
    return this;
  }

  inner() {
    return this._query;
  }

  async execute() {
    const pool = await databasePool;
    return pool.query(this._query.toParam());
  }
}

export function lookupAll(entityType: EntityType) {
  return new EntityQuery(
    squel
      .select()
      .from(entityType.editor_table)
      .where(entityType.editor_table + ".active")
      .join(
        entityType.data_table,
        undefined,
        entityType.editor_table + ".id = " + entityType.data_table + ".id"
      )
  );
}

export function lookupBySlug(entityType: EntityType, slug: string) {
  return lookupAll(entityType).where(
    entityType.editor_table + ".slug = ?",
    slug
  );
}
