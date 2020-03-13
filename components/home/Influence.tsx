import { DisciplineLink } from "../../links";
import DisciplineIcon from "../DisciplineIcon";

const Influence = (props: any) => {
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
                      <DisciplineIcon
                        style={styles.svg}
                        discipline={discipline}
                      />
                    </div>
                    <div className="msvgs">
                      <DisciplineIcon
                        style={styles.msvg}
                        discipline={discipline}
                      />
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

const styles = {
  svg: {
    fontSize: 64,
    color: "#666666"
  },
  msvg: {
    fontSize: 42,
    color: "#666666"
  }
};

export default Influence;
