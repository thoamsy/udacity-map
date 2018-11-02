import React, { Component, Suspense, lazy } from 'react';
import styled from 'styled-components';
import memoize from 'memoize-one';
import { update, set, map, pick, zipObject } from 'lodash/fp';

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

const Main = ({ children }) => {
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
    <MapContext.Provider value={{ store, dispatch }}>
      {children}
    </MapContext.Provider>
  );
};

class App extends Component {
  getPlacelist = placelist => {
    if (!placelist?.length || placelist === this.prevPlacelist) return;
    const allIds = map('id', placelist);
    this.setState(set('placelist.allIds', allIds));
    this.setState(set('placelist.byId', zipObject(allIds, placelist)));
    this.prevPlacelist = placelist;
  };

  placelistSelector = memoize(allIds => {
    const pluckPosition = map(
      pick(['geometry.location', 'name', 'id', 'vicinity'])
    );
    const placelist = allIds.reduce((placelist, id) => {
      placelist[id] = this.state.placelist.byId[id];
      return placelist;
    }, {});
    return pluckPosition(placelist);
  });

  get locationOfMarkers() {
    return this.placelistSelector(this.state.placelist.allIds);
  }

  onClickPlace = id => () => {
    this.setState({
      beChoosedMarker: this.state.placelist.byId[id],
      zoom: 15,
    });
  };

  clearMapCenter = () => {
    this.setState({
      beChoosedMarker: null,
      zoom: 13,
    });
  };

  render() {
    return (
      <Main>
        <TransformContainer>
          <Suspense maxDuration={200} fallback={<Spinner />}>
            <Aside
              onClickPlace={this.onClickPlace}
              getPlacelist={this.getPlacelist}
              clearMapCenter={this.clearMapCenter}
              setErrorNotification={this.setErrorNotification}
            />
          </Suspense>
          <main>
            <Navbar />
            <Suspense fallback={<Spinner size="medium" />}>
              <Map />
            </Suspense>
          </main>
        </TransformContainer>
      </Main>
    );
  }
}

export default App;
