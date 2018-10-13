import React from 'react';
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
  InfoWindow,
  OverlayView,
} from 'react-google-maps';
import { withProps, compose, withStateHandlers, lifecycle } from 'recompose';
import { API_KEY } from '../constant';

const Map = ({
  center,
  mapCenter,
  zoom = 13,
  isOpen,
  onToggleOpen,
  locationOfMarkers = [],
  markerAnimation,
}) => (
  <GoogleMap
    bootstrapURLKeys={{ key: API_KEY }}
    defaultZoom={13}
    zoom={zoom}
    center={mapCenter ?? center}
  >
    {locationOfMarkers.map(({ geometry, id, name }, i) => (
      <Marker
        position={geometry.location}
        onClick={onToggleOpen}
        key={id}
        animation={markerAnimation[i] ?? google.maps.Animation.DROP}
        title={name}
      >
        {isOpen && (
          <InfoWindow onCloseClick={onToggleOpen}>
            <OverlayView
              position={geometry.location}
              mapPaneName={OverlayView.OVERLAY_LAYER}
              getPixelPositionOffset={(width, height) => ({
                x: -(width / 2),
                y: -(height / 2),
              })}
            >
              <div
                style={{
                  background: 'red',
                  color: 'white',
                  padding: 5,
                  borderRadius: '50%',
                }}
              >
                OverlayView
              </div>
            </OverlayView>
          </InfoWindow>
        )}
      </Marker>
    ))}
  </GoogleMap>
);

export default compose(
  lifecycle({
    componentDidUpdate(prevProps) {
      if (this.props.center !== prevProps.center) {
        console.log(111);
        this.props.clearMapCenter();
      }
    },
  }),
  withStateHandlers(
    props => ({
      isOpen: false,
      markerAnimation: [],
    }),
    {
      onToggleOpen: ({ isOpen }) => () => {
        return { isOpen: !isOpen };
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
