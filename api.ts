// GENERATED.DO NOT EDIT
import Ajv from "ajv";
import {
  CollegeRankingsRequest,
  CollegeRankingsResponse,
  CountriesRequest,
  CountriesResponse,
  DisciplinesRequest,
  DisciplinesResponse,
  FeaturesPageRequest,
  FeaturesPageResponse,
  HomePageRequest,
  HomePageResponse,
  InfluentialPeoplePageRequest,
  InfluentialPeoplePageResponse,
  InfluentialSchoolsPageRequest,
  InfluentialSchoolsPageResponse,
  LocationAutocompleteRequest,
  LocationAutocompleteResponse,
  PersonPageRequest,
  PersonPageResponse,
  PersonSearchRequest,
  PersonSearchResponse,
  SchoolPageRequest,
  SchoolPageResponse,
  SchoolSearchRequest,
  SchoolSearchResponse,
  SchoolSubjectPageRequest,
  SchoolSubjectPageResponse
} from "./schema";
export const apiCollegeRankings = process.browser
  ? async function(
      request: CollegeRankingsRequest
    ): Promise<CollegeRankingsResponse> {
      const response = await fetch(
        "/api/CollegeRankings/" + encodeURIComponent(JSON.stringify(request))
      );
      const data = await response.json();
      if (!validate("CollegeRankingsResponse", data)) {
        throw new Error("validation failed");
      }
      return data;
    }
  : async function(
      request: CollegeRankingsRequest
    ): Promise<CollegeRankingsResponse> {
      const module = await import("./service/collegeRankings");
      const response = await module.default(request);
      if (!validate("CollegeRankingsResponse", response)) {
        throw new Error("validation failed");
      }
      return response;
    };
export const apiDisciplines = process.browser
  ? async function(request: DisciplinesRequest): Promise<DisciplinesResponse> {
      const response = await fetch(
        "/api/Disciplines/" + encodeURIComponent(JSON.stringify(request))
      );
      const data = await response.json();
      if (!validate("DisciplinesResponse", data)) {
        throw new Error("validation failed");
      }
      return data;
    }
  : async function(request: DisciplinesRequest): Promise<DisciplinesResponse> {
      const module = await import("./service/disciplines");
      const response = await module.default(request);
      if (!validate("DisciplinesResponse", response)) {
        throw new Error("validation failed");
      }
      return response;
    };
export const apiCountries = process.browser
  ? async function(request: CountriesRequest): Promise<CountriesResponse> {
      const response = await fetch(
        "/api/Countries/" + encodeURIComponent(JSON.stringify(request))
      );
      const data = await response.json();
      if (!validate("CountriesResponse", data)) {
        throw new Error("validation failed");
      }
      return data;
    }
  : async function(request: CountriesRequest): Promise<CountriesResponse> {
      const module = await import("./service/countries");
      const response = await module.default(request);
      if (!validate("CountriesResponse", response)) {
        throw new Error("validation failed");
      }
      return response;
    };
export const apiFeaturesPage = process.browser
  ? async function(
      request: FeaturesPageRequest
    ): Promise<FeaturesPageResponse> {
      const response = await fetch(
        "/api/FeaturesPage/" + encodeURIComponent(JSON.stringify(request))
      );
      const data = await response.json();
      if (!validate("FeaturesPageResponse", data)) {
        throw new Error("validation failed");
      }
      return data;
    }
  : async function(
      request: FeaturesPageRequest
    ): Promise<FeaturesPageResponse> {
      const module = await import("./service/featuresPage");
      const response = await module.default(request);
      if (!validate("FeaturesPageResponse", response)) {
        throw new Error("validation failed");
      }
      return response;
    };
export const apiHomePage = process.browser
  ? async function(request: HomePageRequest): Promise<HomePageResponse> {
      const response = await fetch(
        "/api/HomePage/" + encodeURIComponent(JSON.stringify(request))
      );
      const data = await response.json();
      if (!validate("HomePageResponse", data)) {
        throw new Error("validation failed");
      }
      return data;
    }
  : async function(request: HomePageRequest): Promise<HomePageResponse> {
      const module = await import("./service/homePage");
      const response = await module.default(request);
      if (!validate("HomePageResponse", response)) {
        throw new Error("validation failed");
      }
      return response;
    };
