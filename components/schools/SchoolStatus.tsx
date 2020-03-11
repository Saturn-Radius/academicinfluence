import styled from "@emotion/styled";
import CircularProgress from "../CircularProgress";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface SchoolStatusProps {
  graduationRate: number;
  acceptanceRate: number;
  size: number;
  fontSize: number;
}
const SchoolStatus = (props: SchoolStatusProps) => {
  const { graduationRate, acceptanceRate, size, fontSize } = props;

  return (
    <Wrapper>
      <CircularProgress
        percentage={graduationRate * 100}
        size={size}
        fontSize={fontSize}
        text="Graduation Rate"
      />
      <CircularProgress
        percentage={acceptanceRate * 100}
        size={size}
        fontSize={fontSize}
        text="Acceptance Rate"
      />
    </Wrapper>
  );
};

export default SchoolStatus;
