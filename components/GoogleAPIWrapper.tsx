import { GoogleAPI, GoogleApiWrapper, Map, Marker } from "google-maps-react";
import { LatLng } from "../schema";

const MapContainer = (props: { google: GoogleAPI; location: LatLng }) => {
  const { google } = props;

  console.log("HEY", props.location);

  return (
    <Map
      google={google}
      zoom={14}
      mapTypeControl={false}
      initialCenter={props.location}
    >
      <Marker />

      {/* <InfoWindow visible={true} /> */}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAP_KEY || ""
})(MapContainer);
