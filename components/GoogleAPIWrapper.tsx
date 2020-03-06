import { GoogleApiWrapper, Map, Marker } from "google-maps-react";

const MapContainer = (props: any) => {
  const { google } = props;

  return (
    <Map google={google} zoom={14} mapTypeControl={false}>
      <Marker />

      {/* <InfoWindow visible={true} /> */}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAP_KEY || ""
})(MapContainer);
