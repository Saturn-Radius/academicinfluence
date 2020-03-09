import { NextPage, NextPageContext } from "next";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import "react-circular-progressbar/dist/styles.css";
import { apiDiscipline, apiDisciplines, apiInfluentialSchoolsPage } from "../../../api";
import HtmlContent from "../../../components/HtmlContent";
import { DisciplineResponse, DisciplinesResponse, InfluentialSchoolsPageResponse } from "../../../schema";
import { Sidebar } from "../../../components/school";
import BacktotopButton from "../../../components/BacktotopButton";
import CheckBox from "../../../components/Checkbox";
import { SubdisciplineList } from "../../../components/disciplines";

type DisciplinesProps = {
  discipline: string;
  disciplines: DisciplinesResponse;
  schools: InfluentialSchoolsPageResponse;
} & DisciplineResponse;

const Discipline: NextPage<DisciplinesProps> = props => {
  let disciplines = props.disciplines;
  disciplines.map((discipline: any, key: number) =>
  {
    discipline.id = key;
    return discipline;
  })

  return (
    <div>
      <style jsx>
      {`
        .mainContent {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          margin: 65px 30px 150px 30px;
        }
        .descriptionTitle {
          display: flex;
          justify-content: space-between;
          color: #038C8C;
        }
        .subdisciplinesBar {
          display: flex;
          flex-direction: column;
          margin-top: 35px;
        }
        .leftSidebar {
          display: flex;
          flex-direction: column;
        }
        @media (max-width: 970px) {
          .rightSidebar {
            margin-top: 35px;
          }
          .addtoLocker {
            display: none;
          }
          .descriptionTitle {
            font-size: 12px;
          }
        }
      `}
      </style>
      <div className="mainContent">
        <div className="leftSidebar">
          <div className="descriptionBar">
            <div className="descriptionTitle">
              <h1>{props.name}</h1>
              <div className="addtoLocker"><AddToLocker /></div>
            </div>
            <div className="descriptionContent">
              <HtmlContent html={props.description} />
              <p style={{ maxWidth: 940 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                 eiusmod tempor incididunt ut labore et dolore magna aliqua.
                 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                 nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                 reprehenderit in voluptate velit esse cillum dolore.</p>
            </div>
          </div>
          <div className="subdisciplinesBar">
            <div><h3 style={{ fontWeight: 800, marginBottom: 0 }}>Sub-Disciplines</h3></div>
            <SubdisciplineList disciplines={disciplines} discipline={props.discipline} />
          </div>
        </div>
        <div className="rightSidebar">
          <Sidebar />
        </div>
      </div>
      <BacktotopButton />
    </div>
  );
};

const AddToLocker = (props: any) => (
  <div style={{ ...{ display: 'flex', marginLeft: 'auto', paddingBottom: 20, paddingTop: 10 }, ...props.style }}>
      <span style={{ color: '#666666', marginRight: 10, fontSize: 12, paddingTop: 2 }}>Add to My Locker</span>
      <CheckBox />
  </div>
)

Discipline.getInitialProps = async function(context: NextPageContext) {
  const disciplines = apiDisciplines({});
  const schools = apiInfluentialSchoolsPage({
    country: null,
    discipline: context.query.discipline as string,
    years: { min: 1900, max: 2020 }
  });
  const discipline = apiDiscipline(context.query.discipline as string);
  return {
    disciplines: await disciplines,
    discipline: context.query.discipline as string,
    schools: await schools,
    ...(await discipline)
  };
};

export default Discipline;
