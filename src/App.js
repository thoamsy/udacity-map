import React, { Component, Placeholder, Fragment } from 'react';
import { createResource } from 'simple-cache-provider';
import Map from './components/Map';

import Spinner from './components/Spinner';
import { cache } from './cache';

const SkrResource = createResource(() => import('./components/Skr'));

const SkrLoader = () => {
  const Skr = SkrResource.read(cache).default;
  return <Skr />;
};

class App extends Component {
  render() {
    return (
      <Fragment>
        <Placeholder fallback={<Spinner size="large" />}>
          <SkrLoader />
        </Placeholder>
        <Map />
      </Fragment>
    );
  }
}

export default App;
