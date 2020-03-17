import styled from "@emotion/styled";

const StyledLabel = styled.label`
  display: block;
  flex-grow: 1;
  margin-top: 10px;
`;

const StyledLabelText = styled.span`
  font-size: 20px;
  line-height: 28px;
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
