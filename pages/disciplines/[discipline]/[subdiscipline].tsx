import { NextPage, NextPageContext } from "next";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import "react-circular-progressbar/dist/styles.css";
import { apiDisciplines, apiInfluentialSchoolsPage } from "../../../api";
import { DisciplineLink } from "../../../links";
import { DisciplinesResponse, InfluentialSchoolsPageResponse } from "../../../schema";
import { Sidebar } from "../../../components/school";
import BacktotopButton from "../../../components/BacktotopButton";
import CheckBox from "../../../components/Checkbox";
import { SubdisciplineList } from "../../../components/disciplines";

type DisciplinesProps = {
  discipline: string;
  subdiscipline: string;
  disciplines: any;
  schools: InfluentialSchoolsPageResponse;
};

const Discipline: NextPage<DisciplinesProps> = props => {
  let disciplines = props.disciplines;
  disciplines.map((discipline: any, key: number) =>
  {
    discipline.id = key;

    return discipline;
  })

  var selectedSubdiscipline = disciplines.filter((discipline: any) => discipline.slug == props.subdiscipline)

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
          min-width: 940px;
        }
        .subdisciplinesBar {
          display: flex;
          flex-direction: column;
          margin-top: 35px;
        }
        @media (max-width: 970px) {
          .rightSidebar {
            margin-top: 35px;
          }
          .descriptionTitle {
            width: auto;
            min-width: 650px;
          }
          .addtoLocker {
            display: none;
          }
        }
        @media (max-width: 700px) {
          .descriptionTitle {
            min-width: 300px;
            font-size: 12px;
          }
        }
      `}
      </style>
      <div className="mainContent">
        <div className="leftSidebar">
          <div className="descriptionTitle">
            <h1>{props.discipline}</h1>
            <div className="addtoLocker"><AddToLocker /></div>
          </div>
          <div className="subdisciplinesBar">
            <div><h3 style={{ fontWeight: 800, marginBottom: 0 }}>Sub-Disciplines</h3></div>
            <SubdisciplineList disciplines={props.disciplines} discipline={props.discipline} id={selectedSubdiscipline[0].id} />
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
    discipline: context.query.subdiscipline as string,
    years: { min: 1900, max: 2020 }
  });
  return {
    disciplines: await disciplines,
    discipline: context.query.discipline as string,
    subdiscipline: context.query.subdiscipline as string,
    schools: await schools
  };
};

export default Discipline;
