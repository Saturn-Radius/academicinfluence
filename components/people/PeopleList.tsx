import styled from "@emotion/styled";
import { PersonPartialData } from "../../schema";
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
  people: PersonPartialData[];
}
const PeopleList = (props: PersonListProps) => {
  const { people } = props;

  return (
    <GridWrapper>
      {people.map((item, index) => (
        <PersonGridItem key={index} person={item} />
      ))}
    </GridWrapper>
  );
};

export default PeopleList;
