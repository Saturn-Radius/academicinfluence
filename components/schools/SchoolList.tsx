import styled from "@emotion/styled";
import { DisciplinesResponse, SchoolPartialData } from "../../schema";
import DISPLAY_MODES from "./constants";
import SchoolGridItem from "./SchoolGridItem";
import SchoolListItem from "./SchoolListItem";
import SchoolThListItem from "./SchoolThListItem";

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const GridWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 -10px;
`;

interface SchoolListProps {
  mode: string;
  schools: SchoolPartialData[];
  disciplines: DisciplinesResponse;
}
const SchoolList = (props: SchoolListProps) => {
  const { mode, schools } = props;

  switch (mode) {
    case DISPLAY_MODES.grid:
      return (
        <GridWrapper>
          {schools.map((item: any, index: number) => (
            <SchoolGridItem
              key={index}
              mode={mode}
              school={item}
              disciplines={props.disciplines}
            />
          ))}
        </GridWrapper>
      );
    case DISPLAY_MODES.thMode:
      return (
        <ListWrapper>
          {schools.map((item: any, index: number) => (
            <SchoolThListItem
              key={index}
              mode={mode}
              school={item}
              disciplines={props.disciplines}
            />
          ))}
        </ListWrapper>
      );
    case DISPLAY_MODES.listMode:
      return (
        <ListWrapper>
          {schools.map((item: any, index: number) => (
            <SchoolListItem
              key={index}
              mode={mode}
              school={item}
              disciplines={props.disciplines}
            />
          ))}
        </ListWrapper>
      );
    default:
      return null;
  }
};

export default SchoolList;
