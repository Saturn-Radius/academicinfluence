import styled from "@emotion/styled";
import { SchoolPartialData } from "../../schema";
import SchoolListItem from "./SchoolListItem";

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

interface SchoolListProps {
  schools: SchoolPartialData[];
}
const SchoolList = (props: SchoolListProps) => {
  return (
    <ListWrapper>
      {props.schools.map((item, index) => (
        <SchoolListItem key={index} school={item} index={index} />
      ))}
    </ListWrapper>
  );
};

export default SchoolList;
