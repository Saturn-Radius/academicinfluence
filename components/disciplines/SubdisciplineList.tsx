import React, { useState } from "react";
import { DisciplineLink } from "../../links";
import { GRAY_DARK, GRAY_MEDI, GRAY_MID, PRIMARY_DARK } from "../../styles";

const SubdisciplineList = React.forwardRef(
  ({ onClick, href, ...props }: any, ref) => {
    const [id, setIsCheck] = useState(props.id);

    const handleChecked = (id: any) => {
      setIsCheck(id);
    };

    return (
      <div>
        <style jsx>
          {`
            .container {
              display: block;
              position: relative;
              padding-left: 35px;
              margin-bottom: 22px;
              cursor: pointer;
              font-size: 22px;
              -webkit-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              user-select: none;
            }
            .container input {
              position: absolute;
              opacity: 0;
              cursor: pointer;
              height: 0;
              width: 0;
            }
            .checkmark {
              position: absolute;
              top: 0;
              left: 0;
              height: 20px;
              width: 20px;
              background-color: #e5e5e5;
              border: 1px solid #666666;
            }
            .container input:checked ~ .checkmark {
              background-color: #1e988a;
            }
            .checkmark:after {
              content: "";
              position: absolute;
              display: none;
            }
            .container input:checked ~ .checkmark:after {
              display: block;
            }
            .container .checkmark:after {
              left: 7px;
              top: 3px;
              width: 5px;
              height: 10px;
              border: solid white;
              border-width: 0 3px 3px 0;
              -webkit-transform: rotate(45deg);
              -ms-transform: rotate(45deg);
              transform: rotate(45deg);
            }
            .tableList {
              padding-left: 0px;
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
            }
          `}
        </style>
        <ul className="tableList">
          {props.disciplines
            .filter((discipline: any) => discipline.parent === props.discipline)
            .map((discipline: any) => (
              <li
                style={
                  id == discipline.id ? styles.liStyle : styles.defaultliStyle
                }
                key={discipline.slug}
              >
                <DisciplineLink discipline={discipline}>
                  <a
                    style={
                      id == discipline.id
                        ? styles.linkStyle
                        : styles.defaultlinkStyle
                    }
                  >
                    {discipline.name}
                  </a>
                </DisciplineLink>
                <label className="container">
                  <input
                    type="checkbox"
                    onChange={() => handleChecked(discipline.id)}
                    checked={id === discipline.id}
                  />
                  <span className="checkmark"></span>
                </label>
              </li>
            ))}
        </ul>
      </div>
    );
  }
);

const styles = {
  defaultliStyle: {
    backgroundColor: GRAY_MEDI,
    border: 1,
    borderStyle: "solid",
    borderColor: GRAY_DARK,
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
    borderColor: GRAY_DARK,
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
    color: GRAY_MID,
    fontSize: 12,
    fontWeight: 500
  },
  linkStyle: {
    textDecoration: "none",
    color: PRIMARY_DARK,
    fontSize: 12,
    fontWeight: 600
  }
};

export default SubdisciplineList;
