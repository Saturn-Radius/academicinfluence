import React from "react";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faThList } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  flex: 1;
  height: 39px;
  display: flex;
  align-items: center;
`;

const ModeIcon = styled(FontAwesomeIcon)`
  width: 17px;
  height: 17px;
`;

const DisplayModes = () => {
  return (
    <Wrapper>
      <ModeIcon icon={faBars} />
    </Wrapper>
  );
};

export default DisplayModes;
