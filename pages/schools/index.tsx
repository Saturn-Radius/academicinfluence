import { useState } from "react";
import {
  apiCountries,
  apiDisciplines,
  apiInfluentialSchoolsPage
} from "../../api";
import DISPLAY_MODES from "../../components/schools/constants";
import ListTopMenu from "../../components/schools/ListTopMenu";
import SchoolList from "../../components/schools/SchoolList";
import QuerySchema, { RangeParameter } from "../../QuerySchema";
import {
  CountriesResponse,
  DisciplinesResponse,
  InfluentialSchoolsPageRequest,
  InfluentialSchoolsPageResponse
} from "../../schema";
import { PageDescription, PageTitle } from "../../styles";
import StandardPage from "../../templates/StandardPage";
import { LoremIpsumText } from "../../utils/const";
import QueryPage from "../../utils/QueryPage";

const QUERY_SCHEMA = QuerySchema("/schools", {
  discipline: {
    toQuery: value => value,
    fromQuery: value => value,
    default: null as null | string,
    canonical: true
  },
  years: RangeParameter(-4000, 2020),
  country: {
    toQuery: value => value,
    fromQuery: value => value,
    default: null as null | string,
    canonical: true
  }
});

type InfluentialSchoolsProps = InfluentialSchoolsPageResponse & {
  countries: CountriesResponse;
  disciplines: DisciplinesResponse;
  request: InfluentialSchoolsPageRequest;
  updateRequest: (request: InfluentialSchoolsPageRequest) => void;
};

const InfluentialSchools: React.SFC<InfluentialSchoolsProps> = props => {
  const [displayMode, setDisplayMode] = useState(DISPLAY_MODES.grid);

  return (
    <StandardPage title="Influential Schools">
      <PageTitle>Influential Schools</PageTitle>
      <PageDescription>{LoremIpsumText}</PageDescription>
      <ListTopMenu
        {...props}
        mode={displayMode}
        onDisplayModeSelect={setDisplayMode}
      />
      <SchoolList mode={displayMode} schools={props.schools} />
    </StandardPage>
  );
};

export default QueryPage(
  InfluentialSchools,
  QUERY_SCHEMA,
  {
    title: "Influential Schools"
  },
  async (request, signal) => {
    const schools = apiInfluentialSchoolsPage(request, signal);
    const disciplines = apiDisciplines({}, signal);
    const countries = apiCountries({}, signal);
    return {
      ...(await schools),
      disciplines: await disciplines,
      countries: await countries,
      request
    };
  },
  props => props.schools.length == 0
);
