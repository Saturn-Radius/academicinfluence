import { useState } from "react";
import { apiInfluentialSchoolsPage } from "../../api";
import DISPLAY_MODES from "../../components/schools/constants";
import ListTopMenu from "../../components/schools/ListTopMenu";
import SchoolList from "../../components/schools/SchoolList";
import QuerySchema, { RangeParameter } from "../../QuerySchema";
import {
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
    return {
      ...(await schools)
    };
  },
  props => props.schools.length == 0
);
