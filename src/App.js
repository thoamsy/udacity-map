import React, { Suspense, lazy, useState, useCallback } from 'react';
import styled from 'styled-components';

import Spinner from './components/Spinner';
import Navbar from './components/Navbar';
import useSearch from './hooks/reducer';
import { DispatchContext, StoreContext } from './container/SearchContext';

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
    center: null,
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
    <DispatchContext.Provider value={dispatch}>
      <StoreContext.Provider value={store}>
        <TransformContainer hasExpanded={hasExpanded}>
          <Suspense maxDuration={200} fallback={<Spinner />}>
            {/* 如果是 ConcurrentMode，可以使用 hidden */}
            <Aside show={hasExpanded} />
          </Suspense>
          <main>
            <Navbar hasExpanded={hasExpanded} toggleNavbar={toggleNavbar} />
            <Suspense fallback={<Spinner size="medium" />}>
              <Map />
            </Suspense>
          </main>
        </TransformContainer>
      </StoreContext.Provider>
    </DispatchContext.Provider>
  );
};

export default App;
