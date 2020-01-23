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
  total_students: LIMIT,
  years: LIMIT
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
          "influence_score",
          "desirability"
        ]
      },
      reversed: {
        type: "boolean"
      },
      states: nullable({
        type: "array",
        items: {
          type: "string"
        }
      }),
      location: nullable(
        object({
          name: { type: "string" },
          lat: { type: "string" },
          long: { type: "string" },
          distance: LIMIT
        })
      ),
      discipline: nullable({
        type: "string"
      }),
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
            acceptance_rate: nullable({ type: "number" }),
            desirability: nullable({ type: "number" }),
            logo_url: nullable({ type: "string" })
          },
          "CollegeData"
        )
      },
      limits: object(RANKING_LIMITS)
    })
  },
  LocationAutocomplete: {
    request: {
      type: "string"
    },
    response: object({
      cities: {
        type: "array",
        items: object({
          name: { type: "string" },
          long: { type: "string" },
          lat: { type: "string" }
        })
      }
    })
  },
  Disciplines: {
    request: object({}),
    response: {
      type: "object",
      patternProperties: {
        "^[A-Za-z ]+$": object({
          parent: nullable({
            type: "string"
          })
        })
      }
    }
  },
  FeaturesPage: {
    request: object({
      category: nullable({ type: "string" }),
      article: nullable({ type: "string" })
    }),
    response: object({
      categories: {
        type: "array",
        items: object(
          {
            name: {
              type: "string"
            },
            slug: {
              type: "string"
            }
          },
          "FeaturesPageCategory"
        )
      },
      category: nullable(
        object({
          name: { type: "string" },
          slug: { type: "string" },
          description: { type: "string" }
        })
      ),
      article: nullable(
        object(
          {
            title: { type: "string" },
            content: { type: "string" },
            excerpt: { type: "string" },
            author: { type: "string" },
            date: { type: "string" },
            bannerUrl: {type: "string"},
            thumbnailUrl: {type: "string"}
 
          },
          "FeaturePageArticle"
        )
      ),
      articles: {
        type: "array",
        items: object(
          {
            title: { type: "string" },
            slug: { type: "string" },
            category: object({
              slug: { type: "string" },
              name: { type: "string" }
            }),
            excerpt: { type: "string" },
            author: { type: "string" },
            date: { type: "string" },
            bannerUrl: {type: "string"},
            thumbnailUrl: {type: "string"}
          },
          "FeaturesPageArticleSummary"
        )
      }
    })
  },
  HomePage: {
    request: object({}),
    response: object({
      currentFeature: object({
        title: {type: "string"},
        category: {type: "string"},
        slug: {type: "string"},
        bannerUrl: {type: "string"},
        thumbnailUrl: {type: "string"}
      })
    })
  },
  SchoolPage: {
    request: object({
      slug: {type: "string"}
    }),
    response: object({
      school: object({
        name: {type: "string"},
        description: {type: "string"},
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
            acceptance_rate: nullable({ type: "number" }),
            desirability: nullable({ type: "number" }),
            logo_url: nullable({ type: "string" }),
            graduation_rate: nullable({type: "string"})

      }, "SchoolData")
    })
  }
};

export default SCHEMAS;
