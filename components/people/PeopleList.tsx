import styled from "@emotion/styled";
import { PersonPartialData } from "../../schema";
import DISPLAY_MODES from "../schools/constants";
import PersonGridItem from "./PersonGridItem";
//import PersonListItem from "./PersonListItem";
//import PersonThListItem from "./PersonThListItem";

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

interface PersonListProps {
  mode: string;
  people: PersonPartialData[];
}
const PeopleList = (props: PersonListProps) => {
  const { mode, people } = props;

  switch (mode) {
    case DISPLAY_MODES.grid:
      return (
        <GridWrapper>
          {people.map((item, index) => (
            <PersonGridItem key={index} mode={mode} person={item} />
          ))}
        </GridWrapper>
      );
    /*
    case DISPLAY_MODES.thMode:
      return (
        <ListWrapper>
          {people.map((item, index) => (
            <PersonThListItem key={index} mode={mode} person={item} />
          ))}
        </ListWrapper>
      );
    case DISPLAY_MODES.listMode:
      return (
        <ListWrapper>
          {schools.map((item, index) => (
            <PersonListItem key={index} mode={mode} school={item} />
          ))}
        </ListWrapper>
      );*/
    default:
      return null;
  }
};

export default PeopleList;
