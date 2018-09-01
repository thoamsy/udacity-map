import React, { Component, Placeholder, Fragment } from 'react';
import { createResource } from 'simple-cache-provider';

import { getCurrentPosition } from './utils/geo';
import Map from './components/Map';
import Spinner from './components/Spinner';
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
  };
  async componentDidMount() {
    try {
      const { coords } = await getCurrentPosition();
      this.setState({
        center: {
          lat: coords.latitude,
          lng: coords.longitude,
        },
      });
    } catch (err) {
      console.log('hhh');
    }
  }

  render() {
    const { center } = this.state;
    return (
      <Fragment>
        <Placeholder fallback={<Spinner size="large" />}>
          <SkrLoader />
        </Placeholder>
        {typeof center.lat === 'number' && <Map center={this.state.center} />}
      </Fragment>
    );
  }
}

export default App;
