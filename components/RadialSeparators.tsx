import { InterpolationWithTheme } from "@emotion/core";
import styled from "@emotion/styled";
import _ from "lodash";

interface WrapperProps {
  turns: number;
}
const Wrapper = styled.div<WrapperProps>`
  position: absolute;
  height: 100%;
  transform: ${props => `rotate(${props.turns}turn)`};
`;

interface SeparatorProps {
  turns: number;
  style: InterpolationWithTheme<any>;
}
const Separator = (props: SeparatorProps) => {
  return (
    <Wrapper turns={props.turns}>
      <div css={props.style} />
    </Wrapper>
  );
};

interface RadialSeparatorsProps {
  count: number;
  style: InterpolationWithTheme<any>;
}
const RadialSeparators = (props: RadialSeparatorsProps) => {
  const turns = 1 / props.count;
  return (
    <>
      {_.range(props.count).map(index => (
        <Separator key={index} turns={index * turns} style={props.style} />
      ))}
    </>
  );
};

export default RadialSeparators;
