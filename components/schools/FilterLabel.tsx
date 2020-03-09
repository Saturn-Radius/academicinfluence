import styled from "@emotion/styled";
import { GRAY_MID } from "../../styles";

const StyledLabel = styled.label`
  display: block;
  flex-grow: 1;
  margin-top: 10px;
`;

const StyledLabelText = styled.span`
  font-size: 20px;
  line-height: 28px;
  color: ${GRAY_MID};
`;

type FilterLabelProps = {
  label: string;
  children: React.ReactNode;
};

const FilterLabel = (props: FilterLabelProps) => {
  return (
    <StyledLabel>
      <StyledLabelText>{props.label}</StyledLabelText>
      {props.children}
    </StyledLabel>
  );
};

export default FilterLabel;
