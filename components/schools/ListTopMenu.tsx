import { useState } from "react";
import styled from "@emotion/styled";
import { Col } from "../grid";
import SchoolSearchBox from "./SchoolSearchBox";
import Discipline from "./Discipline";
import YearsFilter from "./YearsFilter";
import Country from "./Country";

const Wrapper = styled.div`
  min-width: 100%;
  min-height: 40px;
`;

const ListTopMenu = (props: any) => {
  const [isAdvancedMode, setIsAdvanced] = useState(false);

  const onSearchModeHandler = (isAdvanced: boolean) => {
    setIsAdvanced(isAdvanced);
  };

  return (
    <Wrapper>
      <SchoolSearchBox onAdvancedSearchClick={onSearchModeHandler} />
      {isAdvancedMode && (
        <>
          <Discipline {...props} />
          <YearsFilter {...props} />
          <Country {...props} />
        </>
      )}
    </Wrapper>
  );
};

export default ListTopMenu;
