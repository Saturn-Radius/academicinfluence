import styled from "@emotion/styled";
import Country from "../filter/Country";
import Discipline from "../filter/Discipline";
import YearsFilter from "../filter/YearsFilter";
import DisplayModes from "./DisplayModes";
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

const ListTopMenu = (
  props: {
    mode: string;
    onDisplayModeSelect: (mode: string) => void;
  } & FilterProps
) => {
  const { mode, onDisplayModeSelect } = props;

  const onMenuModeSelectHandler = (menuMode: string) => {
    onDisplayModeSelect(menuMode);
  };

  return (
    <>
      <MenuRow>
        <DisplayModes mode={mode} onMenuModeSelect={onMenuModeSelectHandler} />
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
