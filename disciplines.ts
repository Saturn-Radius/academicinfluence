import { createSelector } from "reselect";
import { DisciplineDetail } from "./schema";

const disciplineLookup = createSelector(
  (disciplines: DisciplineDetail[]) => disciplines,
  (disciplines: DisciplineDetail[]) => {
    const result: { [k: string]: DisciplineDetail } = {};
    for (const discipline of disciplines) {
      result[discipline.slug] = discipline;
    }
    return result;
  }
);

export function lookupDiscipline(
  disciplines: DisciplineDetail[],
  slug: string
): DisciplineDetail {
  return disciplineLookup(disciplines)[slug];
}

export function disciplineName(disciplines: DisciplineDetail[], slug: string) {
  return lookupDiscipline(disciplines, slug).name;
}

export function disciplineNameToSlug(name: string) {
  return name.replace(/ /g, "-").toLowerCase();
}
