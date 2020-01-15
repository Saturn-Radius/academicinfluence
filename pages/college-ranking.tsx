import { NextPage, NextPageContext } from "next";
import Router from "next/router";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import ToolPage from "../ToolPage";
import { ReactElementLike, resetWarningCache } from "prop-types";
import {
  GRAY_DARK,
  GRAY_MID,
  PRIMARY_DARK,
  GRAY_LIGHT,
  TERTIARY_DARK,
  SECONDARY_DARK,
  BACKGROUND_1
} from "../styles";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import React from "react";
import Slider, { Range, HandleProps, Handle } from "rc-slider";
import Tooltip from "rc-tooltip";
import {
  CollegeRankingsResponse,
  CollegeRankingsRequest,
  CollegeRankingSort,
  CollegeData,
  apiCollegeRankings,
  apiLocationAutocomplete,
  apiDisciplines,
  DisciplinesResponse
} from "../api";
import { InterpolationWithTheme, css } from "@emotion/core";
import Select from "react-select";
import USAStates from "usa-states";
import Autocomplete from "react-autocomplete";
import DropdownTreeSelect from "react-dropdown-tree-select";
import { find } from "lodash";
import { defaultProps } from "react-select/src/Select";

type CollegeRankingProps = {
  data: CollegeRankingsResponse;
  request: CollegeRankingsRequest;
  disciplines: DisciplinesResponse;
};

type COLUMN = {
  label: string;
  sort?: CollegeRankingSort;
  value: (school: CollegeData, index: number) => ReactElementLike;
  row?: number;
  column?: number;
};

type BasicCellProps = {
  children: React.ReactNode;
  color: string;
};
function BasicCell(props: BasicCellProps) {
  return (
    <div
      css={{
        fontSize: "20px",
        lineHeight: "24px",
        color: props.color,
        fontWeight: "bold",
        "@media(max-width: 1024px)": {
          fontSize: "16px",
          lineHeight: "17px"
        }
      }}
    >
      {props.children}
    </div>
  );
}

function asHref(request: CollegeRankingsRequest) {
  return {
    pathname: "/college-ranking",
    query: {
      sort: request.sort,
      reversed: request.reversed,
      minTuition: request.tuition.min,
      maxTuition: request.tuition.max,
      minSat: request.median_sat.min,
      maxSat: request.median_sat.max,
      minStudents: request.total_students.min,
      maxStudents: request.total_students.max,
      minAccept: request.acceptance_rate.min,
      maxAccept: request.acceptance_rate.max,
      states: request.states === null ? undefined : request.states.join(","),
      lat: request.location && request.location.lat,
      long: request.location && request.location.long,
      minDistance: request.location && request.location.distance.min,
      maxDistance: request.location && request.location.distance.max,
      locationName: request.location && request.location.name,
      discipline: request.discipline,
      minYear: request.years.min,
      maxYear: request.years.max
    }
  };
}

type RankingLinkProps = {
  request: CollegeRankingsRequest;
  children: React.ReactNode;
};
function RankingLink(props: RankingLinkProps) {
  return <Link href={asHref(props.request)}>{props.children}</Link>;
}

type ArrowProps = {
  show: boolean;
};
export function ArrowDown(props: ArrowProps) {
  return (
    <svg
      width="10"
      height="5"
      viewBox="0 0 10 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      css={{
        visibility: props.show ? "visible" : "hidden"
      }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 0.631818L9.297 0L4.9935 3.755L4.5345 3.35455L4.537 3.35682L0.7135 0.0204545L0 0.642727C1.0565 1.565 4.007 4.13955 4.9935 5C5.7265 4.36091 5.012 4.98409 10 0.631818Z"
        fill="#999999"
      />
    </svg>
  );
}

function ArrowUp(props: ArrowProps) {
  return (
    <svg
      width="10"
      height="5"
      viewBox="0 0 10 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      css={{
        visibility: props.show ? "visible" : "hidden"
      }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 4.36834L0.702684 5L5.00656 1.24483L5.4656 1.64539L5.46308 1.64319L9.28672 4.97975L10 4.35734C8.9432 3.43516 5.99274 0.860551 5.00656 0C4.27361 0.639141 4.98789 0.0158466 0 4.36834Z"
        fill="#999999"
      />
    </svg>
  );
}

type ArrowsProps = {
  active: boolean;
  reversed: boolean;
};
function Arrows(props: ArrowsProps) {
  return (
    <div css={{ display: "flex", flexDirection: "column", marginRight: "5px" }}>
      <ArrowUp show={!props.active || !props.reversed} />
      <div css={{ height: "2px" }} />
      <ArrowDown show={!props.active || props.reversed} />
    </div>
  );
}

