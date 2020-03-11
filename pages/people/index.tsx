import { find } from "lodash";
import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import { Handle, Range } from "rc-slider";
import "rc-slider/assets/index.css";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";
import React from "react";
import Autocomplete from "react-autocomplete";
import "react-circular-progressbar/dist/styles.css";
import Select from "react-select";
import {
  apiCountries,
  apiDisciplines,
  apiInfluentialPeoplePage,
  apiPersonSearch
} from "../../api";
import { lookupDiscipline } from "../../disciplines";
import {
  CountriesResponse,
  DisciplinesResponse,
  Identifiable,
  InfluentialPeoplePageRequest,
  InfluentialPeoplePageResponse
} from "../../schema";
import { GRAY } from "../../styles";

// I have sloppily copy-pasted bits from college-ranking.tsx
// refactoring is encouraged

function FilterSep() {
  return (
    <div
      css={{
        width: "25px"
      }}
    />
  );
}

type FilterLabelProps = {
  label: string;
  children: React.ReactNode;
};
function FilterLabel(props: FilterLabelProps) {
  return (
    <label
      css={{
        display: "block",
        flexGrow: 1,
        marginTop: "10px"
      }}
    >
      <div
        css={{
          fontSize: "20px",
          lineHeight: "28px",
          color: GRAY
        }}
      >
        {props.label}
      </div>
      {props.children}
    </label>
  );
}

type FilterProps = {
  request: InfluentialPeoplePageRequest;
  disciplines: DisciplinesResponse;
  countries: CountriesResponse;
  updateRequest: (request: InfluentialPeoplePageRequest) => void;
};

function Discipline(props: FilterProps) {
  const onChange = React.useCallback(
    event => {
      props.updateRequest({
        ...props.request,
        discipline: event.value
      });
    },
    [props.updateRequest, props.request]
  );

  let discipline = props.request.discipline;
  let supertopic: string | null;
  let subtopic: string | null;

  if (
    discipline === null ||
    lookupDiscipline(props.disciplines, discipline).level === 1
  ) {
    supertopic = discipline;
    subtopic = null;
  } else {
    supertopic = lookupDiscipline(props.disciplines, discipline).parent;
    subtopic = discipline;
  }

  const options = [
    {
      value: null,
      label: "Overall"
    },
    ...props.disciplines
      .filter(item => item.level === 1)
      .map(item => ({
        value: item.slug,
        label: item.name
      }))
  ];

  const selected =
    find(options, option => option.value === supertopic) || options[0];

  const suboptions = [
    {
      value: null,
      label: "Overall"
    },
    ...props.disciplines
      .filter(item => item.parent === supertopic)
      .map(item => ({
        value: item.slug,
        label: item.name
      }))
  ];

  const sub_selected =
    find(suboptions, option => option.value === subtopic) || suboptions[0];

  return (
    <>
      <FilterLabel label="Discipline">
        <Select
          instanceId="discipline-filter"
          value={selected}
          options={options}
          onChange={onChange}
        />
      </FilterLabel>
      <FilterSep />
      <FilterLabel label="Subdiscipline">
        <Select
          instanceId="subdiscipline-filter"
          value={sub_selected}
          options={suboptions}
          onChange={onChange}
          isDisabled={supertopic === null}
        />
      </FilterLabel>
    </>
  );
}

function Gender(props: FilterProps) {
  const onChange = React.useCallback(
    event => {
      props.updateRequest({
        ...props.request,
        gender: event.value
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
    {
      value: true,
      label: "Male"
    },
    {
      value: false,
      label: "Female"
    }
  ];

  const selected =
    find(options, option => option.value === country) || options[0];

  return (
    <>
      <FilterLabel label="Gender">
        <Select
          instanceId="gender-filter"
          value={selected}
          options={options}
          onChange={onChange}
        />
      </FilterLabel>
    </>
  );
}

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

type InfluentialPeopleProps = InfluentialPeoplePageResponse & {
  countries: CountriesResponse;
  disciplines: DisciplinesResponse;
  request: InfluentialPeoplePageRequest;
};

function PersonSearchBox() {
  const [value, setValue] = React.useState("");
  const [items, setItems] = React.useState([] as Identifiable[]);

  const onChange = React.useCallback(
    async text => {
      setItems([]);
      setValue(text.target.value);
      const items = await apiPersonSearch(text.target.value);
      setItems(items.people);
    },
    [setValue, setItems]
  );

  const router = useRouter();

  const onSelect = React.useCallback(
    slug => {
      router.push("/people/" + slug);
    },
    [router]
  );

  return (
    <Autocomplete
      value={value}
      items={items}
      onChange={onChange}
      onSelect={onSelect}
      getItemValue={item => item.slug}
      renderItem={(item, isHighlighted) => (
        <div
          key={item.slug}
          style={{ background: isHighlighted ? "lightgray" : "white" }}
        >
          {item.name}
        </div>
      )}
    />
  );
}
function asHref(request: InfluentialPeoplePageRequest) {
  return {
    pathname: "/people",
    query: {
      discipline: request.discipline,
      minYear: request.years.min,
      maxYear: request.years.max,
      country: request.country,
      gender: request.gender === null ? undefined : request.gender ? "m" : "f"
    }
  };
}
const InfluentialPeople: NextPage<InfluentialPeopleProps> = props => {
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
  return (
    <div>
      <PersonSearchBox />
      <Discipline {...filterProps} />
      <YearsFilter {...filterProps} />
      <Country {...filterProps} />
      <Gender {...filterProps} />

      <pre>{JSON.stringify(props.people, null, 4)}</pre>
    </div>
  );
};

InfluentialPeople.getInitialProps = async function(context: NextPageContext) {
  const request = {
    country: (context.query.country as string) || null,
    years: {
      min: parseInt((context.query.minYear as string) || "1900"),
      max: parseInt((context.query.maxYear as string) || "2020")
    },
    gender:
      context.query.gender === "m"
        ? true
        : context.query.gender === "f"
        ? false
        : null,
    discipline: (context.query.discipline as string) || null
  };

  const schools = apiInfluentialPeoplePage(request);
  const disciplines = apiDisciplines({});
  const countries = apiCountries({});
  return {
    ...(await schools),
    disciplines: await disciplines,
    countries: await countries,
    request
  };
};

export default InfluentialPeople;