export const apiInfluentialSchoolsPage = process.browser
  ? async function(
      request: InfluentialSchoolsPageRequest
    ): Promise<InfluentialSchoolsPageResponse> {
      const response = await fetch(
        "/api/InfluentialSchoolsPage/" +
          encodeURIComponent(JSON.stringify(request))
      );
      const data = await response.json();
      if (!validate("InfluentialSchoolsPageResponse", data)) {
        throw new Error("validation failed");
      }
      return data;
    }
  : async function(
      request: InfluentialSchoolsPageRequest
    ): Promise<InfluentialSchoolsPageResponse> {
      const module = await import("./service/influentialSchoolsPage");
      const response = await module.default(request);
      if (!validate("InfluentialSchoolsPageResponse", response)) {
        throw new Error("validation failed");
      }
      return response;
    };
export const apiInfluentialPeoplePage = process.browser
  ? async function(
      request: InfluentialPeoplePageRequest
    ): Promise<InfluentialPeoplePageResponse> {
      const response = await fetch(
        "/api/InfluentialPeoplePage/" +
          encodeURIComponent(JSON.stringify(request))
      );
      const data = await response.json();
      if (!validate("InfluentialPeoplePageResponse", data)) {
        throw new Error("validation failed");
      }
      return data;
    }
  : async function(
      request: InfluentialPeoplePageRequest
    ): Promise<InfluentialPeoplePageResponse> {
      const module = await import("./service/influentialPeoplePage");
      const response = await module.default(request);
      if (!validate("InfluentialPeoplePageResponse", response)) {
        throw new Error("validation failed");
      }
      return response;
    };
export const apiLocationAutocomplete = process.browser
  ? async function(
      request: LocationAutocompleteRequest
    ): Promise<LocationAutocompleteResponse> {
      const response = await fetch(
        "/api/LocationAutocomplete/" +
          encodeURIComponent(JSON.stringify(request))
      );
      const data = await response.json();
      if (!validate("LocationAutocompleteResponse", data)) {
        throw new Error("validation failed");
      }
      return data;
    }
  : async function(
      request: LocationAutocompleteRequest
    ): Promise<LocationAutocompleteResponse> {
      const module = await import("./service/locationAutocomplete");
      const response = await module.default(request);
      if (!validate("LocationAutocompleteResponse", response)) {
        throw new Error("validation failed");
      }
      return response;
    };
export const apiSchoolSearch = process.browser
  ? async function(
      request: SchoolSearchRequest
    ): Promise<SchoolSearchResponse> {
      const response = await fetch(
        "/api/SchoolSearch/" + encodeURIComponent(JSON.stringify(request))
      );
      const data = await response.json();
      if (!validate("SchoolSearchResponse", data)) {
        throw new Error("validation failed");
      }
      return data;
    }
  : async function(
      request: SchoolSearchRequest
    ): Promise<SchoolSearchResponse> {
      const module = await import("./service/schoolSearch");
      const response = await module.default(request);
      if (!validate("SchoolSearchResponse", response)) {
        throw new Error("validation failed");
      }
      return response;
    };
export const apiPersonSearch = process.browser
  ? async function(
      request: PersonSearchRequest
    ): Promise<PersonSearchResponse> {
      const response = await fetch(
        "/api/PersonSearch/" + encodeURIComponent(JSON.stringify(request))
      );
      const data = await response.json();
      if (!validate("PersonSearchResponse", data)) {
        throw new Error("validation failed");
      }
      return data;
    }
  : async function(
      request: PersonSearchRequest
    ): Promise<PersonSearchResponse> {
      const module = await import("./service/personSearch");
      const response = await module.default(request);
      if (!validate("PersonSearchResponse", response)) {
        throw new Error("validation failed");
      }
      return response;
    };
export const apiPersonPage = process.browser
  ? async function(request: PersonPageRequest): Promise<PersonPageResponse> {
      const response = await fetch(
        "/api/PersonPage/" + encodeURIComponent(JSON.stringify(request))
      );
      const data = await response.json();
      if (!validate("PersonPageResponse", data)) {
        throw new Error("validation failed");
      }
      return data;
    }
  : async function(request: PersonPageRequest): Promise<PersonPageResponse> {
      const module = await import("./service/personPage");
      const response = await module.default(request);
      if (!validate("PersonPageResponse", response)) {
        throw new Error("validation failed");
      }
      return response;
    };
