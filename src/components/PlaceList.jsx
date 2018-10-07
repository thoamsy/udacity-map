import React, { Placeholder } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Search from './Search';
import { createResource } from '../cache';
import { getPlacesWithKeyword } from '../api/geocode';
import Spinner from './Spinner';

const nearbyResource = createResource(
  getPlacesWithKeyword,
  ({ lng, lat, keyword }) => lat + lng + keyword
);
const getNearby = (center, keyword) =>
  nearbyResource.read({ keyword, ...center });

const Place = styled.a.attrs({
  className: ({ isActive }) => (isActive ? 'is-active' : ''),
})`
  &&&:hover {
    background-color: #555;
  }
`;

const PlaceList = ({ active, center, keyword }) => {
  const res = getNearby(center, keyword);
  const places = res?.results || Array(20).fill('XXX');
  return (
    <ul className="menu-list">
      {places.map((place, i) => (
        <li key={place.id ?? i}>
          <Place
            isActive={active === (place.id ?? i)}
            className="has-text-light"
          >
            {place.name}
          </Place>
        </li>
      ))}
    </ul>
  );
};

PlaceList.propTypes = {
  places: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      icon: PropTypes.string,
      geometry: PropTypes.object,
    })
  ),
};

const Places = ({
  labelName = '附近的地点',
  center,
  searchValue,
  keyword,
  onChange,
  onSubmit,
}) => (
  <aside className="menu has-background-dark section">
    <Search value={searchValue} onChange={onChange} onSubmit={onSubmit} />
    <p className="menu-label has-text-light">{labelName}</p>
    <Placeholder fallback={<Spinner />} delayMs={1000}>
      <PlaceList center={center} keyword={keyword} />
    </Placeholder>
  </aside>
);

export default Places;
