import React from "react";
import { useRouter } from "next/router";
import { NextPage, NextPageContext } from "next";
import {
  apiCountries,
  apiDisciplines,
  apiInfluentialSchoolsPage
} from "../../api";
import {
  CountriesResponse,
  DisciplinesResponse,
  InfluentialSchoolsPageRequest,
  InfluentialSchoolsPageResponse
} from "../../schema";
import PageLayout from "../../templates/PageLayout";
import { Row } from "../../components/grid";
import { LeftCol, RightCol } from "../../components/schools/styles";
import { LoremIpsumText } from "../../utils/const";
import MyLockerButton from "../../components/schools/MyLockerButton";
import { FilterProps } from "../../components/schools/types";
import ListTopMenu from "../../components/schools/ListTopMenu";
import { PageDescription, PageTitle } from "../../styles";

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
  const [request, setRequest] = React.useState(props.request);

  const updateRequest = React.useCallback(
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

  return (
    <PageLayout>
      <PageTitle>Influential Schools</PageTitle>
      <Row>
        <LeftCol>
          <PageDescription>{LoremIpsumText}</PageDescription>
        </LeftCol>
        <RightCol>
          <MyLockerButton
            items={lockerItems}
            title="My Locker"
            image_url="/images/my-locker.png"
          />
        </RightCol>
      </Row>
      <Row>
        <LeftCol>
          <ListTopMenu {...filterProps} />
          <pre>{JSON.stringify(props.schools, null, 4)}</pre>
        </LeftCol>
        <RightCol></RightCol>
      </Row>
    </PageLayout>
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