export const apiSchoolPage = process.browser
  ? async function(request: SchoolPageRequest): Promise<SchoolPageResponse> {
      const response = await fetch(
        "/api/SchoolPage/" + encodeURIComponent(JSON.stringify(request))
      );
      const data = await response.json();
      if (!validate("SchoolPageResponse", data)) {
        throw new Error("validation failed");
      }
      return data;
    }
  : async function(request: SchoolPageRequest): Promise<SchoolPageResponse> {
      const module = await import("./service/schoolPage");
      const response = await module.default(request);
      if (!validate("SchoolPageResponse", response)) {
        throw new Error("validation failed");
      }
      return response;
    };
export const apiSchoolSubjectPage = process.browser
  ? async function(
      request: SchoolSubjectPageRequest
    ): Promise<SchoolSubjectPageResponse> {
      const response = await fetch(
        "/api/SchoolSubjectPage/" + encodeURIComponent(JSON.stringify(request))
      );
      const data = await response.json();
      if (!validate("SchoolSubjectPageResponse", data)) {
        throw new Error("validation failed");
      }
      return data;
    }
  : async function(
      request: SchoolSubjectPageRequest
    ): Promise<SchoolSubjectPageResponse> {
      const module = await import("./service/schoolSubjectPage");
      const response = await module.default(request);
      if (!validate("SchoolSubjectPageResponse", response)) {
        throw new Error("validation failed");
      }
      return response;
    };
