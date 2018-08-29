import React from 'react';
import GoogleMap from 'google-map-react';

const API_KEY = 'AIzaSyCoJc7_HdAr12c7DDQ1VRqdPWbFsJDJuww';

const Any = ({ text }) => <div>{text}</div>;
const Map = ({ center = { lat: 59.95, lng: 30.33 }, zoom = 13 }) => (
  <div style={{ height: '100vh', width: '100%' }}>
    <GoogleMap
      bootstrapURLKeys={{ key: API_KEY }}
      defaultCenter={center}
      defaultZoom={zoom}
    >
      <Any lat={59.95541} lng={30.337844} text="skr" />
    </GoogleMap>
  </div>
);

export default Map;
