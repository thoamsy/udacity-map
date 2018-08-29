import React from 'react';
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
} from 'react-google-maps';
import { withProps, compose } from 'recompose';

const API_KEY = 'AIzaSyCoJc7_HdAr12c7DDQ1VRqdPWbFsJDJuww';

const Map = ({ center = { lat: 59.95, lng: 30.33 }, zoom = 13 }) => (
  <div style={{ height: '100vh', width: '100%' }}>
    <GoogleMap
      bootstrapURLKeys={{ key: API_KEY }}
      defaultCenter={center}
      defaultZoom={zoom}
    >
      <Marker position={{ lat: 58.34, lng: 32.1 }} />
    </GoogleMap>
  </div>
);

export default compose(
  withProps({
    containerElement: <div style={{ height: '100vh', width: '100%' }} />,
    loadingElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3`,
  }),
  withScriptjs,
  withGoogleMap
)(Map);