const validator = new Ajv();
validator.compile({
  $schema: "http://json-schema.org/draft-07/schema#",
  definitions: {
    DisciplineInfluenceData: {
      type: "object",
      properties: {
        influence: { type: "number" },
        world_rank: { type: "number" },
        usa_rank: { type: ["number", "null"] }
      },
      required: ["influence", "world_rank", "usa_rank"],
      additionalProperties: false
    },
    Identifiable: {
      type: "object",
      properties: { slug: { type: "string" }, name: { type: "string" } },
      required: ["slug", "name"],
      additionalProperties: false
    },
    Describable: {
      type: "object",
      properties: {
        slug: { type: "string" },
        name: { type: "string" },
        description: { type: "string" },
        short_description: { type: "string" }
      },
      required: ["description", "name", "short_description", "slug"],
      additionalProperties: false
    },
    EntityPartialData: {
      type: "object",
      properties: {
        slug: { type: "string" },
        name: { type: "string" },
        description: { type: "string" },
        short_description: { type: "string" },
        overall: {
          type: "object",
          properties: {
            influence: { type: "number" },
            world_rank: { type: "number" },
            usa_rank: { type: ["number", "null"] }
          },
          required: ["influence", "world_rank", "usa_rank"],
          additionalProperties: false
        }
      },
      required: ["description", "name", "overall", "short_description", "slug"],
      additionalProperties: false
    },
    PersonPartialData: {
      type: "object",
      additionalProperties: false,
      properties: {
        slug: { type: "string" },
        name: { type: "string" },
        description: { type: "string" },
        short_description: { type: "string" },
        overall: {
          type: "object",
          properties: {
            influence: { type: "number" },
            world_rank: { type: "number" },
            usa_rank: { type: ["number", "null"] }
          },
          required: ["influence", "world_rank", "usa_rank"],
          additionalProperties: false
        }
      },
      required: ["description", "name", "overall", "short_description", "slug"]
    },
    SchoolPartialData: {
      type: "object",
      properties: {
        slug: { type: "string" },
        name: { type: "string" },
        description: { type: "string" },
        short_description: { type: "string" },
        overall: {
          type: "object",
          properties: {
            influence: { type: "number" },
            world_rank: { type: "number" },
            usa_rank: { type: ["number", "null"] }
          },
          required: ["influence", "world_rank", "usa_rank"],
          additionalProperties: false
        },
        city: { type: ["string", "null"] },
        state: { type: ["string", "null"] },
        median_act: { type: ["number", "null"] },
        median_sat: { type: ["number", "null"] },
        undergrad_tuition_in_state: { type: ["number", "null"] },
        average_earnings: { type: ["number", "null"] },
        graduation_rate: { type: ["number", "null"] },
        total_students: { type: ["number", "null"] },
        acceptance_rate: { type: ["number", "null"] },
        desirability: { type: ["number", "null"] },
        logo_url: { type: ["string", "null"] },
        top_discipline: { type: ["string", "null"] }
      },
      required: [
        "acceptance_rate",
        "average_earnings",
        "city",
        "description",
        "desirability",
        "graduation_rate",
        "logo_url",
        "median_act",
        "median_sat",
        "name",
        "overall",
        "short_description",
        "slug",
        "state",
        "top_discipline",
        "total_students",
        "undergrad_tuition_in_state"
      ],
      additionalProperties: false
    },
    WeatherData: {
      type: "object",
      properties: { high: { type: "number" }, low: { type: "number" } },
      required: ["high", "low"],
      additionalProperties: false
    },
    SchoolData: {
      type: "object",
      properties: {
        slug: { type: "string" },
        name: { type: "string" },
        description: { type: "string" },
        short_description: { type: "string" },
        overall: {
          type: "object",
          properties: {
            influence: { type: "number" },
            world_rank: { type: "number" },
            usa_rank: { type: ["number", "null"] }
          },
          required: ["influence", "world_rank", "usa_rank"],
          additionalProperties: false
        },
        city: { type: ["string", "null"] },
        state: { type: ["string", "null"] },
        median_act: { type: ["number", "null"] },
        median_sat: { type: ["number", "null"] },
        undergrad_tuition_in_state: { type: ["number", "null"] },
        average_earnings: { type: ["number", "null"] },
        graduation_rate: { type: ["number", "null"] },
        total_students: { type: ["number", "null"] },
        acceptance_rate: { type: ["number", "null"] },
        desirability: { type: ["number", "null"] },
        logo_url: { type: ["string", "null"] },
        top_discipline: { type: ["string", "null"] },
        meta_description: { type: "string" },
        employed_10_years: { type: ["number", "null"] },
        desirability_rank: { type: ["number", "null"] },
        undergrad_tuition_out_of_state: { type: ["number", "null"] },
        grad_tuition_out_of_state: { type: ["number", "null"] },
        grad_tuition_in_state: { type: ["number", "null"] },
        undergrad_fees_in_state: { type: ["number", "null"] },
        undergrad_fees_out_of_state: { type: ["number", "null"] },
        grad_fees_in_state: { type: ["number", "null"] },
        grad_fees_out_of_state: { type: ["number", "null"] },
        average_net_price: { type: ["number", "null"] },
        test_competitiveness: { type: ["number", "null"] },
        campus_property_crime_rate: { type: ["number", "null"] },
        campus_violent_crime_rate: { type: ["number", "null"] },
        city_property_crime_rate: { type: ["number", "null"] },
        city_violent_crime_rate: { type: ["number", "null"] },
        influence_over_time: {
          type: "array",
          items: {
            type: "object",
            properties: { year: { type: "number" }, value: { type: "number" } },
            required: ["year", "value"],
            additionalProperties: false
          }
        },
        disciplines: {
          type: "object",
          additionalProperties: {
            $ref: "#/definitions/DisciplineInfluenceData"
          }
        },
        alumni: {
          type: "array",
          items: { $ref: "#/definitions/PersonPartialData" }
        },
        people: {
          type: "array",
          items: { $ref: "#/definitions/PersonPartialData" }
        },
        weather: {
          anyOf: [
            {
              type: "object",
              properties: {
                winter: { $ref: "#/definitions/WeatherData" },
                spring: { $ref: "#/definitions/WeatherData" },
                summer: { $ref: "#/definitions/WeatherData" },
                fall: { $ref: "#/definitions/WeatherData" }
              },
              required: ["winter", "spring", "summer", "fall"],
              additionalProperties: false
            },
            { type: "null" }
          ]
        }
      },
      required: [
        "acceptance_rate",
        "alumni",
        "average_earnings",
        "average_net_price",
        "campus_property_crime_rate",
        "campus_violent_crime_rate",
        "city",
        "city_property_crime_rate",
        "city_violent_crime_rate",
        "description",
        "desirability",
        "desirability_rank",
        "disciplines",
        "employed_10_years",
        "grad_fees_in_state",
        "grad_fees_out_of_state",
        "grad_tuition_in_state",
        "grad_tuition_out_of_state",
        "graduation_rate",
        "influence_over_time",
        "logo_url",
        "median_act",
        "median_sat",
        "meta_description",
        "name",
        "overall",
        "people",
        "short_description",
        "slug",
        "state",
        "test_competitiveness",
        "top_discipline",
        "total_students",
        "undergrad_fees_in_state",
        "undergrad_fees_out_of_state",
        "undergrad_tuition_in_state",
        "undergrad_tuition_out_of_state",
        "weather"
      ],
      additionalProperties: false
    },
    PersonData: {
      type: "object",
      properties: {
        slug: { type: "string" },
        name: { type: "string" },
        description: { type: "string" },
        short_description: { type: "string" },
        overall: {
          type: "object",
          properties: {
            influence: { type: "number" },
            world_rank: { type: "number" },
            usa_rank: { type: ["number", "null"] }
          },
          required: ["influence", "world_rank", "usa_rank"],
          additionalProperties: false
        },
        meta_description: { type: "string" },
        links: { type: "array", items: { type: "string" } },
        birth_year: { type: ["number", "null"] },
        death_year: { type: ["number", "null"] },
        image_url: { type: ["string", "null"] },
        image_source_url: { type: ["string", "null"] },
        disciplines: {
          type: "object",
          additionalProperties: {
            $ref: "#/definitions/DisciplineInfluenceData"
          }
        },
        works: {
          type: "array",
          items: {
            type: "object",
            properties: { label: { type: "string" } },
            required: ["label"],
            additionalProperties: false
          }
        },
        schools: {
          type: "array",
          items: { $ref: "#/definitions/Identifiable" }
        }
      },
      required: [
        "birth_year",
        "death_year",
        "description",
        "disciplines",
        "image_source_url",
        "image_url",
        "links",
        "meta_description",
        "name",
        "overall",
        "schools",
        "short_description",
        "slug",
        "works"
      ],
      additionalProperties: false
    },
    CollegeRankingSort: {
      type: "string",
      enum: [
        "undergrad_tuition_in_state",
        "name",
        "median_sat",
        "average_earnings",
        "acceptance_rate",
        "total_students",
        "influence",
        "desirability",
        "graduation_rate"
      ]
    },
    CollegeRankingsRequest: {
      type: "object",
      properties: {
        sort: { $ref: "#/definitions/CollegeRankingSort" },
        reversed: { type: "boolean" },
        states: {
          anyOf: [
            { type: "array", items: { type: "string" } },
            { type: "null" }
          ]
        },
        location: {
          anyOf: [
            {
              type: "object",
              properties: {
                name: { type: "string" },
                lat: { type: "string" },
                long: { type: "string" },
                distance: {
                  type: "object",
                  properties: {
                    min: { type: "number" },
                    max: { type: "number" }
                  },
                  required: ["min", "max"],
                  additionalProperties: false
                }
              },
              required: ["name", "lat", "long", "distance"],
              additionalProperties: false
            },
            { type: "null" }
          ]
        },
        discipline: { type: ["string", "null"] },
        tuition: {
          type: "object",
          properties: { min: { type: "number" }, max: { type: "number" } },
          required: ["min", "max"],
          additionalProperties: false
        },
        median_sat: {
          type: "object",
          properties: { min: { type: "number" }, max: { type: "number" } },
          required: ["min", "max"],
          additionalProperties: false
        },
        acceptance_rate: {
          type: "object",
          properties: { min: { type: "number" }, max: { type: "number" } },
          required: ["min", "max"],
          additionalProperties: false
        },
        total_students: {
          type: "object",
          properties: { min: { type: "number" }, max: { type: "number" } },
          required: ["min", "max"],
          additionalProperties: false
        },
        years: {
          type: "object",
          properties: { min: { type: "number" }, max: { type: "number" } },
          required: ["min", "max"],
          additionalProperties: false
        }
      },
      required: [
        "sort",
        "reversed",
        "states",
        "location",
        "discipline",
        "tuition",
        "median_sat",
        "acceptance_rate",
        "total_students",
        "years"
      ],
      additionalProperties: false
    },
    CollegeRankingsResponse: {
      type: "object",
      properties: {
        schools: {
          type: "array",
          items: { $ref: "#/definitions/SchoolPartialData" }
        },
        limits: {
          type: "object",
          properties: {
            tuition: {
              type: "object",
              properties: { min: { type: "number" }, max: { type: "number" } },
              required: ["min", "max"],
              additionalProperties: false
            },
            median_sat: {
              type: "object",
              properties: { min: { type: "number" }, max: { type: "number" } },
              required: ["min", "max"],
              additionalProperties: false
            },
            acceptance_rate: {
              type: "object",
              properties: { min: { type: "number" }, max: { type: "number" } },
              required: ["min", "max"],
              additionalProperties: false
            },
            total_students: {
              type: "object",
              properties: { min: { type: "number" }, max: { type: "number" } },
              required: ["min", "max"],
              additionalProperties: false
            },
            years: {
              type: "object",
              properties: { min: { type: "number" }, max: { type: "number" } },
              required: ["min", "max"],
              additionalProperties: false
            }
          },
          required: [
            "tuition",
            "median_sat",
            "acceptance_rate",
            "total_students",
            "years"
          ],
          additionalProperties: false
        }
      },
      required: ["schools", "limits"],
      additionalProperties: false
    },
    DisciplinesRequest: { type: "object", additionalProperties: false },
    DisciplinesResponse: {
      type: "object",
      additionalProperties: {
        type: "object",
        properties: { parent: { type: ["string", "null"] } },
        required: ["parent"],
        additionalProperties: false
      }
    },
    CountriesRequest: { type: "object", additionalProperties: false },
    Country: {
      type: "object",
      properties: { name: { type: "string" } },
      required: ["name"],
      additionalProperties: false
    },
    CountriesResponse: {
      type: "array",
      items: { $ref: "#/definitions/Country" }
    },
    FeaturesPageRequest: {
      type: "object",
      properties: {
        category: { type: ["string", "null"] },
        article: { type: ["string", "null"] }
      },
      required: ["category", "article"],
      additionalProperties: false
    },
    FeaturesPageResponse: {
      type: "object",
      properties: {
        categories: {
          type: "array",
          items: { $ref: "#/definitions/Category" }
        },
        category: {
          anyOf: [
            {
              type: "object",
              properties: {
                name: { type: "string" },
                slug: { type: "string" },
                description: { type: "string" }
              },
              required: ["name", "slug", "description"],
              additionalProperties: false
            },
            { type: "null" }
          ]
        },
        article: {
          anyOf: [{ $ref: "#/definitions/ArticleData" }, { type: "null" }]
        },
        articles: {
          type: "array",
          items: { $ref: "#/definitions/ArticlePartialData" }
        }
      },
      required: ["categories", "category", "article", "articles"],
      additionalProperties: false
    },
    Category: {
      type: "object",
      additionalProperties: false,
      properties: { slug: { type: "string" }, name: { type: "string" } },
      required: ["name", "slug"]
    },
    ArticleData: {
      type: "object",
      properties: {
        slug: { type: "string" },
        name: { type: "string" },
        excerpt: { type: "string" },
        author: { type: "string" },
        date: { type: "string" },
        bannerUrl: { type: "string" },
        thumbnailUrl: { type: "string" },
        category: { $ref: "#/definitions/Category" },
        content: { type: "array", items: { $ref: "#/definitions/Html" } }
      },
      required: [
        "author",
        "bannerUrl",
        "category",
        "content",
        "date",
        "excerpt",
        "name",
        "slug",
        "thumbnailUrl"
      ],
      additionalProperties: false
    },
    Html: {
      anyOf: [
        { $ref: "#/definitions/HtmlNode" },
        { type: "string" },
        { type: "number" }
      ]
    },
    HtmlNode: {
      type: "object",
      properties: {
        component: { type: "string" },
        props: { type: "object" },
        children: { type: "array", items: { $ref: "#/definitions/Html" } }
      },
      required: ["component", "props", "children"],
      additionalProperties: false
    },
    ArticlePartialData: {
      type: "object",
      properties: {
        slug: { type: "string" },
        name: { type: "string" },
        excerpt: { type: "string" },
        author: { type: "string" },
        date: { type: "string" },
        bannerUrl: { type: "string" },
        thumbnailUrl: { type: "string" },
        category: { $ref: "#/definitions/Category" }
      },
      required: [
        "author",
        "bannerUrl",
        "category",
        "date",
        "excerpt",
        "name",
        "slug",
        "thumbnailUrl"
      ],
      additionalProperties: false
    },
    HomePageRequest: { type: "object", additionalProperties: false },
    HomePageResponse: {
      type: "object",
      properties: {
        currentFeature: { $ref: "#/definitions/ArticlePartialData" }
      },
      required: ["currentFeature"],
      additionalProperties: false
    },
    InfluentialSchoolsPageRequest: {
      type: "object",
      properties: {
        country: { type: ["string", "null"] },
        discipline: { type: ["string", "null"] },
        years: {
          type: "object",
          properties: { min: { type: "number" }, max: { type: "number" } },
          required: ["min", "max"],
          additionalProperties: false
        }
      },
      required: ["country", "discipline", "years"],
      additionalProperties: false
    },
    InfluentialSchoolsPageResponse: {
      type: "object",
      properties: {
        schools: {
          type: "array",
          items: { $ref: "#/definitions/SchoolPartialData" }
        }
      },
      required: ["schools"],
      additionalProperties: false
    },
    InfluentialPeoplePageRequest: {
      type: "object",
      properties: {
        country: { type: ["string", "null"] },
        discipline: { type: ["string", "null"] },
        gender: { type: ["boolean", "null"] },
        years: {
          type: "object",
          properties: { min: { type: "number" }, max: { type: "number" } },
          required: ["min", "max"],
          additionalProperties: false
        }
      },
      required: ["country", "discipline", "gender", "years"],
      additionalProperties: false
    },
    InfluentialPeoplePageResponse: {
      type: "object",
      properties: {
        people: {
          type: "array",
          items: { $ref: "#/definitions/PersonPartialData" }
        }
      },
      required: ["people"],
      additionalProperties: false
    },
    LocationAutocompleteRequest: { type: "string" },
    LocationAutocompleteResponse: {
      type: "object",
      properties: {
        cities: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
              long: { type: "number" },
              lat: { type: "number" }
            },
            required: ["name", "long", "lat"],
            additionalProperties: false
          }
        }
      },
      required: ["cities"],
      additionalProperties: false
    },
    SchoolSearchRequest: { type: "string" },
    SchoolSearchResponse: {
      type: "object",
      properties: {
        schools: {
          type: "array",
          items: { $ref: "#/definitions/Identifiable" }
        }
      },
      required: ["schools"],
      additionalProperties: false
    },
    PersonSearchRequest: { type: "string" },
    PersonSearchResponse: {
      type: "object",
      properties: {
        people: { type: "array", items: { $ref: "#/definitions/Identifiable" } }
      },
      required: ["people"],
      additionalProperties: false
    },
    PersonPageRequest: {
      type: "object",
      properties: { slug: { type: "string" } },
      required: ["slug"],
      additionalProperties: false
    },
    PersonPageResponse: {
      type: "object",
      properties: { person: { $ref: "#/definitions/PersonData" } },
      required: ["person"],
      additionalProperties: false
    },
    SchoolPageRequest: {
      type: "object",
      properties: { slug: { type: "string" } },
      required: ["slug"],
      additionalProperties: false
    },
    SchoolPageResponse: {
      type: "object",
      properties: { school: { $ref: "#/definitions/SchoolData" } },
      required: ["school"],
      additionalProperties: false
    },
    SchoolSubjectPageRequest: {
      type: "object",
      properties: { slug: { type: "string" }, discipline: { type: "string" } },
      required: ["slug", "discipline"],
      additionalProperties: false
    },
    SchoolSubjectPageResponse: {
      type: "object",
      properties: {
        staff: {
          type: "array",
          items: { $ref: "#/definitions/PersonPartialData" }
        },
        alumni: {
          type: "array",
          items: { $ref: "#/definitions/PersonPartialData" }
        }
      },
      required: ["staff", "alumni"],
      additionalProperties: false
    }
  }
});

export function validate(name: string, data: any) {
  if (!validator.validate("#/definitions/" + name, data)) {
    console.error(validator.errors);
    return false;
  }
  return true;
}
