import { NextPage, NextPageContext } from "next";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import "react-circular-progressbar/dist/styles.css";
import { apiDisciplines, apiInfluentialSchoolsPage } from "../../../api";
import { DisciplineLink } from "../../../links";
import {
  DisciplinesResponse,
  InfluentialSchoolsPageResponse
} from "../../../schema";

type DisciplinesProps = {
  discipline: string;
  subdiscipline: string;
  disciplines: DisciplinesResponse;
  schools: InfluentialSchoolsPageResponse;
};

const Discipline: NextPage<DisciplinesProps> = props => {
  return (
    <div>
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
