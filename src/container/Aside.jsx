import React, { PureComponent, createContext } from 'react';
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

export const SearchContext = createContext({
  searchValue: '',
  keyword: '',
});

export default class Aside extends PureComponent {
  onSubmit = event => {
    event.preventDefault();
    this.props.clearMapCenter();
    this.setState({
      keyword: this.state.searchValue,
    });
  };

  onChange = ({ target }) => {
    this.setState({
      searchValue: target.value,
    });
  };

  state = {
    searchValue: '',
    keyword: '',
    onChange: this.onChange,
    onSubmit: this.onSubmit,
    setErrorNotification: this.props.setErrorNotification,
  };

  render() {
    const { center, hasExpanded, getPlacelist, onClickPlace } = this.props;
    return (
      <SearchContext.Provider value={this.state}>
        <AsideContainer hasExpanded={hasExpanded}>
          <Places
            getPlacelist={getPlacelist}
            center={center}
            onClickPlace={onClickPlace}
          />
        </AsideContainer>
      </SearchContext.Provider>
    );
  }
}
