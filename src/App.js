import React, { Component, Placeholder } from 'react';
import { createResource } from 'simple-cache-provider';

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
      <Placeholder fallback={<Spinner size="large" />}>
        <SkrLoader />
      </Placeholder>
    );
  }
}

export default App;
