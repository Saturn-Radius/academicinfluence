// GENERATED.DO NOT EDIT
import Ajv from "ajv";
import {
  BasicContextRequest,
  BasicContextResponse,
  CollegeRankingsRequest,
  CollegeRankingsResponse,
  DisciplineRequest,
  DisciplineResponse,
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
  PageRequest,
  PageResponse,
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
      request: CollegeRankingsRequest,
      abortSignal?: AbortSignal
    ): Promise<CollegeRankingsResponse> {
      const response = await fetch(
        "/api/CollegeRankings/" + encodeURIComponent(JSON.stringify(request)),
        { signal: abortSignal }
      );
      const data = await response.json();
      if (response.status !== 200) {
        throw new Error("Bad Response");
      }
      if (!validate("CollegeRankingsResponse", data)) {
        throw new Error("validation failed");
      }
      return data;
    }
  : async function(
      request: CollegeRankingsRequest,
      abortSignal?: AbortSignal
    ): Promise<CollegeRankingsResponse> {
      const module = await import("./service/collegeRankings");
      const response = await module.default(request);
      if (response === null) {
        throw new Error("Bad Response");
      }
      if (!validate("CollegeRankingsResponse", response)) {
        throw new Error("validation failed");
      }
      return response;
    };
export const apiBasicContext = process.browser
  ? async function(
      request: BasicContextRequest,
      abortSignal?: AbortSignal
    ): Promise<BasicContextResponse> {
      const response = await fetch(
        "/api/BasicContext/" + encodeURIComponent(JSON.stringify(request)),
        { signal: abortSignal }
      );
      const data = await response.json();
      if (response.status !== 200) {
        throw new Error("Bad Response");
      }
      if (!validate("BasicContextResponse", data)) {
        throw new Error("validation failed");
      }
      return data;
    }
  : async function(
      request: BasicContextRequest,
      abortSignal?: AbortSignal
    ): Promise<BasicContextResponse> {
      const module = await import("./service/basicContext");
      const response = await module.default(request);
      if (response === null) {
        throw new Error("Bad Response");
      }
      if (!validate("BasicContextResponse", response)) {
        throw new Error("validation failed");
      }
      return response;
    };
export const apiFeaturesPage = process.browser
  ? async function(
      request: FeaturesPageRequest,
      abortSignal?: AbortSignal
    ): Promise<FeaturesPageResponse> {
      const response = await fetch(
        "/api/FeaturesPage/" + encodeURIComponent(JSON.stringify(request)),
        { signal: abortSignal }
      );
      const data = await response.json();
      if (response.status !== 200) {
        throw new Error("Bad Response");
      }
      if (!validate("FeaturesPageResponse", data)) {
        throw new Error("validation failed");
      }
      return data;
    }
  : async function(
      request: FeaturesPageRequest,
      abortSignal?: AbortSignal
    ): Promise<FeaturesPageResponse> {
      const module = await import("./service/featuresPage");
      const response = await module.default(request);
      if (response === null) {
        throw new Error("Bad Response");
      }
      if (!validate("FeaturesPageResponse", response)) {
        throw new Error("validation failed");
      }
      return response;
    };
export const apiHomePage = process.browser
  ? async function(
      request: HomePageRequest,
      abortSignal?: AbortSignal
    ): Promise<HomePageResponse> {
      const response = await fetch(
        "/api/HomePage/" + encodeURIComponent(JSON.stringify(request)),
        { signal: abortSignal }
      );
      const data = await response.json();
      if (response.status !== 200) {
        throw new Error("Bad Response");
      }
      if (!validate("HomePageResponse", data)) {
        throw new Error("validation failed");
      }
      return data;
    }
  : async function(
      request: HomePageRequest,
      abortSignal?: AbortSignal
    ): Promise<HomePageResponse> {
      const module = await import("./service/homePage");
      const response = await module.default(request);
      if (response === null) {
        throw new Error("Bad Response");
      }
      if (!validate("HomePageResponse", response)) {
        throw new Error("validation failed");
      }
      return response;
    };
export const apiInfluentialSchoolsPage = process.browser
  ? async function(
      request: InfluentialSchoolsPageRequest,
      abortSignal?: AbortSignal
    ): Promise<InfluentialSchoolsPageResponse> {
      const response = await fetch(
        "/api/InfluentialSchoolsPage/" +
          encodeURIComponent(JSON.stringify(request)),
        { signal: abortSignal }
      );
      const data = await response.json();
      if (response.status !== 200) {
        throw new Error("Bad Response");
      }
      if (!validate("InfluentialSchoolsPageResponse", data)) {
        throw new Error("validation failed");
      }
      return data;
    }
  : async function(
      request: InfluentialSchoolsPageRequest,
      abortSignal?: AbortSignal
    ): Promise<InfluentialSchoolsPageResponse> {
      const module = await import("./service/influentialSchoolsPage");
      const response = await module.default(request);
      if (response === null) {
        throw new Error("Bad Response");
      }
      if (!validate("InfluentialSchoolsPageResponse", response)) {
        throw new Error("validation failed");
      }
      return response;
    };
