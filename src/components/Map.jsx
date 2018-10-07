import React from 'react';
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
  InfoWindow,
  OverlayView,
  StreetViewPanorama,
} from 'react-google-maps';
import { withProps, compose, withStateHandlers } from 'recompose';
import { API_KEY } from '../constant';

const Map = ({
  center = { lat: 59.95, lng: 30.33 },
  zoom = 13,
  isOpen,
  onToggleOpen,
  locationOfMarkers = [],
}) => (
  <div style={{ height: '100vh', width: '100%' }}>
    <GoogleMap
      bootstrapURLKeys={{ key: API_KEY }}
      defaultCenter={center}
      defaultZoom={zoom}
    >
      {locationOfMarkers.map(location => (
        <Marker
          position={location}
          onClick={onToggleOpen}
          key={location.lng + location.lat}
        >
          {isOpen && (
            <InfoWindow onCloseClick={onToggleOpen}>
              <StreetViewPanorama defualtProps={center} visible>
                <OverlayView
                  position={location}
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
              </StreetViewPanorama>
            </InfoWindow>
          )}
        </Marker>
      ))}
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
    loadingElement: <div style={{ height: '100%' }} />,
    mapElement: <div style={{ height: `100%` }} />,
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3`,
  }),
  withScriptjs,
  withGoogleMap
)(Map);
