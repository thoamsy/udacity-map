import React, { Component, Placeholder, lazy } from 'react';
import styled from 'styled-components';
import memoize from 'memoize-one';
import { update, set, map, pick, zipObject } from 'lodash/fp';

import { getCurrentPosition } from './utils/geo';
import Spinner from './components/Spinner';
import Map from './container/Map';
import Navbar from './components/Navbar';

console.log(React);
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

class App extends Component {
  state = {
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
  };

  static getDerivedStateFromError(error) {
    return {
      error,
    };
  }

  onBurgerClick = () => {
    this.setState(update('hasExpanded', x => !x));
  };

  async componentDidMount() {
    const { coords } = await getCurrentPosition();
    const center = {
      lat: coords.latitude,
      lng: coords.longitude,
    };
    this.setState({
      center,
      hasGeo: true,
    });
  }

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
    const {
      center,
      hasGeo,
      hasExpanded,
      notification,
      beChoosedMarker,
      zoom,
    } = this.state;
    return (
      <TransformContainer hasExpanded={hasExpanded}>
        <Placeholder>
          <Notification type="danger">{notification}</Notification>
        </Placeholder>
        <Placeholder delayMs={200} fallback={<Spinner />}>
          <Aside
            onClickPlace={this.onClickPlace}
            center={center}
            hasExpanded={hasExpanded}
            getPlacelist={this.getPlacelist}
            clearMapCenter={this.clearMapCenter}
          />
        </Placeholder>
        <main>
          <Navbar onClick={this.onBurgerClick} isOpen={hasExpanded} />
          <Placeholder>
            {timeout =>
              !timeout && hasGeo ? (
                <Map
                  center={center}
                  zoom={zoom}
                  beChoosedMarker={beChoosedMarker}
                  locationOfMarkers={this.locationOfMarkers}
                />
              ) : (
                <Spinner size="medium" />
              )
            }
          </Placeholder>
        </main>
      </TransformContainer>
    );
  }
}

export default App;
