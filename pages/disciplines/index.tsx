import { NextPage, NextPageContext } from "next";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import "react-circular-progressbar/dist/styles.css";
import { apiDisciplines } from "../../api";
import { DisciplineLink } from "../../links";
import { DisciplinesResponse } from "../../schema";


type DisciplinesProps = {
  disciplines: DisciplinesResponse,
}

const Disciplines: NextPage<DisciplinesProps> = props => {
  return (
     <div>
         <ul>

         {props.disciplines.filter(item => item.level === 1).map((discipline) => (
            <li key={discipline.name}><DisciplineLink discipline={discipline}><a>{discipline.name}</a></DisciplineLink></li>
         ))}
         </ul>
    </div>
  );
};

Disciplines.getInitialProps = async function(context: NextPageContext) {


  const disciplines = apiDisciplines({})
  return {
    disciplines: await disciplines,
  }

};

export default Disciplines;
