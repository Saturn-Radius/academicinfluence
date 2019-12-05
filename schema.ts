import { JSONSchema4 } from "json-schema";
import { Dictionary } from "lodash";

type SchemaDef = {
  request: JSONSchema4;
  response: JSONSchema4;
};

function object(
  properties: Dictionary<JSONSchema4>,
  title?: string
): JSONSchema4 {
  return {
    type: "object",
    required: Object.keys(properties),
    additionalProperties: false,
    properties,
    title
  };
}

function nullable(schema: JSONSchema4): JSONSchema4 {
  return {
    anyOf: [schema, { type: "null" }]
  };
}

const LIMIT = object({
  min: { type: "number" },
  max: { type: "number" }
});

const RANKING_LIMITS = {
  tuition: LIMIT,
  median_sat: LIMIT,
  acceptance_rate: LIMIT,
  total_students: LIMIT
};

export const SCHEMAS: Dictionary<SchemaDef> = {
  CollegeRankings: {
    request: object({
      sort: {
        title: "College Ranking Sort",
        type: "string",
        enum: [
          "undergrad_tuition_in_state",
          "name",
          "median_sat",
          "average_earnings",
          "acceptance_rate",
          "total_students",
          "influence_score"
        ]
      },
      reversed: {
        type: "boolean"
      },
      ...RANKING_LIMITS
    }),
    response: object({
      schools: {
        type: "array",
        items: object(
          {
            id: {
              type: "string"
            },
            name: {
              type: "string"
            },
            city: {
              type: "string"
            },
            state: {
              type: "string"
            },
            median_act: nullable({ type: "number" }),
            median_sat: nullable({ type: "number" }),
            undergrad_tuition_in_state: nullable({ type: "number" }),
            average_earnings: nullable({ type: "number" }),
            total_students: nullable({ type: "number" }),
            influence_score: nullable({ type: "number" }),
            acceptance_rate: nullable({ type: "number" })
          },
          "CollegeData"
        )
      },
      limits: object(RANKING_LIMITS)
    })
  }
};

export default SCHEMAS;
