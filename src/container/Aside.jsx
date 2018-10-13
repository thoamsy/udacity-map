import React, { PureComponent } from 'react';
import styled from 'styled-components';

import Places from '../components/PlaceList';

const AsideContainer = styled.section`
  width: 400px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: 20;
  transform: translateX(-100%);
`;

export default class Aside extends PureComponent {
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
    const { center, hasExpanded, getPlacelist, onClickPlace } = this.props;
    return (
      <AsideContainer hasExpanded={hasExpanded}>
        <Places
          getPlacelist={getPlacelist}
          center={center}
          onClickPlace={onClickPlace}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          keyword={this.state.keyword}
          value={this.state.searchValue}
        />
      </AsideContainer>
    );
  }
}
