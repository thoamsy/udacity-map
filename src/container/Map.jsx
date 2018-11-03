import React, {
  Suspense,
  useEffect,
  useContext,
  useCallback,
  lazy,
  useMemo,
  useState,
} from 'react';
import { update, set, map, pick } from 'lodash/fp';
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
  InfoWindow,
} from 'react-google-maps';
import { withProps, compose, lifecycle } from 'recompose';

import { getCurrentPosition } from '../utils/geo';
import { API_KEY } from '../constant';
import Spinner from '../components/Spinner';
import MapContext from './MapContext';

const MarkerInfo = lazy(() => import('../components/MarkerInfo'));

const Map = ({ onToggleOpen }) => {
  const { dispatch, store } = useContext(MapContext);

  const {
    zoom,
    center,
    beChoosedMarker,
    placelist: { allIds, byId },
  } = store;

  useEffect(async () => {
    const { coords } = await getCurrentPosition();
    const center = {
      lat: coords.latitude,
      lng: coords.longitude,
    };
    dispatch({
      type: 'setCenter',
      payload: center,
    });
  }, []);

  const locationOfMarkers = useMemo(
    () => map(pick(['geometry.location', 'name', 'id', 'vicinity']))(byId),
    [allIds]
  );

  const [openStatus, setStatus] = useState({});
  const onToggleMarker = id => () => {
    if (!id) return;
    return setStatus(update(id, x => !x, openStatus));
  };

  const closeMarker = id => () => {
    if (!id) return;
    return setStatus(set(id, false, openStatus));
  };

  return (
    <GoogleMap
      bootstrapURLKeys={{ key: API_KEY }}
      zoom={zoom}
      center={beChoosedMarker?.geometry?.location ?? center}
    >
      {locationOfMarkers.map(({ geometry, id, name, vicinity }, i) => (
        <Marker
          position={geometry.location}
          onClick={onToggleMarker(id)}
          key={id}
          animation={google.maps.Animation.DROP}
          title={name}
        >
          {openStatus[id] && (
            <InfoWindow onCloseClick={onToggleMarker(id)}>
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
};

export default compose(
  lifecycle({
    // TODO: rewrite
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
