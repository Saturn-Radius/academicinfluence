import styled from "@emotion/styled";
import { GRAY } from "../../styles";

const StyledLabel = styled.label`
  display: block;
  flex-grow: 1;
  margin-top: 10px;
`;

const StyledLabelText = styled.span`
  font-size: 20px;
  line-height: 28px;
  color: ${GRAY};
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
