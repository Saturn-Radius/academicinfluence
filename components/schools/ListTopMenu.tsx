import styled from "@emotion/styled";
import { Col } from "../grid";
import SchoolSearchBox from "./SchoolSearchBox";

const Wrapper = styled.div`
  width: 100%;
`;

const ListTopMenu = () => (
  <Wrapper>
    <SchoolSearchBox />
  </Wrapper>
);

export default ListTopMenu;