const COLUMNS: COLUMN[] = [
  {
    label: "Rank",
    value: (_, index) => (
      <div
        css={{
          fontSize: "32px",
          lineHeight: "80px",
          textAlign: "center",
          color: GRAY_MID,
          width: "64px"
        }}
      >
        {index + 1}
      </div>
    )
  },
  {
    label: "School",
    sort: "name",
    value: school => (
      <div css={{ display: "flex" }}>
        <div css={{ width: "64px", height: "64px" }}>
          {school.logo_url && (
            <img
              src={school.logo_url}
              css={{ maxWidth: "64px", maxHeight: "64px" }}
            />
          )}
        </div>
        <div
          css={{
            paddingLeft: "16px"
          }}
        >
          <div
            css={{
              fontSize: "16px",
              lineHeight: "20px",
              fontWeight: "bold",
              color: PRIMARY_DARK
            }}
          >
            {school.name}
          </div>
          <div
            css={{
              fontSize: "12px",
              lineHeight: "14px",
              color: GRAY_MID
            }}
          >
            {school.city}, {school.state}
          </div>
        </div>
      </div>
    )
  },
  {
    label: "Median SAT/ACT",
    sort: "median_sat",
    row: 2,
    column: 1,
    value: school => (
      <BasicCell color={GRAY_LIGHT}>
        {school.median_sat}/{school.median_act}
      </BasicCell>
    )
  },
  {
    label: "Stated Tuition",
    sort: "undergrad_tuition_in_state",
    row: 2,
    column: 2,
    value: school => (
      <BasicCell color={TERTIARY_DARK}>
        {school.undergrad_tuition_in_state &&
          "$" + school.undergrad_tuition_in_state.toLocaleString()}
      </BasicCell>
    )
  },
  {
    label: "Average Earnings",
    sort: "average_earnings",
    row: 2,
    column: 3,
    value: school => (
      <BasicCell color={SECONDARY_DARK}>
        {school.average_earnings &&
          "$" + school.average_earnings.toLocaleString()}
      </BasicCell>
    )
  },
  {
    label: "Acceptance Rate",
    sort: "acceptance_rate",
    row: 2,
    column: 4,
    value: school => {
      if (!school.acceptance_rate) {
        return <div />;
      }
      let percentage = school.acceptance_rate * 100;

      return (
        <div
          css={{
            width: "50px",
            height: "50px",
            ".CircularProgressbar-trail": {
              strokeWidth: "4px"
            },
            ".CircularProgressbar-path": {
              strokeWidth: "10px",
              stroke: "#EB5857"
            },
            ".CircularProgressbar-text": {
              fill: "black",
              fontSize: "28px",
              fontWeight: "bold"
            }
          }}
        >
          <CircularProgressbar
            value={percentage}
            text={percentage.toFixed() + "%"}
          />
        </div>
      );
    }
  },
  {
    label: "Desirability Index",
    sort: "desirability",
    row: 3,
    column: 2,

    value: school => (
      <BasicCell color="black">
        {school.desirability && school.desirability.toFixed(2)}
      </BasicCell>
    )
  },
  {
    label: "Influence Ranking",
    sort: "influence_score",
    row: 3,
    column: 1,

    value: school => (
      <BasicCell color="black">
        {school.influence_score && (school.influence_score * 100).toFixed(2)}
      </BasicCell>
    )
  },
  {
    label: "Total Students",
    sort: "total_students",
    row: 3,
    column: 3,

    value: school => (
      <BasicCell color="black">
        {school.total_students && school.total_students.toLocaleString()}
      </BasicCell>
    )
  }
];

const STATE_OPTIONS = new (USAStates as any).UsaStates().states.map(
  (state: any) => ({
    value: state.abbreviation,
    label: state.name
  })
);

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
          color: GRAY_MID
        }}
      >
        {props.label}
      </div>
      {props.children}
    </label>
  );
}

type SliderFilterProps = {
  label: string;
  format: (value: number) => string;
  id: keyof CollegeRankingsResponse["limits"];
} & FilterProps;

function SliderFilter(props: SliderFilterProps) {
  const onChange = React.useCallback(
    n =>
      props.updateRequest({
        ...props.request,
        [props.id]: {
          min: n[0],
          max: n[1]
        }
      }),
    [props.id, props.request, props.updateRequest]
  );

  return (
    <FilterLabel label={props.label}>
      <Range
        value={[props.request[props.id].min, props.request[props.id].max]}
        min={props.limits[props.id].min}
        max={props.limits[props.id].max}
        handle={RangeHandle.bind(null, props)}
        onChange={onChange}
      />
    </FilterLabel>
  );
}

