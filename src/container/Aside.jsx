import React, { Component } from 'react';
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

export default class Aside extends Component {
  render() {
    const {
      center,
      hasExpanded,
      getPlaceList,
      onSubmit,
      onChange,
      keyword,
      searchValue,
    } = this.props;
    return (
      <AsideContainer hasExpanded={hasExpanded}>
        <Places
          center={center}
          onChange={onChange}
          onSubmit={onSubmit}
          keyword={keyword}
          value={searchValue}
          getPlaceList={getPlaceList}
        />
      </AsideContainer>
    );
  }
}
