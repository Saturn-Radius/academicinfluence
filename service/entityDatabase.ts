import { BaseBuilder, Expression, FieldOptions, PostgresSelect } from "squel";
import databasePool from "../databasePool";
import { influenceScoreColumn } from "../influenceScore";
import * as squel from "../squel";
import processHtml, { processText } from "./processHtml";

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

export function extractIdentifiableFields(row: any) {
  return {
    name: row.name,
    slug: row.slug
  };
}

export function extractDescribableFields(row: any) {
  return {
    ...extractIdentifiableFields(row),
    short_description: row.short_description
  };
}

export function extractOverall(row: any) {
  return {
    influence: row.influence,
    world_rank: row.world_rank,
    usa_rank: row.usa_rank
  };
}

export async function extractEntityFields(row: any) {
  return {
    description: row.wikipedia_description
      ? processText(row.description)
      : await processHtml(row.description),
    wikipedia_description: row.wikipedia_description,
    meta_description: row.description
  };
}

function scoreTableFor(keyword: string | null, entityType: EntityType) {
  return `ai_data.scores_${entityType.kind}_${
    keyword === null
      ? "overall"
      : keyword
          .split("")
          .filter(letter => (letter >= "a" && letter <= "z") || letter == "-")
          .map(letter => (letter === "-" ? "_" : letter))
          .join("")
  }`;
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

  overrideableField(
    entityType: EntityType,
    name: string,
    editor_column?: string,
    data_column?: string
  ) {
    this._query.field(
      `coalesce(nullif(${entityType.editor_table}.${editor_column ||
        name}, ''), ${entityType.data_table}.${data_column || name})`,
      name
    );
    this._query.field(
      `${entityType.editor_table}.${editor_column || name} = ''`,
      "wikipedia_" + name
    );
    return this;
  }

  addDescribableFields(entityType: EntityType) {
    return this.addIdentifiableFields(entityType).overrideableField(
      entityType,
      "short_description"
    );
  }

  addInfluenceFields(
    entityType: EntityType,
    years: { min: number; max: number } = { min: -8000, max: 2020 },
    discipline: string | null = null
  ) {
    this._query
      .join(
        scoreTableFor(discipline, entityType),
        "scores",
        entityType.data_table + ".id = scores.id"
      )
      .where("scores.year_start <= ?", years.max)
      .where("scores.year_end >= ?", years.min)
      .field(influenceScoreColumn(years.min, years.max), "influence")
      .field("world_rank")
      .field("usa_rank");

    return this;
  }

  addPartialFields(entityType: EntityType) {
    this.addDescribableFields(entityType);
    this.addInfluenceFields(entityType);
    return this;
  }

  addEntityFields(entityType: EntityType) {
    this.overrideableField(entityType, "description").overrideableField(
      entityType,
      "meta_description",
      undefined,
      "description"
    );
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
    try {
      return pool.query(this._query.toParam());
    } catch (error) {
      console.log(this._query.toString());
      throw error;
    }
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
