import styled from "@emotion/styled";
import { useState } from "react";
import Country from "./Country";
import Discipline from "./Discipline";
import DisplayModes from "./DisplayModes";
import SchoolSearchBox from "./SchoolSearchBox";
import YearsFilter from "./YearsFilter";

const MenuRow = styled.div`
  display: flex;
  width: 100%;
  min-height: 40px;
`;

const AdvancedSearch = styled.div`
  width: 100%;
`;

const ListTopMenu = (props: any) => {
  const { onDisplayModeSelect } = props;
  const [isAdvancedMode, setIsAdvanced] = useState(false);

  const onSearchModeHandler = (isAdvanced: boolean) => {
    setIsAdvanced(isAdvanced);
  };

  const onMenuModeSelectHandler = (menuMode: string) => {
    onDisplayModeSelect(menuMode);
  };

  return (
    <>
      <MenuRow>
        <DisplayModes onMenuModeSelect={onMenuModeSelectHandler} />
        <SchoolSearchBox onAdvancedSearchClick={onSearchModeHandler} />
      </MenuRow>
      {isAdvancedMode && (
        <AdvancedSearch>
          <Discipline {...props} />
          <YearsFilter {...props} />
          <Country {...props} />
        </AdvancedSearch>
      )}
    </>
  );
};

export default ListTopMenu;
