export interface DisciplineInfluenceData {
  influence: number;
  world_rank: number;
  usa_rank: number | null;
}

export interface Identifiable {
  slug: string;
  name: string;
}

export interface Describable extends Identifiable {
  description: string;
  short_description: string;
}

export interface EntityPartialData extends Describable {
  overall: {
    influence: number;
    world_rank: number;
    usa_rank: number | null;
  };
}

export interface PersonPartialData extends EntityPartialData {}

export interface SchoolPartialData extends EntityPartialData {
  city: string | null;
  state: string | null;
  median_act: number | null;
  median_sat: number | null;
  undergrad_tuition_in_state: number | null;
  average_earnings: number | null;
  graduation_rate: number | null;
  total_students: number | null;
  acceptance_rate: number | null;
  desirability: number | null;
  logo_url: string | null;
  top_discipline: string | null;
}

export interface WeatherData {
  high: number;
  low: number;
}

export interface SchoolData extends SchoolPartialData {
  meta_description: string;
  employed_10_years: number | null;
  desirability_rank: number | null;
  undergrad_tuition_out_of_state: number | null;
  grad_tuition_out_of_state: number | null;
  grad_tuition_in_state: number | null;

  undergrad_fees_in_state: number | null;
  undergrad_fees_out_of_state: number | null;
  grad_fees_in_state: number | null;
  grad_fees_out_of_state: number | null;

  average_net_price: number | null;
  test_competitiveness: number | null;
  campus_property_crime_rate: number | null;
  campus_violent_crime_rate: number | null;
  city_property_crime_rate: number | null;
  city_violent_crime_rate: number | null;

  influence_over_time: {
    year: number;
    value: number;
  }[];

  disciplines: {
    [k: string]: DisciplineInfluenceData;
  };

  alumni: PersonPartialData[];
  people: PersonPartialData[];
  weather: {
    winter: WeatherData;
    spring: WeatherData;
    summer: WeatherData;
    fall: WeatherData;
  } | null;
}

export interface PersonData extends PersonPartialData {
  meta_description: string;
  links: string[];
  birth_year: number | null;
  death_year: number | null;
  image_url: string | null;
  image_source_url: string | null;
  disciplines: {
    [k: string]: DisciplineInfluenceData;
  };
  works: {
    label: string;
  }[];
  schools: Identifiable[];
}

export type CollegeRankingSort =
  | "undergrad_tuition_in_state"
  | "name"
  | "median_sat"
  | "average_earnings"
  | "acceptance_rate"
  | "total_students"
  | "influence"
  | "desirability"
  | "graduation_rate";

export interface CollegeRankingsRequest {
  sort: CollegeRankingSort;
  reversed: boolean;
  states: string[] | null;
  location: {
    name: string;
    lat: string;
    long: string;
    distance: {
      min: number;
      max: number;
    };
  } | null;
  discipline: string | null;
  tuition: {
    min: number;
    max: number;
  };
  median_sat: {
    min: number;
    max: number;
  };
  acceptance_rate: {
    min: number;
    max: number;
  };
  total_students: {
    min: number;
    max: number;
  };
  years: {
    min: number;
    max: number;
  };
}

export interface CollegeRankingsResponse {
  schools: SchoolPartialData[];
  limits: {
    tuition: {
      min: number;
      max: number;
    };
    median_sat: {
      min: number;
      max: number;
    };
    acceptance_rate: {
      min: number;
      max: number;
    };
    total_students: {
      min: number;
      max: number;
    };
    years: {
      min: number;
      max: number;
    };
  };
}

export type DisciplineDetail = {
  level: number;
  parent: string;
  slug: string;
  name: string;
};

export interface DisciplinesRequest {}

export type DisciplinesResponse = DisciplineDetail[];

export interface CountriesRequest {}
export type Country = {
  name: string;
};

export type CountriesResponse = Country[];

export interface FeaturesPageRequest {
  category: string | null;
  article: string | null;
}
export interface FeaturesPageResponse {
  categories: Category[];
  category: {
    name: string;
    slug: string;
    description: string;
  } | null;
  article: ArticleData | null;
  articles: ArticlePartialData[];
}
export interface Category extends Identifiable {}

export interface ArticlePartialData extends Identifiable {
  excerpt: string;
  author: string;
  date: string;
  bannerUrl: string;
  thumbnailUrl: string;
  category: Category;
}

export type HtmlNode = {
  component: string;
  props: { [k: string]: any };
  children: Html[];
};
export type Html = HtmlNode | string | number;

export interface ArticleData extends ArticlePartialData {
  content: Html[];
}

export interface HomePageRequest {}
export interface HomePageResponse {
  currentFeature: ArticlePartialData;
}

export interface InfluentialSchoolsPageRequest {
  country: string | null;
  discipline: string | null;
  years: {
    min: number;
    max: number;
  };
}
export interface InfluentialSchoolsPageResponse {
  schools: SchoolPartialData[];
}

export interface InfluentialPeoplePageRequest {
  country: string | null;
  discipline: string | null;
  gender: boolean | null;
  years: {
    min: number;
    max: number;
  };
}
export interface InfluentialPeoplePageResponse {
  people: PersonPartialData[];
}

export type LocationAutocompleteRequest = string;
export interface LocationAutocompleteResponse {
  cities: {
    name: string;
    long: number;
    lat: number;
  }[];
}

export type SchoolSearchRequest = string;
export interface SchoolSearchResponse {
  schools: Identifiable[];
}

export type PersonSearchRequest = string;
export interface PersonSearchResponse {
  people: Identifiable[];
}

export interface PersonPageRequest {
  slug: string;
}
export interface PersonPageResponse {
  person: PersonData;
}

export interface SchoolPageRequest {
  slug: string;
}
export interface SchoolPageResponse {
  school: SchoolData;
}

export interface SchoolSubjectPageRequest {
  slug: string;
  discipline: string;
}

export interface SchoolSubjectPageResponse {
  staff: PersonPartialData[];
  alumni: PersonPartialData[];
}
