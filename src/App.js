import React, { Suspense, lazy, useState, useCallback } from 'react';
import styled from 'styled-components';

import Spinner from './components/Spinner';
import Navbar from './components/Navbar';
import useSearch from './hooks/reducer';
import MapContext from './container/MapContext';

const Aside = lazy(() => import('./container/Aside'));
const Notification = lazy(() => import('./components/Notification'));
const Map = lazy(() => import('./container/Map'));

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
    notification: '',
    beChoosedMarker: null,
  });

  const [hasExpanded, setExpanded] = useState(false);
  const toggleNavbar = useCallback(() => setExpanded(!hasExpanded), [
    hasExpanded,
  ]);

  return (
    // TODO: 每一次 value 都是全新的。
    <MapContext.Provider value={{ store, dispatch }}>
      <TransformContainer hasExpanded={hasExpanded}>
        <Suspense maxDuration={200} fallback={<Spinner />}>
          <Aside />
        </Suspense>
        <main>
          <Navbar hasExpanded={hasExpanded} toggleNavbar={toggleNavbar} />
          <Suspense fallback={<Spinner size="medium" />}>
            <Map />
          </Suspense>
        </main>
      </TransformContainer>
    </MapContext.Provider>
  );
};

export default App;
