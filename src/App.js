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
    placeListMap: {},
    hasGeo: false,
    hasExpanded: false,
    notification: '',
    searchValue: '',
    keyword: '',
  };

  onSubmit = event => {
    event.preventDefault();
    this.setState({
      keyword: this.state.searchValue,
    });
  };

  onChange = ({ target }) => {
    this.setState({
      searchValue: target.value,
    });
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

  getPlaceList = placelist => {
    const { keyword, placeListMap } = this.state;
    if (placeListMap[keyword] || !placelist?.length) return;
    this.setState(set(`placeListMap.${keyword}`, placelist));
  };

  get locationOfMarkers() {
    return map(
      'geometry.location',
      this.state.placeListMap[this.state.keyword]
    );
  }

  render() {
    const {
      center,
      hasGeo,
      hasExpanded,
      notification,
      searchValue,
      keyword,
    } = this.state;
    return (
      <TransformContainer hasExpanded={hasExpanded}>
        <Notification type="danger">{notification}</Notification>
        <Aside
          center={center}
          hasExpanded={hasExpanded}
          getPlaceList={this.getPlaceList}
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          onBurgerClick={this.onBurgerClick}
          searchValue={searchValue}
          keyword={keyword}
        />
        <main>
          <Navbar onClick={this.onBurgerClick} isOpen={hasExpanded} />
          {hasGeo && <Map center={center} />}
        </main>
      </TransformContainer>
    );
  }
}

export default App;
