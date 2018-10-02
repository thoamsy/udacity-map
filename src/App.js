import React, { Component } from 'react';
import { update } from 'lodash/fp';

import { getCurrentPosition } from './utils/geo';
import Aside from './container/Aside';
import Map from './components/Map';
import Navbar from './components/Navbar';

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
      <div className="columns container">
        <Navbar onClick={this.onBurgerClick} isOpen={hasExpanded}>
          <Aside center={center} className="section" />
        </Navbar>
        <main className="column is-8">{hasGeo && <Map center={center} />}</main>
      </div>
    );
  }
}

export default App;
