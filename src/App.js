import React, { Component } from 'react';

import { getCurrentPosition } from './utils/geo';
import Aside from './container/Aside';
import Map from './components/Map';

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
      <div className="columns container">
        <Aside center={center} className="column is-4 section" />
        <main className="column is-8">{hasGeo && <Map center={center} />}</main>
      </div>
    );
  }
}

export default App;
