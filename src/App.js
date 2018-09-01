import React, { Component, Placeholder, Fragment } from 'react';
import { createResource } from 'simple-cache-provider';

import { getCurrentPosition } from './utils/geo';
import { getLocationWithLatLng } from './api/geocode';
import Map from './components/Map';
import Spinner from './components/Spinner';
import { cache } from './cache';

const SkrResource = createResource(() => import('./components/Skr'));
const SkrLoader = () => {
  const Skr = SkrResource.read(cache).default;
  return <Skr />;
};

const locationResource = createResource(
  getLocationWithLatLng,
  ({ lng, lat }) => `${lat}${lng}`
);

const getLocation = center => locationResource.read(cache, center);

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
    const result = await getLocationWithLatLng(center);
    console.log(result);
  }

  render() {
    const { center, hasGeo } = this.state;
    return (
      <Fragment>
        <Placeholder fallback={<Spinner size="large" />}>
          <SkrLoader />
        </Placeholder>
        {hasGeo && <Map center={center} />}
      </Fragment>
    );
  }
}

export default App;
