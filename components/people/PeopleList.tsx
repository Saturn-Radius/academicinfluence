import styled from "@emotion/styled";
import { PersonPartialData } from "../../schema";
import PersonListItem from "./PersonListItem";

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

interface PersonListProps {
  people: PersonPartialData[];
}
const PeopleList = (props: PersonListProps) => {
  const { people } = props;

  return (
    <ListWrapper>
      {people.map((item, index) => (
        <PersonListItem key={index} person={item} index={index} />
      ))}
    </ListWrapper>
  );
};

export default PeopleList;
