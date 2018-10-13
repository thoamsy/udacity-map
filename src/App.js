import React, { Component, Placeholder } from 'react';
import styled from 'styled-components';
import memoize from 'memoize-one';
import { update, set, map, pick } from 'lodash/fp';

import { getCurrentPosition } from './utils/geo';
import Spinner from './components/Spinner';
import Aside from './container/Aside';
import Map from './components/Map';
import Navbar from './components/Navbar';
import Notification from './components/Notification';

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
    placelist: [],
    hasGeo: false,
    hasExpanded: false,
    notification: '',
  };

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
    if (!placelist?.length || this.state.placelist === placelist) return;
    this.setState(set(`placelist`, placelist));
  };

  pluckPosition = memoize(map(pick(['geometry.location', 'name', 'id'])));
  get locationOfMarkers() {
    return this.pluckPosition(this.state.placelist);
  }

  render() {
    const { center, hasGeo, hasExpanded, notification } = this.state;
    return (
      <TransformContainer hasExpanded={hasExpanded}>
        <Notification type="danger">{notification}</Notification>
        <Aside
          center={center}
          hasExpanded={hasExpanded}
          getPlacelist={this.getPlacelist}
        />
        <main>
          <Navbar onClick={this.onBurgerClick} isOpen={hasExpanded} />
          <Placeholder>
            {timeout =>
              !timeout && hasGeo ? (
                <Map
                  center={center}
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
