import React, {
  Suspense,
  useEffect,
  useContext,
  useRef,
  lazy,
  useMemo,
  useState,
} from 'react';
import { update, map, pick } from 'lodash/fp';
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
  InfoWindow,
} from 'react-google-maps';
import { withProps, compose } from 'recompose';

import { getCurrentPosition } from '../utils/geo';
import { API_KEY } from '../constant';
import Spinner from '../components/Spinner';
import { DispatchContext, StoreContext } from './SearchContext';

const MarkerInfo = lazy(() => import('../components/MarkerInfo'));

const bootstrapURLKeys = {
  key: API_KEY,
};
const Map = () => {
  const dispatch = useContext(DispatchContext);
  const store = useContext(StoreContext);

  const {
    zoom,
    center,
    beChoosedMarker,
    placelist: { allIds, byId },
  } = store;

  useEffect(async () => {
    const { coords } = await getCurrentPosition();
    const payload = {
      lat: coords.latitude,
      lng: coords.longitude,
    };
    dispatch({
      type: 'setCenter',
      payload,
    });
  }, []);

  if (!center) return null;
  const locationOfMarkers = useMemo(
    () => map(pick(['geometry.location', 'name', 'id', 'vicinity']))(byId),
    [allIds]
  );

  const [openStatus, setStatus] = useState({});
  const onToggleMarker = id => {
    if (!id) return;
    return setStatus(update(id, x => !x, openStatus));
  };

  const markerRef = useRef();

  useEffect(
    () => {
      setStatus({}); // 清除之前的
      onToggleMarker(beChoosedMarker?.id);
      markerRef.current = beChoosedMarker;
    },
    [beChoosedMarker]
  );
  return (
    <GoogleMap
      bootstrapURLKeys={bootstrapURLKeys}
      zoom={zoom ?? 11}
      center={beChoosedMarker?.geometry?.location ?? center}
    >
      {locationOfMarkers.map(({ geometry, id, name, vicinity }) => (
        <Marker
          position={geometry.location}
          onClick={() => onToggleMarker(id)}
          key={id}
          animation={google.maps.Animation.DROP}
          title={name}
        >
          {openStatus[id] && (
            <InfoWindow onCloseClick={() => onToggleMarker(id)}>
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
  withProps({
    containerElement: <div style={{ height: '868px', width: '100%' }} />,
    loadingElement: <div />,
    mapElement: <div style={{ height: '100%' }} />,
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp`,
  }),
  withScriptjs,
  withGoogleMap
)(Map);