function StateFilter(props: FilterProps) {
  const onChangeStates = React.useCallback(
    states => {
      props.updateRequest({
        ...props.request,
        states: states && states.map((state: any) => state.value),
        location: null
      });
    },
    [props.request, props.updateRequest]
  );

  const states = props.request.states || [];

  const selected = STATE_OPTIONS.filter(
    (state: any) => states.indexOf(state.value) !== -1
  );

  console.log(selected);

  return (
    <FilterLabel label="State">
      <Select
        value={selected}
        isMulti
        options={STATE_OPTIONS}
        onChange={onChangeStates}
      />
    </FilterLabel>
  );
}

const SAT_TO_ACT = [
  36,
  35,
  35,
  35,
  35,
  34,
  34,
  34,
  34,
  33,
  33,
  33,
  32,
  32,
  32,
  32,
  31,
  31,
  31,
  30,
  30,
  30,
  29,
  29,
  29,
  29,
  28,
  28,
  28,
  28,
  27,
  27,
  27,
  26,
  26,
  26,
  26,
  25,
  25,
  25,
  25,
  24,
  24,
  24,
  24,
  23,
  23,
  23,
  22,
  22,
  22,
  21,
  21,
  21,
  21,
  20,
  20,
  20,
  20,
  19,
  19,
  19,
  19,
  18,
  18,
  18,
  18,
  17,
  17,
  17,
  17,
  16,
  16,
  16,
  16,
  15,
  15,
  15,
  15,
  15,
  14,
  14,
  14,
  14,
  14,
  13,
  13,
  13,
  13,
  12,
  12,
  12,
  12,
  12,
  12,
  12,
  12,
  12,
  11,
  11,
  11,
  11,
  11,
  11,
  11
];

function LocationFilter(props: FilterProps) {
  const [lookups, updateLookups] = React.useReducer(
    (lookups, [text, lookup]) => ({
      ...lookups,
      [text]: lookup
    }),
    {}
  );

  const location = props.request.location || {
    lat: "0",
    long: "0",
    name: "",
    distance: {
      min: 0,
      max: 3000
    }
  };

  const onDistanceChange = React.useCallback(
    n =>
      props.updateRequest({
        ...props.request,
        states: null,
        location: {
          ...location,
          distance: {
            min: n[0],
            max: n[1]
          }
        }
      }),
    [location, props.request, props.updateRequest]
  );

  const lookupLocation = React.useCallback(
    async function lookupLocation(text: string) {
      if (text === "") {
        props.updateRequest({
          ...props.request,
          location: null
        });
      } else {
        let response = lookups[text];
        if (!response) {
          response = await apiLocationAutocomplete(text);
          updateLookups([text, response]);
        }

        if (response.cities.length > 0) {
          const location = props.request.location || {
            lat: 0,
            long: 0,
            distance: {
              min: 0,
              max: 3000
            }
          };

          props.updateRequest({
            ...props.request,
            states: null,
            location: {
              ...location,
              name: text,
              lat: response.cities[0].lat,
              long: response.cities[0].long
            }
          });
        }
      }
    },
    [location, updateLookups, lookups]
  );

  const onSelect = React.useCallback(
    text => {
      props.updateRequest({
        ...props.request,
        states: null,
        location: {
          ...location,
          name: text
        }
      });

      lookupLocation(text);
    },
    [lookupLocation, props.request, props.updateRequest]
  );

  const onChange = React.useCallback(
    event => {
      onSelect(event.target.value);
    },
    [onSelect]
  );

  const geolocate = React.useCallback(() => {
    navigator.geolocation.getCurrentPosition(position => {
      props.updateRequest({
        ...props.request,
        states: [],
        location: {
          ...location,
          name: "My Location",
          lat: position.coords.latitude + "",
          long: position.coords.longitude + ""
        }
      });
    });
  }, [location]);

  const text = props.request.location ? props.request.location.name : "";
  return (
    <FilterLabel label="Distance From">
      <div
        css={{
          display: "flex",
          alignItems: "center",
          "& .rc-slider": {
            marginLeft: "20px"
          }
        }}
      >
        <Autocomplete
          inputProps={{
            style: {
              borderRadius: "4px",
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "hsl(0,0%,80%)",
              minHeight: "34px",
              fontSize: "16px",
              fontWeight: 500
            }
          }}
          value={text}
          onChange={onChange}
          items={lookups[text] ? lookups[text].cities : []}
          getItemValue={item => item.name}
          renderItem={(item, isHighlighted) => (
            <div
              key={item.name}
              style={{ background: isHighlighted ? "lightgray" : "white" }}
            >
              {item.name}
            </div>
          )}
          onSelect={onSelect}
        />
        <button
          css={{
            height: "20px",
            width: "20px"
          }}
          onClick={geolocate}
        ></button>
        <Range
          disabled={props.request.location === null}
          defaultValue={[location.distance.min, location.distance.max]}
          min={0}
          max={3000}
          handle={RangeHandle.bind(null, {
            label: "Distance",
            format: value => value + " Miles"
          })}
          onChange={onDistanceChange}
        />
      </div>
    </FilterLabel>
  );
}

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
  console.log("HEY", JSON.stringify(discipline))
  if (
    discipline === null ||
    props.disciplines[discipline].parent === null
  ) {
    supertopic = discipline;
    subtopic = null;
  } else {
    supertopic = props.disciplines[discipline].parent;
    subtopic = discipline;
  }

  const options = [
    {
      value: null,
      label: "Overall"
    },
    ...Object.entries(props.disciplines)
      .filter(item => item[1].parent === null)
      .map(item => ({
        value: item[0],
        label: item[0]
      }))
  ];

  const selected =
    find(options, option => option.value === supertopic) || options[0];

  const suboptions = [
    {
      value: null,
      label: "Overall"
    },
    ...Object.entries(props.disciplines)
      .filter(item => item[1].parent === supertopic)
      .map(item => ({
        value: item[0],
        label: item[0]
      }))
  ];

  const sub_selected =
    find(suboptions, option => option.value === subtopic) || suboptions[0];

  return (
    <>
      <FilterLabel label="Discipline">
        <Select value={selected} options={options} onChange={onChange} />
      </FilterLabel>
      <FilterSep />
      <FilterLabel label="Subdiscipline">
        <Select
          value={sub_selected}
          options={suboptions}
          onChange={onChange}
          isDisabled={supertopic === null}
        />
      </FilterLabel>
    </>
  );
}

