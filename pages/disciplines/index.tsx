import { NextPage, NextPageContext } from "next";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import "react-circular-progressbar/dist/styles.css";
import { apiDisciplines } from "../../api";
import BacktotopButton from "../../components/BacktotopButton";
import { DropdownButton } from "../../components/disciplines";
import { Sidebar } from "../../components/school";
import { DisciplineLink } from "../../links";
import { DisciplinesResponse } from "../../schema";

type DisciplinesProps = {
  disciplines: DisciplinesResponse;
};

const Disciplines: NextPage<DisciplinesProps> = props => {
  return (
    <div>
      <style jsx>
        {`
          .leftSidebar {
            display: flex;
            justify-content: center;
            margin-top: 65px;
            margin-bottom: 150px;
            flex-wrap: wrap;
          }
          .scienceContent {
            display: flex;
            flex-wrap: wrap;
          }
          .humanContent {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            width: 420px;
          }
          .naturalContent {
            margin-left: 30px;
            width: 420px;
          }
          .rightSidebar {
            margin-left: 10px;
            margin-top: 30px;
          }
          .liStyle {
            list-style-type: none;
            background-color: #dfdede;
            border-bottom: 1px solid #999999;
            padding-top: 23.5px;
            padding-bottom: 23.5px;
            padding-left: 25px;
          }
          .linkStyle {
            text-decoration: none;
            color: #1e988a;
            font-size: 20px;
            font-weight: 600;
          }
          @media (max-width: 920px) {
            .naturalContent {
              margin-left: 0px;
              width: auto;
            }
            .humanContent {
              width: auto;
            }
            .leftSidebar {
              flex-direction: column;
            }
            .scienceContent {
              display: flex;
              flex-direction: column;
            }
            .sidebar {
              display: flex;
              justify-content: center;
            }
            .rightSidebar {
              margin-left: 0px;
            }
          }
        `}
      </style>
      <div className="leftSidebar">
        <div className="scienceContent">
          <div className="humanContent">
            <DropdownButton image_url="/images/humanities.svg" text="Humanities" disciplines={
              props.disciplines.filter(item => item.level === 1 && item.parent === "humanities").map(
                (discipline) => (
                  <li className="liStyle" key={discipline.name}><DisciplineLink discipline={discipline}><a className="linkStyle">{discipline.name}</a></DisciplineLink></li>
                )
              )
            } />
            <DropdownButton image_url="/images/social-sciences.svg" text="Social Sciences" disciplines={
              props.disciplines.filter(item => item.level === 1 && item.parent === "social-sciences").map(
                (discipline) => (
                  <li className="liStyle" key={discipline.name}><DisciplineLink discipline={discipline}><a className="linkStyle">{discipline.name}</a></DisciplineLink></li>
                )
              )
            } />
          </div>
          <div className="naturalContent">
            <DropdownButton image_url="/images/natural-sciences.svg" text="Natural Sciences" disciplines={
              props.disciplines.filter(item => item.level === 1 && item.parent === "natural-sciences").map(
                (discipline) => (
                  <li className="liStyle" key={discipline.name}><DisciplineLink discipline={discipline}><a className="linkStyle">{discipline.name}</a></DisciplineLink></li>
                )
              )
            } />
            <DropdownButton image_url="/images/formal-sciences.svg" text="Formal Sciences" disciplines={
              props.disciplines.filter(item => item.level === 1 && item.parent === "formal-sciences").map(
                (discipline) => (
                  <li className="liStyle" key={discipline.name}><DisciplineLink discipline={discipline}><a className="linkStyle">{discipline.name}</a></DisciplineLink></li>
                )
              )
            } />
            <DropdownButton image_url="/images/applied-sciences.svg" text="Applied Sciences" disciplines={
              props.disciplines.filter(item => item.level === 1 && item.parent === "applied-sciences").map(
                (discipline) => (
                  <li className="liStyle" key={discipline.name}><DisciplineLink discipline={discipline}><a className="linkStyle">{discipline.name}</a></DisciplineLink></li>
                )
              )
            } />
          </div>
        </div>
        <div className="rightSidebar">
          <div className="sidebar"><Sidebar /></div>
        </div>
      </div>
      <BacktotopButton />
    </div>
  );
};

Disciplines.getInitialProps = async function(context: NextPageContext) {
  const disciplines = apiDisciplines({});
  return {
    disciplines: await disciplines
  };
};

export default Disciplines;
