import { apiInfluentialSchoolsPage, apiPage } from "../../api";
import { useBasicContext } from "../../components/BasicContext";
import ListTopMenu from "../../components/schools/ListTopMenu";
import SchoolList from "../../components/schools/SchoolList";
import QuerySchema, { RangeParameter } from "../../QuerySchema";
import {
  InfluentialSchoolsPageRequest,
  InfluentialSchoolsPageResponse,
  PageResponse
} from "../../schema";
import StandardPage from "../../templates/StandardPage";
import QueryPage from "../../utils/QueryPage";

const QUERY_SCHEMA = QuerySchema("/schools", {
  discipline: {
    toQuery: value => value,
    fromQuery: value => value,
    default: null as null | string,
    canonical: true
  },
  years: RangeParameter(1970, 2020),
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
  page: PageResponse;
};

const InfluentialSchools: React.SFC<InfluentialSchoolsProps> = props => {
  const basicContext = useBasicContext();

  return (
    <StandardPage
      title={`Most Influential Schools ${basicContext.describeRequest(
        props.request
      )}`}
      section="influential-schools"
      blurb={props.page.content}
    >
      <ListTopMenu {...props} />
      <SchoolList schools={props.schools} />
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
    const page = apiPage("schools");
    return {
      ...(await schools),
      page: (await page) as PageResponse
    };
  },
  props => props.schools.length == 0
);
