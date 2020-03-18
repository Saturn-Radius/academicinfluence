import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import React, { useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import { apiInfluentialPeoplePage, apiPage } from "../../api";
import { useBasicContext } from "../../components/BasicContext";
import HtmlContent from "../../components/HtmlContent";
import ListTopMenu from "../../components/people/ListTopMenu";
import PeopleList from "../../components/people/PeopleList";
import { DISPLAY_MODES } from "../../components/schools";
import QuerySchema, { RangeParameter } from "../../QuerySchema";
import {
  InfluentialPeoplePageRequest,
  InfluentialPeoplePageResponse,
  PageResponse
} from "../../schema";
import { PageDescription, PageTitle } from "../../styles";
import StandardPage from "../../templates/StandardPage";
import QueryPage from "../../utils/QueryPage";
import { Years } from "../../utils/years";

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

const InfluentialPeople: React.SFC<InfluentialPeopleProps> = props => {
  const [displayMode, setDisplayMode] = useState(DISPLAY_MODES.grid);
  const basicContext = useBasicContext();

  return (
    <StandardPage title="Influential People" section="influential-people">
      <PageTitle>
        Most Influential People{" "}
        {props.request.discipline === null
          ? ""
          : `in ${basicContext.disciplineName(props.request.discipline)} `}
        <Years years={props.request.years} />
      </PageTitle>
      <PageDescription>
        <HtmlContent html={props.page.content} />
      </PageDescription>
      <ListTopMenu
        {...props}
        mode={displayMode}
        onDisplayModeSelect={setDisplayMode}
      />
      <PeopleList mode={displayMode} people={props.people} />
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
