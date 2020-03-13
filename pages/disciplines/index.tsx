import { NextPage } from "next";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import "react-circular-progressbar/dist/styles.css";
import { useBasicContext } from "../../components/BasicContext";
import { DropdownButton } from "../../components/disciplines";
import { DisciplineLink } from "../../links";
import StandardPage from "../../templates/StandardPage";

type DisciplinesProps = {};

function Superdiscipline(props: {
  superdiscipline: string;
  image_url: string;
  title: string;
}) {
  const basicContext = useBasicContext();
  return (
    <>
      <style jsx>
        {`
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
        `}
      </style>
      <DropdownButton
        image_url={props.image_url}
        text={props.title}
        disciplines={basicContext.disciplines
          .filter(
            item => item.level === 1 && item.parent === props.superdiscipline
          )
          .map(discipline => (
            <li className="liStyle" key={discipline.name}>
              <DisciplineLink discipline={discipline}>
                <a className="linkStyle">{discipline.name}</a>
              </DisciplineLink>
            </li>
          ))}
      />
    </>
  );
}

const Disciplines: NextPage<DisciplinesProps> = props => {
  return (
    <StandardPage title="Disciplines">
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
        <div className="scienceContent">
          <div className="humanContent">
            <Superdiscipline
              image_url="/images/humanities.svg"
              title="Humanities"
              superdiscipline="humanities"
            />
            <Superdiscipline
              image_url="/images/social-sciences.svg"
              title="Social Sciences"
              superdiscipline="social-sciences"
            />
          </div>
          <div className="naturalContent">
            <Superdiscipline
              image_url="/images/natural-sciences.svg"
              title="Natural Sciences"
              superdiscipline="natural-sciences"
            />
            <Superdiscipline
              image_url="/images/formal-sciences.svg"
              title="Formal Sciences"
              superdiscipline="formal-sciences"
            />
            <Superdiscipline
              image_url="/images/applied-sciences.svg"
              title="Applied Sciences"
              superdiscipline="applied-sciences"
            />
          </div>
        </div>
      </div>
    </StandardPage>
  );
};

export default Disciplines;
