import { createContext, useContext } from "react";
import { createSelector } from "reselect";
import { BasicContextResponse, Country, DisciplineDetail } from "../schema";
import { formatYears } from "../utils/years";

export const BasicContextReactContext = createContext(
  {} as BasicContextResponse
);

export default class BasicContext {
  _disciplines_by_name: { [k: string]: DisciplineDetail };
  disciplines: DisciplineDetail[];
  countries: Country[];
  constructor(response: BasicContextResponse) {
    const result: { [k: string]: DisciplineDetail } = {};
    for (const discipline of response.disciplines) {
      result[discipline.slug] = discipline;
    }
    this._disciplines_by_name = result;
    this.disciplines = response.disciplines;
    this.countries = response.countries;
  }

  discipline(slug: string) {
    return this._disciplines_by_name[slug];
  }

  disciplineName(slug: string) {
    return this.discipline(slug).name;
  }

  describeRequest(request: {
    years: { min: number; max: number };
    discipline: string | null;
  }) {
    return `${
      request.discipline === null
        ? ""
        : `in ${this.disciplineName(request.discipline)} `
    } ${formatYears(request.years)}`;
  }
}

const prepareContext = createSelector(
  (response: BasicContextResponse) => response,
  (response: BasicContextResponse) => new BasicContext(response)
);

export function useBasicContext() {
  return prepareContext(useContext(BasicContextReactContext));
}
