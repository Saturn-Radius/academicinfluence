import styled from "@emotion/styled";
import { faBars, faTh, faThList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DISPLAY_MODES from "./constants";
import { GRAY } from "../../styles";

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
  readonly color: string;
  readonly mode: string;
  readonly onModeSelect: any;
}
const ModeButton = (props: ModeButtonProps) => {
  const { color, mode, onModeSelect } = props;
  let iconName = faBars;

  switch (mode) {
    case DISPLAY_MODES.grid:
      iconName = faTh;
      break;
    case DISPLAY_MODES.thMode:
      iconName = faThList;
      break;
    case DISPLAY_MODES.listMode:
      iconName = faBars;
      break;
    default:
      break;
  }

  const onModeSelectHandler = () => {
    onModeSelect(mode);
  };

  return (
    <ModeIcon
      color={color}
      icon={iconName}
      onClick={() => onModeSelectHandler()}
    />
  );
};

interface DisplayModesProps {
  readonly mode: string;
  readonly onMenuModeSelect: any;
}
const DisplayModes = (props: DisplayModesProps) => {
  const { mode, onMenuModeSelect } = props;

  const onModeSelectHandler = (mode: string) => {
    onMenuModeSelect(mode);
  };

  return (
    <Wrapper>
      <ModeButton
        color={mode === DISPLAY_MODES.grid ? "black" : "gray"}
        mode={DISPLAY_MODES.grid}
        onModeSelect={onModeSelectHandler}
      />
      <ModeButton
        color={mode === DISPLAY_MODES.thMode ? "black" : "gray"}
        mode={DISPLAY_MODES.thMode}
        onModeSelect={onModeSelectHandler}
      />
      <ModeButton
        color={mode === DISPLAY_MODES.listMode ? "black" : "gray"}
        mode={DISPLAY_MODES.listMode}
        onModeSelect={onModeSelectHandler}
      />
    </Wrapper>
  );
};

export default DisplayModes;
