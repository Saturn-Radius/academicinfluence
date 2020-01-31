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

export const DEFINITIONS = {
  disciplineInfluenceData: {
    type: "object",
    title: "DisciplineInfluenceData",
    patternProperties: {
      "^[A-Za-z ]+$": object({
        world_rank: { type: "number" },
        usa_rank: { type: "number" },
        influence: { type: "number" }
      })
    }
  }
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
          "desirability",
          "graduation_rate"
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
            graduation_rate: nullable({ type: "number" }),
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
            bannerUrl: { type: "string" },
            thumbnailUrl: { type: "string" }
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
            bannerUrl: { type: "string" },
            thumbnailUrl: { type: "string" }
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
        title: { type: "string" },
        category: { type: "string" },
        slug: { type: "string" },
        bannerUrl: { type: "string" },
        thumbnailUrl: { type: "string" }
      })
    })
  },
  PersonPage: {
    request: object({
      slug: { type: "string" }
    }),
    response: object({
      person: object(
        {
          name: { type: "string" },
          description: { type: "string" },
          disciplines: { $ref: "#/definitions/disciplineInfluenceData" }
        },
        "PersonData"
      )
    })
  },
  SchoolPage: {
    request: object({
      slug: { type: "string" }
    }),
    response: object({
      school: object(
        {
          name: { type: "string" },
          description: { type: "string" },
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
          employed_10_years: nullable({ type: "number" }),
          total_students: nullable({ type: "number" }),
          acceptance_rate: nullable({ type: "number" }),
          desirability: nullable({ type: "number" }),
          desirability_rank: nullable({ type: "number" }),
          undergrad_tuition_out_of_state: nullable({ type: "number" }),
          grad_tuition_in_state: nullable({ type: "number" }),
          grad_tuition_out_of_state: nullable({ type: "number" }),

          undergrad_fees_in_state: nullable({ type: "number" }),
          undergrad_fees_out_of_state: nullable({ type: "number" }),
          grad_fees_in_state: nullable({ type: "number" }),
          grad_fees_out_of_state: nullable({ type: "number" }),

          average_net_price: nullable({ type: "number" }),
          logo_url: nullable({ type: "string" }),
          graduation_rate: nullable({ type: "number" }),
          test_competitiveness: nullable({ type: "number" }),
          campus_property_crime_rate: nullable({ type: "number" }),
          campus_violent_crime_rate: nullable({ type: "number" }),
          city_property_crime_rate: nullable({ type: "number" }),
          city_violent_crime_rate: nullable({ type: "number" }),
          overall: object({
            world_rank: { type: "number" },
            usa_rank: { type: "number" },
            influence: { type: "number" },
            over_time: {
              type: "array",
              items: object({
                year: { type: "number" },
                value: { type: "number" }
              })
            }
          }),
          disciplines: { $ref: "#/definitions/disciplineInfluenceData" },
          people: {
            type: "array",
            items: object({
              slug: { type: "string" },
              name: { type: "string" },
              description: { type: "string" },
              influence: { type: "number" }
            })
          },
          alumni: {
            type: "array",
            items: object({
              slug: { type: "string" },
              name: { type: "string" },
              description: { type: "string" },
              influence: { type: "number" }
            })
          },
          weather: nullable(
            object({
              winter: object({
                high: { type: "number" },
                low: { type: "number" }
              }),
              spring: object({
                high: { type: "number" },
                low: { type: "number" }
              }),
              summer: object({
                high: { type: "number" },
                low: { type: "number" }
              }),
              fall: object({
                high: { type: "number" },
                low: { type: "number" }
              })
            })
          )
        },
        "SchoolData"
      )
    })
  }
};

export default SCHEMAS;
