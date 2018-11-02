import React, { Suspense, lazy } from 'react';
import styled from 'styled-components';

import Spinner from './components/Spinner';
import Map from './container/Map';
import Navbar from './components/Navbar';
import useSearch from './hooks/reducer';
import MapContext from './container/MapContext';

const Aside = lazy(() => import('./container/Aside'));
const Notification = lazy(() => import('./components/Notification'));

const TransformContainer = styled.div.attrs({
  style: props => ({
    transform: `translateX(${props.hasExpanded ? '400px' : 0})`,
  }),
})`
  will-change: transform;
  transition: transform 0.3s ease-out;
`;

const App = () => {
  const [store, dispatch] = useSearch({
    center: {
      lat: 30.2775947,
      lng: 120.12117539999998,
    },
    placelist: {
      allIds: [],
      byId: {},
    },
    hasGeo: false,
    hasExpanded: false,
    notification: '',
    beChoosedMarker: null,
  });
  return (
    // TODO: 每一次 value 都是全新的。
    <MapContext.Provider value={{ store, dispatch }}>
      <TransformContainer hasExpanded={store.hasExpanded}>
        <Suspense maxDuration={200} fallback={<Spinner />}>
          <Aside />
        </Suspense>
        <main>
          <Navbar />
          <Suspense fallback={<Spinner size="medium" />}>
            <Map />
          </Suspense>
        </main>
      </TransformContainer>
    </MapContext.Provider>
  );
};

export default App;
