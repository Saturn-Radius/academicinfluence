import styled from "@emotion/styled";
import CircularProgress from "../CircularProgress";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface SchoolStatusProps {
  graduationRate: number;
  acceptanceRate: number;
}
const SchoolStatus = (props: SchoolStatusProps) => {
  const { graduationRate, acceptanceRate } = props;

  return (
    <Wrapper>
      <CircularProgress
        percentage={graduationRate * 100}
        size={95}
        text="Graduation Rate"
      />
      <CircularProgress
        percentage={acceptanceRate * 100}
        size={95}
        text="Acceptance Rate"
      />
    </Wrapper>
  );
};

export default SchoolStatus;
