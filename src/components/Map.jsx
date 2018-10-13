import React, { Placeholder } from 'react';
import { update } from 'lodash/fp';
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
  InfoWindow,
} from 'react-google-maps';
import { withProps, compose, withStateHandlers } from 'recompose';
import Spinner from './Spinner';

import { API_KEY } from '../constant';
import weather from '../api/weather';
import { createResource } from '../cache';

const weatherResouce = createResource(
  weather,
  ({ lng, lat }) => '' + lng + lat
);

const MarkInfo = ({ center }) => {
  const weather = weatherResouce.read(center);
  return (
    <div>
      <p>{weather.daily.summary}</p>
    </div>
  );
};
const Map = ({
  center,
  mapCenter,
  zoom = 12,
  openStatus,
  onToggleOpen,
  locationOfMarkers = [],
  markerAnimation,
}) => (
  <GoogleMap
    bootstrapURLKeys={{ key: API_KEY }}
    zoom={zoom}
    center={mapCenter ?? center}
  >
    {locationOfMarkers.map(({ geometry, id, name }, i) => (
      <Marker
        position={geometry.location}
        onClick={() => onToggleOpen(id)}
        key={id}
        animation={markerAnimation[i] ?? google.maps.Animation.DROP}
        title={name}
      >
        {openStatus[id] && (
          <InfoWindow onCloseClick={() => onToggleOpen(id)}>
            <Placeholder delayMs={300} fallback={<Spinner size="small" />}>
              <MarkInfo center={geometry.location} />
            </Placeholder>
          </InfoWindow>
        )}
      </Marker>
    ))}
  </GoogleMap>
);

export default compose(
  withStateHandlers(
    {
      openStatus: {},
      markerAnimation: {},
    },
    {
      onToggleOpen: state => id => {
        return update(`openStatus.${id}`, x => !x, state);
      },
    }
  ),
  withProps({
    containerElement: <div style={{ height: '100vh', width: '100%' }} />,
    loadingElement: <div style={{ height: '100%' }} />,
    mapElement: <div style={{ height: `100%` }} />,
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp`,
  }),
  withScriptjs,
  withGoogleMap
)(Map);
