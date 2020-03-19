import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import React from "react";
import "react-circular-progressbar/dist/styles.css";
import { apiInfluentialPeoplePage, apiPage } from "../../api";
import { useBasicContext } from "../../components/BasicContext";
import ListTopMenu from "../../components/people/ListTopMenu";
import PeopleList from "../../components/people/PeopleList";
import QuerySchema, { RangeParameter } from "../../QuerySchema";
import {
  InfluentialPeoplePageRequest,
  InfluentialPeoplePageResponse,
  PageResponse
} from "../../schema";
import StandardPage from "../../templates/StandardPage";
import QueryPage from "../../utils/QueryPage";

type InfluentialPeopleProps = InfluentialPeoplePageResponse & {
  request: InfluentialPeoplePageRequest;
  updateRequest: (request: InfluentialPeoplePageRequest) => void;
  page: PageResponse;
};

const QUERY_SCHEMA = QuerySchema("/people", {
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
  },
  gender: {
    toQuery: value => (value ? "m" : "f"),
    fromQuery: value => value === "m",
    default: null as null | boolean
  }
});

function peopleName(gender: boolean | null) {
  switch (gender) {
    case true:
      return "Men";
    case false:
      return "Women";
    case null:
      return "People";
  }
}

const InfluentialPeople: React.SFC<InfluentialPeopleProps> = props => {
  const basicContext = useBasicContext();

  return (
    <StandardPage
      title={`Most Influential ${peopleName(
        props.request.gender
      )} ${basicContext.describeRequest(props.request)}`}
      section="influential-people"
      blurb={props.page.content}
    >
      <ListTopMenu {...props} />
      <PeopleList people={props.people} />
    </StandardPage>
  );
};

export default QueryPage(
  InfluentialPeople,
  QUERY_SCHEMA,
  {
    title: "Influential People"
  },
  async (request: InfluentialPeoplePageRequest, signal?: AbortSignal) => {
    const schools = apiInfluentialPeoplePage(request);
    const page = apiPage("people");
    return {
      ...(await schools),
      page: (await page) as PageResponse
    };
  },
  props => props.people.length == 0
);
