import { NextPage, NextPageContext } from "next";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import "react-circular-progressbar/dist/styles.css";
import { apiDiscipline, apiDisciplines, apiInfluentialSchoolsPage } from "../../../api";
import BacktotopButton from "../../../components/BacktotopButton";
import { SubdisciplineList } from "../../../components/disciplines";
import HtmlContent from "../../../components/HtmlContent";
import { Sidebar } from "../../../components/school";
import { DISPLAY_MODES, SchoolList } from "../../../components/schools";
import { disciplineName } from "../../../disciplines";
import { DisciplineResponse, DisciplinesResponse, SchoolPartialData } from "../../../schema";

type DisciplinesProps = {
  discipline: string;
  subdiscipline: string;
  disciplines: DisciplinesResponse;
  schools: SchoolPartialData[];
} & DisciplineResponse;

const Discipline: NextPage<DisciplinesProps> = props => {
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
          max-width: 940px;
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
            </div>
            <div className="descriptionContent">
              <HtmlContent html={props.description} />
            </div>
          </div>
          <div className="subdisciplinesBar">
            <div><h3 style={{ fontWeight: 800, marginBottom: 0 }}>Sub-Disciplines</h3></div>
            <SubdisciplineList disciplines={props.disciplines} discipline={props.discipline} subdiscipline={props.subdiscipline} />
          </div>
          <div>
            <div className="disciplineTitle">
              <h1>{disciplineName(props.disciplines, props.discipline)}{props.subdiscipline ? ' / ' + disciplineName(props.disciplines, props.subdiscipline) : ''}</h1>
            </div>
            <div className="schoolList">
              <SchoolList mode={DISPLAY_MODES.thMode} schools={props.schools} />
            </div>
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

Discipline.getInitialProps = async function(context: NextPageContext) {
  const disciplines = apiDisciplines({});
  const schools = apiInfluentialSchoolsPage({
    country: null,
    discipline: (context.query.subdiscipline || context.query.discipline) as string,
    years: { min: 1900, max: 2020 }
  });
  const discipline = apiDiscipline(context.query.discipline as string);
  return {
    disciplines: await disciplines,
    discipline: context.query.discipline as string,
    subdiscipline: context.query.subdiscipline as string,
    schools: (await schools).schools,
    ...(await discipline)
  };
};

export default Discipline;
