import React, { Component, Placeholder, Fragment } from 'react';
import { createResource } from 'simple-cache-provider';

import { getCurrentPosition } from './utils/geo';
import Map from './components/Map';
import Spinner from './components/Spinner';
import Location from './components/Location';
import { cache } from './cache';

const SkrResource = createResource(() => import('./components/Skr'));
const SkrLoader = () => {
  const Skr = SkrResource.read(cache).default;
  return <Skr />;
};

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
      <Fragment>
        <Placeholder fallback={<Spinner size="large" />}>
          <SkrLoader />
        </Placeholder>
        <Placeholder fallback={<Spinner />}>
          <Location center={center} />
        </Placeholder>
        {hasGeo && <Map center={center} />}
      </Fragment>
    );
  }
}

export default App;
