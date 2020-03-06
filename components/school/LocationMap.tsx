import styled from "@emotion/styled";
import GoogleAPIWrapper from "../GoogleAPIWrapper";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  margin-top: 10px;
`;

const LocationMap = (props: any) => {
  return (
    <Wrapper>
      <GoogleAPIWrapper />
    </Wrapper>
  );
};

export default LocationMap;
