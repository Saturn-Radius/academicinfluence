import styled from "@emotion/styled";
import Country from "../filter/Country";
import Discipline from "../filter/Discipline";
import YearsFilter from "../filter/YearsFilter";
import SchoolSearchBox from "./SchoolSearchBox";
import { FilterProps } from "./types";

const MenuRow = styled.div`
  display: flex;
  width: 100%;
  min-height: 40px;
  line-height: 40px;
`;

const AdvancedSearch = styled.div`
  width: 100%;
`;

const ListTopMenu = (props: FilterProps) => {
  return (
    <>
      <MenuRow>
        <div css={{ flexGrow: 1 }} />
        <SchoolSearchBox />
      </MenuRow>

      <AdvancedSearch>
        <Discipline {...props} />
        <YearsFilter {...props} minYear={1200} />
        <Country {...props} />
      </AdvancedSearch>
    </>
  );
};

export default ListTopMenu;
