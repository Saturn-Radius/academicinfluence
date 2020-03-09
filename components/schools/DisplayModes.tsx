import React from "react";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faThList } from "@fortawesome/free-solid-svg-icons";
import DISPLAY_MODES from "./constants";

const Wrapper = styled.div`
  flex: 1;
  height: 39px;
  display: flex;
  align-items: center;
`;

const ModeIcon = styled(FontAwesomeIcon)`
  width: 17px;
  height: 17px;
  margin-right: 5px;
`;

interface ModeButtonProps {
  readonly mode: string;
  readonly onModeSelect: any;
}
const ModeButton = (props: ModeButtonProps) => {
  const { mode, onModeSelect } = props;
  let iconName = faBars;

  switch (mode) {
    case DISPLAY_MODES.listMode:
      iconName = faBars;
      break;
    case DISPLAY_MODES.thMode:
      iconName = faThList;
      break;
    default:
      break;
  }

  const onModeSelectHandler = () => {
    onModeSelect(mode);
  };

  return <ModeIcon icon={iconName} onClick={() => onModeSelectHandler()} />;
};

interface DisplayModesProps {
  readonly onMenuModeSelect: any;
}
const DisplayModes = (props: DisplayModesProps) => {
  const { onMenuModeSelect } = props;

  const onModeSelectHandler = (mode: string) => {
    onMenuModeSelect(mode);
  };

  return (
    <Wrapper>
      <ModeButton
        mode={DISPLAY_MODES.listMode}
        onModeSelect={onModeSelectHandler}
      />
      <ModeButton
        mode={DISPLAY_MODES.thMode}
        onModeSelect={onModeSelectHandler}
      />
    </Wrapper>
  );
};

export default DisplayModes;