function FilterRow(props: { children: React.ReactNode }) {
  return (
    <div
      css={{
        display: "flex",
        "@media(max-width: 800px)": {
          flexDirection: "column"
        }
      }}
    >
      {props.children}
    </div>
  );
}

type FilterProps = {
  request: CollegeRankingsRequest;
  disciplines: DisciplinesResponse;
  updateRequest: (request: CollegeRankingsRequest) => void;
  limits: CollegeRankingsResponse["limits"];
};
const Filter = function(props: FilterProps) {
  return (
    <>
      <FilterRow>
        <SliderFilter
          label="Tuition"
          id="tuition"
          format={value => value + "K"}
          {...props}
        />
        <FilterSep />
        <SliderFilter
          format={value => value + "0/" + SAT_TO_ACT[160 - value]}
          label="SAT/ACT"
          id="median_sat"
          {...props}
        />
      </FilterRow>
      <FilterRow>
        <SliderFilter
          label="Acceptance Rate"
          id="acceptance_rate"
          format={value => value.toFixed(0) + "%"}
          {...props}
        />
        <FilterSep />
        <SliderFilter
          format={value => value + "K"}
          label="Student Population"
          id="total_students"
          {...props}
        />
      </FilterRow>
      <FilterRow>
        <StateFilter {...props} />
        <div
          css={{
            fontWeight: "bold",
            alignSelf: "center",
            padding: "10px"
          }}
        >
          Or
        </div>
        <LocationFilter {...props} />
      </FilterRow>
      <FilterRow>
        <Discipline {...props} />
      </FilterRow>
      <FilterRow
        css={{
          display: "flex"
        }}
      >
        <SliderFilter
          label="Years"
          id="years"
          format={value => (value < 0 ? -value + " BC" : value + " AD")}
          {...props}
        />
      </FilterRow>
    </>
  );
};

const STYLES: InterpolationWithTheme<any> = {};
for (let index = 2; index < COLUMNS.length; index++) {
  let column = COLUMNS[index];
  STYLES[`td:nth-of-type(${index + 1})::before`] = {
    content: '"' + column.label + '"',
    color: GRAY_MID,
    fontSize: "12px",
    lineHeight: "20px"
  };
  STYLES[`td:nth-of-type(${index + 1})`] = {
    gridRowStart: column.row,
    gridRowEnd: column.row,
    gridColumnStart: column.column,
    gridColumnEnd: column.column,
    padding: "10px"
  };
  STYLES[`td:nth-of-type(${index + 1}) div`] = {
    padding: "10px"
  };
}

