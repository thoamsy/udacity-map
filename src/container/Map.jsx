import React, { unstable_Suspense as Suspense } from 'react';
import { update, set } from 'lodash/fp';
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
  InfoWindow,
} from 'react-google-maps';
import { withProps, compose, withStateHandlers, lifecycle } from 'recompose';

import { API_KEY } from '../constant';
import Spinner from '../components/Spinner';
import MarkerInfo from '../components/MarkerInfo';

const Map = ({
  center,
  zoom = 12,
  openStatus,
  onToggleOpen,
  locationOfMarkers = [],
  markerAnimation,
  beChoosedMarker,
}) => (
  <GoogleMap
    bootstrapURLKeys={{ key: API_KEY }}
    zoom={zoom}
    center={beChoosedMarker?.geometry?.location ?? center}
  >
    {locationOfMarkers.map(({ geometry, id, name, vicinity }, i) => (
      <Marker
        position={geometry.location}
        onClick={() => onToggleOpen(id)}
        key={id}
        animation={markerAnimation[i] ?? google.maps.Animation.DROP}
        title={name}
      >
        {openStatus[id] && (
          <InfoWindow onCloseClick={() => onToggleOpen(id)}>
            <Suspense maxDuration={300} fallback={<Spinner size="small" />}>
              <MarkerInfo
                center={geometry.location}
                vicinity={vicinity}
                name={name}
              />
            </Suspense>
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
        if (!id) return;
        return update(`openStatus.${id}`, x => !x, state);
      },
      closeMarker: state => id => {
        if (!id) return;
        return set(`openStatus.${id}`, false, state);
      },
    }
  ),
  lifecycle({
    componentDidUpdate(prevProps) {
      const { beChoosedMarker, onToggleOpen, closeMarker } = this.props;
      if (beChoosedMarker !== prevProps.beChoosedMarker) {
        onToggleOpen(beChoosedMarker?.id);
        closeMarker(prevProps.beChoosedMarker?.id);
      }
    },
  }),
  withProps({
    containerElement: <div style={{ height: '100vh', width: '100%' }} />,
    loadingElement: <div />,
    mapElement: <div style={{ height: '100%' }} />,
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp`,
  }),
  withScriptjs,
  withGoogleMap
)(Map);
