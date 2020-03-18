import { PersonPartialData } from "../schema";

export const ERAS = [
  -4000,
  -3000,
  -2000,
  -1000,
  1,
  1000,
  1100,
  1200,
  1300,
  1400,
  1500,
  1600,
  1700,
  1800,
  1900,
  1910,
  1920,
  1930,
  1940,
  1950,
  1960,
  1970,
  1980,
  1990,
  2000,
  2010,
  2020
];

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
