import { NextPage, NextPageContext } from "next";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import "react-circular-progressbar/dist/styles.css";
import { apiDiscipline, apiDisciplines, apiInfluentialSchoolsPage } from "../../../api";
import HtmlContent from "../../../components/HtmlContent";
import { DisciplineLink } from "../../../links";
import { DisciplineResponse, DisciplinesResponse, InfluentialSchoolsPageResponse } from "../../../schema";

type DisciplinesProps = {
  discipline: string;
  disciplines: DisciplinesResponse;
  schools: InfluentialSchoolsPageResponse;
} & DisciplineResponse;

const Discipline: NextPage<DisciplinesProps> = props => {
  return (
    <div>
      <h1>{props.name}</h1>
      <HtmlContent html={props.description} />
      <ul>
        {props.disciplines
          .filter(discipline => discipline.parent === props.discipline)
          .map(discipline => (
            <li key={discipline.slug}>
              <DisciplineLink discipline={discipline}>
                <a>{discipline.name}</a>
              </DisciplineLink>
            </li>
          ))}
      </ul>
      <pre>{JSON.stringify(props.schools, undefined, 4)}</pre>
    </div>
  );
};

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
