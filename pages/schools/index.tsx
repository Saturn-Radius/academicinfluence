import React from "react";
import { useRouter } from "next/router";
import { NextPage, NextPageContext } from "next";
import { find } from "lodash";
import { Handle, Range } from "rc-slider";
import "rc-slider/assets/index.css";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";
import "react-circular-progressbar/dist/styles.css";
import Select from "react-select";
import {
  apiCountries,
  apiDisciplines,
  apiInfluentialSchoolsPage
} from "../../api";
import { Row } from "../../components/grid";
import MyLockerButton from "../../components/schools/MyLockerButton";
import { LeftCol, RightCol } from "../../components/schools/styles";
import {
  CountriesResponse,
  DisciplinesResponse,
  InfluentialSchoolsPageRequest,
  InfluentialSchoolsPageResponse
} from "../../schema";
import { LoremIpsumText } from "../../utils/const";
import PageLayout from "../../templates/PageLayout";
import ListTopMenu from "../../components/schools/ListTopMenu";
import FilterLabel from "../../components/schools/FilterLabel";
import Discipline from "../../components/schools/Discipline";
import { PageDescription, PageTitle } from "../../styles";

// I have sloppily copy-pasted bits from college-ranking.tsx
// refactoring is encouraged

type FilterProps = {
  request: InfluentialSchoolsPageRequest;
  disciplines: DisciplinesResponse;
  countries: CountriesResponse;
  updateRequest: (request: InfluentialSchoolsPageRequest) => void;
};

function Country(props: FilterProps) {
  const onChange = React.useCallback(
    event => {
      props.updateRequest({
        ...props.request,
        country: event.value
      });
    },
    [props.updateRequest, props.request]
  );

  let country = props.request.country;

  const options = [
    {
      value: null,
      label: "All"
    },
    ...props.countries.map(item => ({
      value: item.name,
      label: item.name
    }))
  ];

  const selected =
    find(options, option => option.value === country) || options[0];

  return (
    <>
      <FilterLabel label="Country">
        <Select
          instanceId="country-filter"
          value={selected}
          options={options}
          onChange={onChange}
        />
      </FilterLabel>
    </>
  );
}

type RangeHandleProps = {
  label: string;
  format: (value: number) => string;
};

function RangeHandle(sliderProps: RangeHandleProps, props: any) {
  const { value, dragging, index, ...restProps } = props;

  let formatted = sliderProps.format(value);
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={formatted}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle
        value={value}
        {...restProps}
        aria-label={
          index == 0
            ? "Minimum " + sliderProps.label
            : "Maximum " + sliderProps.label
        }
        aria-valuetext={formatted}
      />
    </Tooltip>
  );
}

function YearsFilter(props: FilterProps) {
  const onChange = React.useCallback(
    n =>
      props.updateRequest({
        ...props.request,
        years: {
          min: n[0],
          max: n[1]
        }
      }),
    [props.request, props.updateRequest]
  );

  return (
    <FilterLabel label="Years">
      <Range
        value={[props.request.years.min, props.request.years.max]}
        min={-2000}
        max={2020}
        handle={RangeHandle.bind(null, {
          label: "Years",
          format: year => (year < 0 ? year + " BC" : year + " AD")
        })}
        onChange={onChange}
      />
    </FilterLabel>
  );
}

type InfluentialSchoolsProps = InfluentialSchoolsPageResponse & {
  countries: CountriesResponse;
  disciplines: DisciplinesResponse;
  request: InfluentialSchoolsPageRequest;
};

function asHref(request: InfluentialSchoolsPageRequest) {
  return {
    pathname: "/schools",
    query: {
      discipline: request.discipline,
      minYear: request.years.min,
      maxYear: request.years.max,
      country: request.country
    }
  };
}

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
          <ListTopMenu />
          <Discipline {...filterProps} />
          <YearsFilter {...filterProps} />
          <Country {...filterProps} />
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
