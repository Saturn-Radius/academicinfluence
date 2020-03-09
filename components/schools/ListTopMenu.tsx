import styled from "@emotion/styled";
import SchoolSearchBox from "./SchoolSearchBox";

const Wrapper = styled.div`
  min-width: 100%;
  min-height: 40px;
`;

const ListTopMenu = () => (
  <Wrapper>
    <SchoolSearchBox />
  </Wrapper>
);

export default ListTopMenu;
