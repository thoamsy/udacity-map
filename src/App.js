import React, { Component } from 'react';
import styled from 'styled-components';
import { update } from 'lodash/fp';

import { getCurrentPosition } from './utils/geo';
import Aside from './container/Aside';
import Map from './components/Map';
import Navbar from './components/Navbar';

const MainContainer = styled.main`
  transition: transform 0.5s ease-out;
  transform: ${({ hasExpanded }) => `translateX(${hasExpanded ? '400px' : 0})`};
`;

class App extends Component {
  state = {
    center: {
      lat: '',
      lng: '',
    },

    hasGeo: false,
    hasExpanded: false,
  };

  onBurgerClick = () => {
    console.log('skr');
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

  render() {
    const { center, hasGeo, hasExpanded } = this.state;
    return (
      <>
        <Aside center={center} className="section" hasExpanded={hasExpanded} />
        <MainContainer hasExpanded={hasExpanded}>
          <Navbar onClick={this.onBurgerClick} isOpen={hasExpanded} />
          {hasGeo && <Map center={center} />}
        </MainContainer>
      </>
    );
  }
}

export default App;
