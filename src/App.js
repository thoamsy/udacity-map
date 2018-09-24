import React, { Component } from 'react';

import { getCurrentPosition } from './utils/geo';
import Aside from './container/Aside';

class App extends Component {
  state = {
    center: {
      lat: '',
      lng: '',
    },
    hasGeo: false,
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
    const { center, hasGeo } = this.state;
    return (
      <>
        <Aside center={center} />
      </>
    );
  }
}

export default App;
