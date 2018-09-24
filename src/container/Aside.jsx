import React, { Component } from 'react';

import Places from '../components/PlaceList';

export default class Aside extends Component {
  state = {
    searchValue: '',
    keyword: '',
  };

  onSubmit = event => {
    event.preventDefault();
    this.setState({
      keyword: this.state.searchValue,
    });
  };
  onChange = ({ target }) => {
    this.setState({
      searchValue: target.value,
    });
  };

  render() {
    const { center, className } = this.props;
    return (
      <Places
        center={center}
        className={className}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        keyword={this.state.keyword}
        value={this.state.searchValue}
      />
    );
  }
}