export const apiInfluentialPeoplePage = process.browser
  ? async function(
      request: InfluentialPeoplePageRequest,
      abortSignal?: AbortSignal
    ): Promise<InfluentialPeoplePageResponse> {
      const response = await fetch(
        "/api/InfluentialPeoplePage/" +
          encodeURIComponent(JSON.stringify(request)),
        { signal: abortSignal }
      );
      const data = await response.json();
      if (response.status !== 200) {
        throw new Error("Bad Response");
      }
      if (!validate("InfluentialPeoplePageResponse", data)) {
        throw new Error("validation failed");
      }
      return data;
    }
  : async function(
      request: InfluentialPeoplePageRequest,
      abortSignal?: AbortSignal
    ): Promise<InfluentialPeoplePageResponse> {
      const module = await import("./service/influentialPeoplePage");
      const response = await module.default(request);
      if (response === null) {
        throw new Error("Bad Response");
      }
      if (!validate("InfluentialPeoplePageResponse", response)) {
        throw new Error("validation failed");
      }
      return response;
    };
export const apiLocationAutocomplete = process.browser
  ? async function(
      request: LocationAutocompleteRequest,
      abortSignal?: AbortSignal
    ): Promise<LocationAutocompleteResponse> {
      const response = await fetch(
        "/api/LocationAutocomplete/" +
          encodeURIComponent(JSON.stringify(request)),
        { signal: abortSignal }
      );
      const data = await response.json();
      if (response.status !== 200) {
        throw new Error("Bad Response");
      }
      if (!validate("LocationAutocompleteResponse", data)) {
        throw new Error("validation failed");
      }
      return data;
    }
  : async function(
      request: LocationAutocompleteRequest,
      abortSignal?: AbortSignal
    ): Promise<LocationAutocompleteResponse> {
      const module = await import("./service/locationAutocomplete");
      const response = await module.default(request);
      if (response === null) {
        throw new Error("Bad Response");
      }
      if (!validate("LocationAutocompleteResponse", response)) {
        throw new Error("validation failed");
      }
      return response;
    };
export const apiSchoolSearch = process.browser
  ? async function(
      request: SchoolSearchRequest,
      abortSignal?: AbortSignal
    ): Promise<SchoolSearchResponse> {
      const response = await fetch(
        "/api/SchoolSearch/" + encodeURIComponent(JSON.stringify(request)),
        { signal: abortSignal }
      );
      const data = await response.json();
      if (response.status !== 200) {
        throw new Error("Bad Response");
      }
      if (!validate("SchoolSearchResponse", data)) {
        throw new Error("validation failed");
      }
      return data;
    }
  : async function(
      request: SchoolSearchRequest,
      abortSignal?: AbortSignal
    ): Promise<SchoolSearchResponse> {
      const module = await import("./service/schoolSearch");
      const response = await module.default(request);
      if (response === null) {
        throw new Error("Bad Response");
      }
      if (!validate("SchoolSearchResponse", response)) {
        throw new Error("validation failed");
      }
      return response;
    };
export const apiPersonSearch = process.browser
  ? async function(
      request: PersonSearchRequest,
      abortSignal?: AbortSignal
    ): Promise<PersonSearchResponse> {
      const response = await fetch(
        "/api/PersonSearch/" + encodeURIComponent(JSON.stringify(request)),
        { signal: abortSignal }
      );
      const data = await response.json();
      if (response.status !== 200) {
        throw new Error("Bad Response");
      }
      if (!validate("PersonSearchResponse", data)) {
        throw new Error("validation failed");
      }
      return data;
    }
  : async function(
      request: PersonSearchRequest,
      abortSignal?: AbortSignal
    ): Promise<PersonSearchResponse> {
      const module = await import("./service/personSearch");
      const response = await module.default(request);
      if (response === null) {
        throw new Error("Bad Response");
      }
      if (!validate("PersonSearchResponse", response)) {
        throw new Error("validation failed");
      }
      return response;
    };
