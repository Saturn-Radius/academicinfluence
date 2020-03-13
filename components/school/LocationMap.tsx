import styled from "@emotion/styled";
import { LatLng } from "../../schema";
import GoogleAPIWrapper from "../GoogleAPIWrapper";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  margin-top: 10px;
`;

const LocationMap = (props: { location: LatLng }) => {
  return (
    <Wrapper>
      <GoogleAPIWrapper location={props.location} />
    </Wrapper>
  );
};

export default LocationMap;
