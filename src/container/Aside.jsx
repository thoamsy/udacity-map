import React, { Component, Placeholder } from 'react';

import PlaceList from '../components/PlaceList';
import Spinner from '../components/Spinner';

export default class Aside extends Component {
  render() {
    const { center } = this.props;
    return (
      <>
        <Placeholder fallback={<Spinner />}>
          <PlaceList center={center} />
        </Placeholder>
        {/* {hasGeo && <Map center={center} />} */}
      </>
    );
  }
}