const CollegeRanking: NextPage<CollegeRankingProps> = props => {
  const [request, setRequest] = React.useState(props.request);

  const updateRequest = React.useCallback(
    request => {
      setRequest(request);
      Router.replace(asHref(request));
    },
    [setRequest]
  );

  return (
    <ToolPage tool="COLLEGE RANKINGS">
      <Filter
        request={request}
        disciplines={props.disciplines}
        updateRequest={updateRequest}
        limits={props.data.limits}
      />

      <table
        css={{
          borderCollapse: "collapse",
          borderSpacing: "0px",
          width: "100%",
          "@media(max-width: 1024px)": {
            table: {
              display: "block"
            },
            thead: {
              display: "none"
            },
            tbody: {
              display: "block"
            },
            tr: {
              display: "grid",
              marginBottom: "13px",
              boxShadow: "0 6px 5px 0 rgba(0, 0, 0, 0.25)"
            },
            td: {
              display: "block"
            },
            "td:nth-of-type(1)": {
              gridRowStart: 1,
              gridRowEnd: 1,
              gridColumnStart: 1,
              gridColumnEnd: 5
            },
            "td:nth-of-type(2)": {
              paddingLeft: "50px",
              paddingTop: "10px",
              gridRowStart: 1,
              gridRowEnd: 1,
              gridColumnStart: 1,
              gridColumnEnd: 5,
              borderBottomStyle: "solid",
              borderBottomColor: GRAY_DARK,
              borderBottomWidth: ".5px"
            },
            ...STYLES
          }
        }}
      >
        <thead>
          <tr>
            {COLUMNS.map((column, index) => (
              <th
                key={index}
                css={{
                  color: GRAY_DARK,
                  fontSize: "12px",
                  lineHeight: "14px",
                  textTransform: "uppercase",
                  textAlign: "left"
                }}
              >
                <div css={{ display: "flex", "& a": { flexGrow: 1 } }}>
                  {column.sort ? (
                    <>
                      <RankingLink
                        request={{
                          ...props.request,
                          sort: column.sort,
                          reversed:
                            column.sort === props.request.sort &&
                            !props.request.reversed
                        }}
                      >
                        <a css={{ textDecoration: "none" }}>
                          {column.label.split(" ").map(word => (
                            <>
                              {word}
                              <br />
                            </>
                          ))}
                        </a>
                      </RankingLink>
                      <Arrows
                        active={column.sort === props.request.sort}
                        reversed={props.request.reversed}
                      />
                    </>
                  ) : (
                    column.label
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.data.schools.map((school, schoolIndex) => (
            <tr
              key={school.id}
              css={{
                background: "white",
                borderWidth: "0.5px",
                borderStyle: "solid",
                borderColor: GRAY_DARK,
                boxSizing: "border-box"
              }}
            >
              {COLUMNS.map((column, index) => (
                <td key={index}>{column.value(school, schoolIndex)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </ToolPage>
  );
};

CollegeRanking.getInitialProps = async function(context: NextPageContext) {
  const request = {
    sort: (context.query.sort || "influence_score") as CollegeRankingSort,
    reversed: context.query.reversed === "true",
    tuition: {
      min: parseInt((context.query.minTuition as string) || "0", 10),
      max: parseInt((context.query.maxTuition as string) || "100", 10)
    },
    median_sat: {
      min: parseInt((context.query.minSat as string) || "0", 10),
      max: parseInt((context.query.maxSat as string) || "160", 10)
    },
    acceptance_rate: {
      min: parseInt((context.query.minAccept as string) || "0", 10),
      max: parseInt((context.query.maxAccept as string) || "100", 10)
    },
    total_students: {
      min: parseInt((context.query.minStudents as string) || "0", 10),
      max: parseInt((context.query.maxStudents as string) || "80", 10)
    },
    years: {
      min: parseInt((context.query.minYear as string) || "-3000", 10),
      max: parseInt((context.query.maxYear as string) || "2020", 10)
    },
    states: context.query.states
      ? (context.query.states as string).split(",")
      : null,
    location:
      context.query.lat &&
      context.query.long &&
      context.query.minDistance &&
      context.query.maxDistance
        ? {
            lat: context.query.lat as string,
            long: context.query.long as string,
            name: context.query.locationName as string,
            distance: {
              min: parseInt(context.query.minDistance as string, 10),
              max: parseInt(context.query.maxDistance as string, 10)
            }
          }
        : null,
    discipline: (context.query.discipline as string) || null
  };

  const disciplinesPromise = apiDisciplines({});
  const data = await apiCollegeRankings(request);
  const disciplines = await disciplinesPromise

  return { data, disciplines, request };
};

export default CollegeRanking;
