import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { apiCountries, apiDisciplines, apiInfluentialSchoolsPage } from "../../api";
import DISPLAY_MODES from "../../components/schools/constants";
import ListTopMenu from "../../components/schools/ListTopMenu";
import SchoolList from "../../components/schools/SchoolList";
import { FilterProps } from "../../components/schools/types";
import { CountriesResponse, DisciplinesResponse, InfluentialSchoolsPageRequest, InfluentialSchoolsPageResponse } from "../../schema";
import { PageDescription, PageTitle } from "../../styles";
import StandardPage from "../../templates/StandardPage";
import { LoremIpsumText } from "../../utils/const";

const asHref = (request: InfluentialSchoolsPageRequest) => {
  return {
    pathname: "/schools",
    query: {
      discipline: request.discipline,
      minYear: request.years.min,
      maxYear: request.years.max,
      country: request.country
    }
  };
};

type InfluentialSchoolsProps = InfluentialSchoolsPageResponse & {
  countries: CountriesResponse;
  disciplines: DisciplinesResponse;
  request: InfluentialSchoolsPageRequest;
};

const InfluentialSchools: NextPage<InfluentialSchoolsProps> = props => {
  const router = useRouter();
  const [request, setRequest] = useState(props.request);
  const [displayMode, setDisplayMode] = useState(DISPLAY_MODES.grid);

  const updateRequest = useCallback(
    request => {
      setRequest(request);
      router.replace(asHref(request));
    },
    [setRequest, router]
  );

  const filterProps: FilterProps = {
    ...props,
    request,
    updateRequest
  };

  const { schools, disciplines, countries } = props;
  const lockerItems: any[] = [
    {
      name: "My Schools",
      items: schools
    },
    {
      name: "My Discilines",
      items: disciplines
    },
    {
      name: "My Countries",
      items: countries
    }
  ];

  const onDisplayModeSelectHandler = (mode: string) => {
    setDisplayMode(mode);
  };

  return (
    <StandardPage title="Influential Schools">
      <PageTitle>Influential Schools</PageTitle>
      <PageDescription>{LoremIpsumText}</PageDescription>
      <ListTopMenu
        {...filterProps}
        mode={displayMode}
        onDisplayModeSelect={onDisplayModeSelectHandler}
      />
      <SchoolList mode={displayMode} schools={schools} />
    </StandardPage>
  );
};

InfluentialSchools.getInitialProps = async function(context: NextPageContext) {
  const request = {
    country: (context.query.country as string) || null,
    years: {
      min: parseInt((context.query.minYear as string) || "1900"),
      max: parseInt((context.query.maxYear as string) || "2020")
    },
    discipline: (context.query.discipline as string) || null
  };

  const schools = apiInfluentialSchoolsPage(request);
  const disciplines = apiDisciplines({});
  const countries = apiCountries({});
  return {
    ...(await schools),
    disciplines: await disciplines,
    countries: await countries,
    request
  };
};

export default InfluentialSchools;