export const apiPersonPage = process.browser
  ? async function(
      request: PersonPageRequest,
      abortSignal?: AbortSignal
    ): Promise<PersonPageResponse> {
      const response = await fetch(
        "/api/PersonPage/" + encodeURIComponent(JSON.stringify(request)),
        { signal: abortSignal }
      );
      const data = await response.json();
      if (response.status !== 200) {
        throw new Error("Bad Response");
      }
      if (!validate("PersonPageResponse", data)) {
        throw new Error("validation failed");
      }
      return data;
    }
  : async function(
      request: PersonPageRequest,
      abortSignal?: AbortSignal
    ): Promise<PersonPageResponse> {
      const module = await import("./service/personPage");
      const response = await module.default(request);
      if (response === null) {
        throw new Error("Bad Response");
      }
      if (!validate("PersonPageResponse", response)) {
        throw new Error("validation failed");
      }
      return response;
    };
export const apiSchoolPage = process.browser
  ? async function(
      request: SchoolPageRequest,
      abortSignal?: AbortSignal
    ): Promise<SchoolPageResponse> {
      const response = await fetch(
        "/api/SchoolPage/" + encodeURIComponent(JSON.stringify(request)),
        { signal: abortSignal }
      );
      const data = await response.json();
      if (response.status !== 200) {
        throw new Error("Bad Response");
      }
      if (!validate("SchoolPageResponse", data)) {
        throw new Error("validation failed");
      }
      return data;
    }
  : async function(
      request: SchoolPageRequest,
      abortSignal?: AbortSignal
    ): Promise<SchoolPageResponse> {
      const module = await import("./service/schoolPage");
      const response = await module.default(request);
      if (response === null) {
        throw new Error("Bad Response");
      }
      if (!validate("SchoolPageResponse", response)) {
        throw new Error("validation failed");
      }
      return response;
    };
export const apiSchoolSubjectPage = process.browser
  ? async function(
      request: SchoolSubjectPageRequest,
      abortSignal?: AbortSignal
    ): Promise<SchoolSubjectPageResponse> {
      const response = await fetch(
        "/api/SchoolSubjectPage/" + encodeURIComponent(JSON.stringify(request)),
        { signal: abortSignal }
      );
      const data = await response.json();
      if (response.status !== 200) {
        throw new Error("Bad Response");
      }
      if (!validate("SchoolSubjectPageResponse", data)) {
        throw new Error("validation failed");
      }
      return data;
    }
  : async function(
      request: SchoolSubjectPageRequest,
      abortSignal?: AbortSignal
    ): Promise<SchoolSubjectPageResponse> {
      const module = await import("./service/schoolSubjectPage");
      const response = await module.default(request);
      if (response === null) {
        throw new Error("Bad Response");
      }
      if (!validate("SchoolSubjectPageResponse", response)) {
        throw new Error("validation failed");
      }
      return response;
    };
export const apiDiscipline = process.browser
  ? async function(
      request: DisciplineRequest,
      abortSignal?: AbortSignal
    ): Promise<DisciplineResponse> {
      const response = await fetch(
        "/api/Discipline/" + encodeURIComponent(JSON.stringify(request)),
        { signal: abortSignal }
      );
      const data = await response.json();
      if (response.status !== 200) {
        throw new Error("Bad Response");
      }
      if (!validate("DisciplineResponse", data)) {
        throw new Error("validation failed");
      }
      return data;
    }
  : async function(
      request: DisciplineRequest,
      abortSignal?: AbortSignal
    ): Promise<DisciplineResponse> {
      const module = await import("./service/discipline");
      const response = await module.default(request);
      if (response === null) {
        throw new Error("Bad Response");
      }
      if (!validate("DisciplineResponse", response)) {
        throw new Error("validation failed");
      }
      return response;
    };
