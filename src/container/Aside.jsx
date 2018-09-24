import React, { Component } from 'react';

import Places from '../components/PlaceList';

export default class Aside extends Component {
  render() {
    const { center, className } = this.props;
    return <Places center={center} className={className} />;
  }
}
