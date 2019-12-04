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
import { api, COLLEGE_RANKING_SORTS, API, CollegeData } from "../api";
import React from "react";
import { Range, HandleProps, Handle } from "rc-slider";
import Tooltip from "rc-tooltip";

type CollegeRankingData = API["collegeRankings"]["response"];

type CollegeRankingProps = {
  data: CollegeRankingData;
  request: API["collegeRankings"]["request"];
};

type COLUMN = {
  label: string;
  sort?: keyof typeof COLLEGE_RANKING_SORTS;
  value: (school: CollegeData, index: number) => ReactElementLike;
};

type BasicCellProps = {
  children: React.ReactNode;
  color: string;
  bold?: boolean;
};
function BasicCell(props: BasicCellProps) {
  return (
    <div
      css={{
        fontSize: "20px",
        lineHeight: "24px",
        color: props.color,
        fontWeight: props.bold ? "bold" : "normal",
        "@media(max-width: 1024px)": {
          fontSize: "14px",
          lineHeight: "17px"
        }
      }}
    >
      {props.children}
    </div>
  );
}

type RankingLinkProps = {
  request: API["collegeRankings"]["request"];
  children: React.ReactNode;
};
function RankingLink(props: RankingLinkProps) {
  return (
    <Link
      href={{
        pathname: "/college-ranking",
        query: props.request
      }}
    >
      {props.children}
    </Link>
  );
}

export function ArrowDown() {
  return (
    <svg
      width="10"
      height="5"
      viewBox="0 0 10 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
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

function ArrowUp() {
  return (
    <svg
      width="10"
      height="5"
      viewBox="0 0 10 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
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
      <div>
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
    )
  },
  {
    label: "Median SAT/ACT",
    sort: "median_sat",
    value: school => (
      <BasicCell color={GRAY_LIGHT}>
        {school.median_sat}/{school.median_act}
      </BasicCell>
    )
  },
  {
    label: "Stated Tuition",
    sort: "undergrad_tuition_in_state",
    value: school => (
      <BasicCell color={TERTIARY_DARK} bold>
        {school.undergrad_tuition_in_state &&
          "$" + school.undergrad_tuition_in_state.toLocaleString()}
      </BasicCell>
    )
  },
  {
    label: "Average Earnings",
    sort: "average_earnings",
    value: school => (
      <BasicCell color={SECONDARY_DARK} bold>
        {school.average_earnings &&
          "$" + school.average_earnings.toLocaleString()}
      </BasicCell>
    )
  },
  {
    label: "Acceptance Rate",
    sort: "acceptance_rate",
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
    label: "Influence Ranking",
    sort: "influence_score",
    value: school => (
      <BasicCell color="black">
        {school.influence_score && (school.influence_score * 100).toFixed(2)}
      </BasicCell>
    )
  }
];

function FilterIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        fill="#1E988A"
        fillRule="evenodd"
        d="M11.009 10L11 14H9v-4L3.461 2H16.54l-5.531 8zM9 18h2v-2H9v2zM0 0l7 10.857V20h6v-9.143L20 0H0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      fill="none"
      viewBox="0 0 15 15"
    >
      <path
        fill="#666"
        fillRule="evenodd"
        d="M8.585 7.5L15 13.915 13.915 15 7.5 8.585 1.085 15 0 13.915 6.415 7.5 0 1.085 1.085 0 7.5 6.415 13.915 0 15 1.085 8.585 7.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function RangeHandle(props: any) {
  const { value, dragging, index, ...restProps } = props;

  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value.toLocaleString()}
      visible={true}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
}

type FilterProps = {
  request: API["collegeRankings"]["request"];
};
const Filter = function(props: FilterProps) {
  return (
    <>
      Tuition
      <Range
        defaultValue={[props.request.minTuition, props.request.maxTuition]}
        min={0}
        max={100000}
        handle={RangeHandle}
        onChange={n => {
          Router.replace({
            pathname: "/college-ranking",
            query: {
              ...props.request,
              minTuition: n[0],
              maxTuition: n[1]
            }
          });
        }}
      />
    </>
  );
};

const CollegeRanking: NextPage<CollegeRankingProps> = props => {
  return (
    <ToolPage tool="COLLEGE RANKINGS">
      <Filter request={props.request} />

      <table
        css={{
          borderCollapse: "collapse",
          borderSpacing: "0px",
          width: "100%"
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
                {column.sort ? (
                  <RankingLink
                    request={{
                      ...props.request,
                      sort: column.sort,
                      reversed:
                        column.sort === props.request.sort &&
                        !props.request.reversed
                    }}
                  >
                    <a css={{ textDecoration: "none" }}>{column.label}</a>
                  </RankingLink>
                ) : (
                  column.label
                )}
                {column.sort === props.request.sort && (
                  <> {props.request.reversed ? <ArrowUp /> : <ArrowDown />}</>
                )}
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
    sort: (context.query.sort ||
      "influence_score") as keyof typeof COLLEGE_RANKING_SORTS,
    reversed: context.query.reversed === "true",
    minTuition: parseInt((context.query.minTuition as string) || "0", 10),
    maxTuition: parseInt((context.query.maxTuition as string) || "100000", 10)
  };

  const data = await api("collegeRankings", request);

  return { data, request };
};

export default CollegeRanking;
