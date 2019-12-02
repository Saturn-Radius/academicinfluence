import { NextPage, NextPageContext } from "next";
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
  SECONDARY_DARK
} from "../styles";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type CollegeData = {
  id: string;
  name: string;
  city: string;
  state: string;
  median_sat: number | null;
  median_act: number | null;
  undergrad_tuition_in_state: number | null;
  average_earnings: number | null;
  acceptance_rate: number | null;
  total_students: number | null;
  influence_score: number | null;
};

export type CollegeRankingData = {
  schools: CollegeData[];
};

type CollegeRankingProps = {
  data: CollegeRankingData;
  sort: keyof CollegeData;
};

type COLUMN = {
  label: string;
  sort?: keyof CollegeData;
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

const CollegeRanking: NextPage<CollegeRankingProps> = props => {
  return (
    <ToolPage tool="COLLEGE RANKINGS">
      <table
        css={{
          borderCollapse: "collapse",
          borderSpacing: "0px",
          width: "100%",
          overflowY: "auto"
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
                <Link
                  href={{
                    pathname: "/college-ranking",
                    query: {
                      sort: column.sort
                    }
                  }}
                >
                  <a css={{ textDecoration: "none" }}>{column.label}</a>
                </Link>

                {column.sort === props.sort && (
                  <>
                    {" "}
                    <ArrowDown />
                  </>
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
  const sort = (context.query.sort || "influence_score") as keyof CollegeData;

  const url =
    (context.req ? "http://" + context.req.headers.host : "") +
    "/api/college-ranking?sort=" +
    sort;
  const response = await fetch(url);
  const data = await response.json();
  return {
    data: data,
    sort: sort
  };
};

export default CollegeRanking;
