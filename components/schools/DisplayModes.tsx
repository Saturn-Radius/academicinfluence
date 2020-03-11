import styled from "@emotion/styled";
import { faBars, faTh, faThList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DISPLAY_MODES from "./constants";

const Wrapper = styled.div`
  flex: 1;
  height: 39px;
  display: flex;
  align-items: center;
`;

interface ModeIconProps {
  isactive: boolean;
}
const ModeIcon = styled(FontAwesomeIcon)<ModeIconProps>`
  width: 17px;
  height: 17px;
  margin-right: 5px;
  color: ${props => (props.isactive ? "black" : "gray")};
`;

interface ModeButtonProps {
  readonly isactive: boolean;
  readonly mode: string;
  readonly onModeSelect: any;
}
const ModeButton = (props: ModeButtonProps) => {
  const { isactive, mode, onModeSelect } = props;
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
      isactive={isactive}
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
        isactive={mode === DISPLAY_MODES.grid}
        mode={DISPLAY_MODES.grid}
        onModeSelect={onModeSelectHandler}
      />
      <ModeButton
        isactive={mode === DISPLAY_MODES.thMode}
        mode={DISPLAY_MODES.thMode}
        onModeSelect={onModeSelectHandler}
      />
      <ModeButton
        isactive={mode === DISPLAY_MODES.listMode}
        mode={DISPLAY_MODES.listMode}
        onModeSelect={onModeSelectHandler}
      />
    </Wrapper>
  );
};

export default DisplayModes;