export const apiPage = process.browser
  ? async function(
      request: PageRequest,
      abortSignal?: AbortSignal
    ): Promise<PageResponse> {
      const response = await fetch(
        "/api/Page/" + encodeURIComponent(JSON.stringify(request)),
        { signal: abortSignal }
      );
      const data = await response.json();
      if (response.status !== 200) {
        throw new Error("Bad Response");
      }
      if (!validate("PageResponse", data)) {
        throw new Error("validation failed");
      }
      return data;
    }
  : async function(
      request: PageRequest,
      abortSignal?: AbortSignal
    ): Promise<PageResponse> {
      const module = await import("./service/page");
      const response = await module.default(request);
      if (response === null) {
        throw new Error("Bad Response");
      }
      if (!validate("PageResponse", response)) {
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
        short_description: { type: "string" }
      },
      required: ["name", "short_description", "slug"],
      additionalProperties: false
    },
    EntityPartialData: {
      type: "object",
      properties: {
        slug: { type: "string" },
        name: { type: "string" },
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
      required: ["name", "overall", "short_description", "slug"],
      additionalProperties: false
    },
    EntityFullData: {
      type: "object",
      properties: {
        slug: { type: "string" },
        name: { type: "string" },
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
        description: { type: "array", items: { $ref: "#/definitions/Html" } },
        wikipedia_description: { type: "boolean" },
        meta_description: { type: "string" }
      },
      required: [
        "description",
        "meta_description",
        "name",
        "overall",
        "short_description",
        "slug",
        "wikipedia_description"
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
    PersonPartialData: {
      type: "object",
      properties: {
        slug: { type: "string" },
        name: { type: "string" },
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
        birth_year: { type: ["number", "null"] },
        death_year: { type: ["number", "null"] },
        image_url: { type: ["string", "null"] },
        image_source_url: { type: ["string", "null"] }
      },
      required: [
        "birth_year",
        "death_year",
        "image_source_url",
        "image_url",
        "name",
        "overall",
        "short_description",
        "slug"
      ],
      additionalProperties: false
    },
    SchoolPartialData: {
      type: "object",
      properties: {
        slug: { type: "string" },
        name: { type: "string" },
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
        logo_url: { type: ["string", "null"] }
      },
      required: [
        "acceptance_rate",
        "average_earnings",
        "city",
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
        description: { type: "array", items: { $ref: "#/definitions/Html" } },
        wikipedia_description: { type: "boolean" },
        meta_description: { type: "string" },
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
        },
        disciplines_text: {
          type: "array",
          items: { $ref: "#/definitions/Html" }
        },
        influential_alumni_text: {
          type: "array",
          items: { $ref: "#/definitions/Html" }
        },
        address: { type: ["string", "null"] },
        zip: { type: ["string", "null"] },
        website: { type: ["string", "null"] },
        admissions_website: { type: ["string", "null"] },
        facebook_id: { type: ["string", "null"] },
        twitter_username: { type: ["string", "null"] },
        instagram_username: { type: ["string", "null"] },
        youtube_channel: { type: ["string", "null"] },
        location: {
          anyOf: [{ $ref: "#/definitions/LatLng" }, { type: "null" }]
        }
      },
      required: [
        "acceptance_rate",
        "address",
        "admissions_website",
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
        "disciplines_text",
        "employed_10_years",
        "facebook_id",
        "grad_fees_in_state",
        "grad_fees_out_of_state",
        "grad_tuition_in_state",
        "grad_tuition_out_of_state",
        "graduation_rate",
        "influence_over_time",
        "influential_alumni_text",
        "instagram_username",
        "location",
        "logo_url",
        "median_act",
        "median_sat",
        "meta_description",
        "name",
        "overall",
        "short_description",
        "slug",
        "state",
        "test_competitiveness",
        "total_students",
        "twitter_username",
        "undergrad_fees_in_state",
        "undergrad_fees_out_of_state",
        "undergrad_tuition_in_state",
        "undergrad_tuition_out_of_state",
        "weather",
        "website",
        "wikipedia_description",
        "youtube_channel",
        "zip"
      ],
      additionalProperties: false
    },
    LatLng: {
      type: "object",
      properties: { lat: { type: "number" }, lng: { type: "number" } },
      required: ["lat", "lng"],
      additionalProperties: false
    },
    PersonData: {
      type: "object",
      properties: {
        slug: { type: "string" },
        name: { type: "string" },
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
        description: { type: "array", items: { $ref: "#/definitions/Html" } },
        wikipedia_description: { type: "boolean" },
        meta_description: { type: "string" },
        birth_year: { type: ["number", "null"] },
        death_year: { type: ["number", "null"] },
        image_url: { type: ["string", "null"] },
        image_source_url: { type: ["string", "null"] },
        links: { type: "array", items: { type: "string" } },
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
        "wikipedia_description",
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
    DisciplineDetail: {
      type: "object",
      properties: {
        level: { type: "number" },
        parent: { type: "string" },
        slug: { type: "string" },
        name: { type: "string" }
      },
      required: ["level", "parent", "slug", "name"],
      additionalProperties: false
    },
    Country: {
      type: "object",
      properties: { name: { type: "string" } },
      required: ["name"],
      additionalProperties: false
    },
    BasicContextRequest: { type: "object", additionalProperties: false },
    BasicContextResponse: {
      type: "object",
      properties: {
        disciplines: {
          type: "array",
          items: { $ref: "#/definitions/DisciplineDetail" }
        },
        countries: { type: "array", items: { $ref: "#/definitions/Country" } }
      },
      required: ["disciplines", "countries"],
      additionalProperties: false
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
    },
    DisciplineRequest: { type: "string" },
    DisciplineResponse: {
      type: "object",
      properties: {
        name: { type: "string" },
        description: { type: "array", items: { $ref: "#/definitions/Html" } }
      },
      required: ["name", "description"],
      additionalProperties: false
    },
    PageRequest: { type: "string" },
    PageResponse: {
      type: "object",
      properties: {
        title: { type: "string" },
        content: { type: "array", items: { $ref: "#/definitions/Html" } }
      },
      required: ["title", "content"],
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
