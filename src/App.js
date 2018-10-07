import React, { Component } from 'react';
import styled from 'styled-components';
import { update, set, map } from 'lodash/fp';

import { getCurrentPosition } from './utils/geo';
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

  get locationOfMakers() {
    const a = map('geometry.location', this.state.placelist);
    console.log(a);
    return a;
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
          {hasGeo && (
            <Map center={center} locationOfMakers={this.locationOfMakers} />
          )}
        </main>
      </TransformContainer>
    );
  }
}

export default App;
