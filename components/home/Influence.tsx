import { DisciplineLink } from "../../links";
import { DisciplineDetail } from "../../schema";
import DisciplineIcon from "../DisciplineIcon";

type Disciplines = {
  disciplines: DisciplineDetail[];
};

const Influence = (props: Disciplines) => {
  return (
    <div>
      <style jsx>
        {`
          .influenceBlock {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
          }
          .icons {
            display: flex;
            flex-direction: column;
            margin-left: 48px;
            margin-right: 48px;
          }
          .iconLink {
            width: 96px;
            height: 96px;
            font-size: 22px;
            color: #666666;
            position: absolute;
            margin-left: 19px;
            margin-top: 34px;
          }
          .hexagon {
            width: 135px;
            height: 135px;
          }
          .msvgs {
            display: none;
          }
          .disciplineName {
            font-size: 22px;
          }
          .svgs {
            font-size: 64px;
            color: #666666;
          }
          .svgs :hover {
            color: #367d8a;
          }
          @media (max-width: 600px) {
            .icons {
              margin-left: 20px;
              margin-right: 20px;
            }
            .icon {
              margin-left: 12px;
              margin-right: 12px;
            }
            .hexagon {
              width: 80px;
              height: 80px;
            }
            .iconLink {
              width: 70px;
              height: 70px;
              margin-top: 17px;
            }
            .msvgs {
              display: flex;
              font-size: 42px;
              color: #666666;
            }
            .msvgs :hover {
              color: #367d8a;
            }
            .svgs {
              display: none;
            }
            .disciplineName {
              font-size: 10px;
            }
          }
        `}
      </style>
      <div className="influenceBlock">
        {props.disciplines
          .filter((discipline: any) => discipline.level == 1)
          .map((discipline: any, index: number) => (
            <DisciplineLink key={index} discipline={discipline}>
              <div>
                <div className="icons">
                  <img src="images/hexagon.svg" className="hexagon" />
                  <a className="iconLink">
                    <div className="svgs">
                      <DisciplineIcon discipline={discipline} />
                    </div>
                    <div className="msvgs">
                      <DisciplineIcon discipline={discipline} />
                    </div>
                  </a>
                </div>
                <span className="disciplineName">{discipline.name}</span>
              </div>
            </DisciplineLink>
          ))}
      </div>
    </div>
  );
};

export default Influence;
