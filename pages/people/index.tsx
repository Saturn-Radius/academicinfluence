import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import React, { useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import { apiInfluentialPeoplePage, apiPage } from "../../api";
import HtmlContent from "../../components/HtmlContent";
import ListTopMenu from "../../components/people/ListTopMenu";
import PeopleList from "../../components/people/PeopleList";
import { DISPLAY_MODES } from "../../components/schools";
import QuerySchema, { RangeParameter } from "../../QuerySchema";
import {
  InfluentialPeoplePageRequest,
  InfluentialPeoplePageResponse,
  PageData
} from "../../schema";
import { PageDescription, PageTitle } from "../../styles";
import StandardPage from "../../templates/StandardPage";
import QueryPage from "../../utils/QueryPage";

type InfluentialPeopleProps = InfluentialPeoplePageResponse & {
  request: InfluentialPeoplePageRequest;
  updateRequest: (request: InfluentialPeoplePageRequest) => void;
  page: PageData;
};

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
  },
  gender: {
    toQuery: value => (value ? "m" : "f"),
    fromQuery: value => value === "m",
    default: null as null | boolean
  }
});

const InfluentialPeople: React.SFC<InfluentialPeopleProps> = props => {
  const [displayMode, setDisplayMode] = useState(DISPLAY_MODES.grid);

  return (
    <StandardPage title="Influential People">
      <PageTitle>Influential People</PageTitle>
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
      page: (await page) as PageData
    };
  },
  props => props.people.length == 0
);
