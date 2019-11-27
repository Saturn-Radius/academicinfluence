import fetch from "isomorphic-unfetch";
import ToolPage from "../ToolPage";
import { ReactElementLike } from "prop-types";
import { GRAY_DARK, UI_FONT, GRAY_MID, PRIMARY_DARK, GRAY_LIGHT, TERTIARY_DARK, SECONDARY_DARK, SECONDARY_FONT } from "../styles";
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';


type CollegeData = {
    id: string,
    name: string,
    city: string,
    state: string,
    median_sat: number | null,
    median_act: number | null,
    undergrad_tuition_in_state: number | null,
    average_earnings: number | null
    acceptance_rate: number | null,
    total_students: number | null,
    influence_score: number | null,
}

export type CollegeRankingData = {
  schools: CollegeData[]
}

type CollegeRankingProps = {
  data: CollegeRankingData
};

type COLUMN = {
  label: string,
  sort?: keyof CollegeData,
  value: (school: CollegeData, index: number) => ReactElementLike
}

const COLUMNS: COLUMN[] = [
  {
    label: "Rank",
    value: (_, index) => <div css={{
      fontFamily: UI_FONT,
      fontSize: '32px',
      lineHeight: '80px',
      textAlign: 'center',
      color: GRAY_MID,
      width: '64px'
    }}>{index + 1}</div>
  },
  {
    label: "School",
    sort: "name",
    value: school => <div>
      <div css={{
        fontFamily: UI_FONT,
        fontSize: '16px',
        lineHeight: '20px',
        fontWeight: 'bold',
        color: PRIMARY_DARK
      }}>{school.name}</div>
      <div css={{
        fontFamily: UI_FONT,
        fontSize: '12px',
        lineHeight: '14px',
        color: GRAY_MID
      }}>{school.city}, {school.state}</div>
      </div>
  },
  {
    label: "Median SAT/ACT",
    sort: "median_sat",
    value: school => <div css={{
      fontFamily: UI_FONT,
      fontSize: '20px',
      lineHeight: '24px',
      color: GRAY_LIGHT
    }}>{school.median_sat}/{school.median_act}</div>
  },
  {
    label: "Stated Tuition",
    sort: "undergrad_tuition_in_state",
    value: school => <div css={{
      fontFamily: UI_FONT,
      fontSize: '20px',
      lineHeight: '24px',
      color: TERTIARY_DARK,
      fontWeight:  'bold'
    }}>${school.undergrad_tuition_in_state.toLocaleString()}</div>
  },
  {
    label: "Average Earnings",
    sort: "average_earnings",
    value: school => <div css={{
      fontFamily: UI_FONT,
      fontSize: '20px',
      lineHeight: '24px',
      color: SECONDARY_DARK,
      fontWeight:  'bold'
    }}>${school.average_earnings.toLocaleString()}</div>
  },
{
    label: "Acceptance Rate",
    sort: "acceptance_rate",
    value: school => {
      let percentage = school.acceptance_rate * 100;

      return <div css={{
        width: '50px',
        height: '50px',
        '.CircularProgressbar-trail': {
          strokeWidth: '4px'
        },
        '.CircularProgressbar-path': {
          strokeWidth: '10px',
          stroke: '#EB5857'
        },
        '.CircularProgressbar-text': {
          fontFamily: SECONDARY_FONT,
          fill: 'black',
          fontSize: '28px',
          fontWeight: 'bold'
        }
      }}>
        <CircularProgressbar value={percentage} text={percentage.toFixed() + '%'}/>
      </div>
    }
  },
  {
    label: "Influence Ranking",
    sort: "influence_score",
    value: school => 
      <div css={{
          fontSize: '20px',
          lineHeight: '24px',
          fontFamily: UI_FONT
      }}>{(school.influence_score*100).toFixed(2)}</div>
  }
]

const CollegeRanking = (props: CollegeRankingProps) => (
  <ToolPage tool="COLLEGE RANKINGS">
    <table css={{
      borderCollapse: 'collapse',
      borderSpacing: '0px',
      width: '100%'
    }}>
      <thead>
        <tr>
          {COLUMNS.map((column, index) => 
            <th key={index} css={{
              color: GRAY_DARK,
              font: UI_FONT,
              fontSize: '12px',
              lineHeight: '14px',
              textTransform: 'uppercase',
              textAlign: 'left'
            }}>{column.label}</th>
          )}
        </tr>
      </thead>
      <tbody>
          {props.data.schools.map((school, schoolIndex) => 
            <tr key={school.id} css={{
              background: 'white',
              borderWidth: '0.5px',
              borderStyle: 'solid',
              borderColor: GRAY_DARK,
              boxSizing: 'border-box',
            }}>
              {COLUMNS.map((column, index) => 
                <td key={index}>{column.value(school, schoolIndex)}</td>
              )}             
            </tr>
          )}
      </tbody>
    </table>
  </ToolPage>
);

CollegeRanking.getInitialProps = async function({ req }) {
  const url = (req ? "http://" + req.headers.host : "") + "/api/college-ranking";
  const response = await fetch(url);
  const data = await response.json();
  return {
    data: data
  };
};

export default CollegeRanking;
