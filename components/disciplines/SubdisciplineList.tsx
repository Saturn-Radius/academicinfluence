import { DisciplineLink } from "../../links";
import { GRAY_DARKEST, MAIN } from "../../styles";
import { useBasicContext } from "../BasicContext";

type SubdisciplineListProps = {
  discipline: string;
  subdiscipline?: string;
};

export default function SubdisciplineList(props: SubdisciplineListProps) {
  const basicContext = useBasicContext();
  return (
    <div>
      <style jsx>
        {`
          .tableList {
            padding-left: 0px;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            color: white;
          }
        `}
      </style>
      <ul className="tableList">
        {basicContext.disciplines
          .filter(discipline => discipline.parent === props.discipline)
          .map(discipline => (
            <DisciplineLink discipline={discipline} key={discipline.slug}>
              <a
                css={
                  props.subdiscipline == discipline.slug
                    ? styles.linkStyle
                    : styles.defaultlinkStyle
                }
              >
                <li
                  css={
                    props.subdiscipline == discipline.slug
                      ? styles.liStyle
                      : styles.defaultliStyle
                  }
                >
                  {discipline.name}
                </li>
              </a>
            </DisciplineLink>
          ))}
      </ul>
    </div>
  );
}

const styles = {
  defaultliStyle: {
    backgroundColor: MAIN,
    border: 1,
    borderStyle: "solid",
    borderColor: GRAY_DARKEST,
    height: 32,
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 5,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: 265
  },
  liStyle: {
    backgroundColor: "rgba(55, 194, 171, 0.2)",
    border: 1,
    borderStyle: "solid",
    borderColor: GRAY_DARKEST,
    height: 32,
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 5,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: 265
  },
  defaultlinkStyle: {
    textDecoration: "none",
    fontSize: 12,
    fontWeight: 500
  },
  linkStyle: {
    textDecoration: "none",
    color: MAIN,
    fontSize: 12,
    fontWeight: 600
  }
};
