import { PersonPartialData } from "../schema";

export const formatYear = (year: number | null): string => {
  if (year === null) {
    return "";
  } else if (year < 0) {
    return `${-year} BC`;
  } else {
    return `${year} AD`;
  }
};

export function YearRange(props: { person: PersonPartialData }) {
  return (
    <>
      ( {formatYear(props.person.birth_year)} –{" "}
      {formatYear(props.person.death_year)})
    </>
  );
}
