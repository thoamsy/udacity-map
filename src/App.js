import React, { Component, Suspense, lazy, createContext } from 'react';
import styled from 'styled-components';
import memoize from 'memoize-one';
import { update, set, map, pick, zipObject } from 'lodash/fp';

import { getCurrentPosition } from './utils/geo';
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
  const [state, dispatch] = useSearch({
    center: {
      lat: '',
      lng: '',
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
    <MapContext.Provider value={{ state, dispatch }}>
      {children}
    </MapContext.Provider>
  );
};

class App extends Component {
  onBurgerClick = () => {
    this.setState(update('hasExpanded', x => !x));
  };

  setErrorNotification = error => {
    if (error === this.state.notification) {
      return;
    }
    this.setState(
      {
        notification: error,
      },
      () => {
        setTimeout(() => {
          this.setState({
            notification: null,
          });
        }, 3000);
      }
    );
  };

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
    const { center, hasGeo, hasExpanded, notification, beChoosedMarker, zoom } =
      this.state ?? {};
    return (
      <Main>
        <TransformContainer hasExpanded={hasExpanded}>
          {/* <Suspense maxDuration={200} fallback={<Spinner />}>
            <Aside
              onClickPlace={this.onClickPlace}
              center={center}
              hasExpanded={hasExpanded}
              getPlacelist={this.getPlacelist}
              clearMapCenter={this.clearMapCenter}
              setErrorNotification={this.setErrorNotification}
            />
          </Suspense> */}
          <main>
            <Navbar onClick={this.onBurgerClick} isOpen={hasExpanded} />
            <Suspense fallback={<Spinner size="medium" />}>
              <Map
                center={center}
                zoom={zoom}
                beChoosedMarker={beChoosedMarker}
                // locationOfMarkers={this.locationOfMarkers}
              />
            </Suspense>
          </main>
        </TransformContainer>
      </Main>
    );
  }
}

export default App;
