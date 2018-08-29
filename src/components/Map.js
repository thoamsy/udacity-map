import React from 'react';
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
  InfoWindow,
} from 'react-google-maps';
import { withProps, compose, withStateHandlers } from 'recompose';

const API_KEY = 'AIzaSyCoJc7_HdAr12c7DDQ1VRqdPWbFsJDJuww';

const Map = ({
  center = { lat: 59.95, lng: 30.33 },
  zoom = 13,
  isOpen,
  onToggleOpen,
}) => (
  <div style={{ height: '100vh', width: '100%' }}>
    <GoogleMap
      bootstrapURLKeys={{ key: API_KEY }}
      defaultCenter={center}
      defaultZoom={zoom}
    >
      <Marker position={{ lat: 59.34, lng: 30.1 }} onClick={onToggleOpen}>
        {isOpen && (
          <InfoWindow onCloseClick={onToggleOpen}>
            <p>this is a thing</p>
          </InfoWindow>
        )}
      </Marker>
    </GoogleMap>
  </div>
);

export default compose(
  withStateHandlers(
    {
      isOpen: false,
    },
    {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen,
      }),
    }
  ),
  withProps({
    containerElement: <div style={{ height: '100vh', width: '100%' }} />,
    loadingElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3`,
  }),
  withScriptjs,
  withGoogleMap
)(Map);
