import { DisciplineLink } from "../../links";
import DisciplineIcon from "../DisciplineIcon";

const Influence = (props: any) => {
  return (
    <div>
      <style jsx>
        {`
          @media (max-width: 600px) {
          }
        `}
      </style>
      {props.disciplines
        .filter((discipline: any) => discipline.level == 1)
        .map((discipline: any, index: number) => (
          <DisciplineLink key={index} discipline={discipline}>
            <a style={styles.iconBlock}>
              <DisciplineIcon style={styles.svg} discipline={discipline} />
              <>{discipline.name}</>
            </a>
          </DisciplineLink>
        ))}
    </div>
  );
};

const styles = {
  iconBlock: {
    display: "inline-block",
    width: 140,
    height: 140,
    margin: 48
  },
  svg: {
    fontSize: 64
    //marginLeft: 32,
  }
};

export default Influence;
