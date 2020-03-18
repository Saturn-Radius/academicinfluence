import { NextPage, NextPageContext } from "next";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import "react-circular-progressbar/dist/styles.css";
import { apiDiscipline, apiInfluentialSchoolsPage } from "../../../api";
import { useBasicContext } from "../../../components/BasicContext";
import { SubdisciplineList } from "../../../components/disciplines";
import HtmlContent from "../../../components/HtmlContent";
import { SchoolList } from "../../../components/schools";
import { DisciplineResponse, SchoolPartialData } from "../../../schema";
import StandardPage from "../../../templates/StandardPage";

type DisciplinesProps = {
  discipline: string;
  subdiscipline: string;
  schools: SchoolPartialData[];
} & DisciplineResponse;

const Discipline: NextPage<DisciplinesProps> = props => {
  const basicContext = useBasicContext();
  return (
    <StandardPage
      title={basicContext.disciplineName(props.discipline)}
      section="by-discipline"
    >
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
            color: #038c8c;
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
      <div className="descriptionBar">
        <div className="descriptionTitle">
          <h1>{props.name}</h1>
        </div>
        <div className="descriptionContent">
          <HtmlContent html={props.description} />
        </div>
      </div>
      <div className="subdisciplinesBar">
        <div>
          <h3 css={{ fontWeight: 800, marginBottom: 0 }}>Sub-Disciplines</h3>
        </div>
        <SubdisciplineList
          discipline={props.discipline}
          subdiscipline={props.subdiscipline}
        />
      </div>
      <div>
        <div className="disciplineTitle">
          <h1>
            {basicContext.disciplineName(props.discipline)}
            {props.subdiscipline
              ? " / " + basicContext.disciplineName(props.subdiscipline)
              : ""}
          </h1>
        </div>
        <div className="schoolList">
          <SchoolList schools={props.schools} />
        </div>
      </div>
    </StandardPage>
  );
};

Discipline.getInitialProps = async function(context: NextPageContext) {
  const schools = apiInfluentialSchoolsPage({
    country: null,
    discipline: (context.query.subdiscipline ||
      context.query.discipline) as string,
    years: { min: 1900, max: 2020 }
  });
  const discipline = apiDiscipline(context.query.discipline as string);
  return {
    discipline: context.query.discipline as string,
    subdiscipline: context.query.subdiscipline as string,
    schools: (await schools).schools,
    ...(await discipline)
  };
};

export default Discipline;
