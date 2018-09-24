import React, { Placeholder } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { createResource } from 'simple-cache-provider';

import Search from './Search';
import { cache } from '../cache';
import { getPlacesWithKeyword } from '../api/geocode';
import Spinner from './Spinner';

const nearbyResource = createResource(
  getPlacesWithKeyword,
  ({ lng, lat }) => lat + lng
);
const getNearby = center => nearbyResource.read(cache, center);

const Place = styled.a.attrs({
  className: ({ isActive }) => (isActive ? 'is-active' : ''),
})`
  &&&:hover {
    background-color: #555;
  }
`;

const PlaceList = ({ active, center }) => {
  const res = getNearby(center);
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
  active: PropTypes.stirng,
  places: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      icon: PropTypes.string,
      geometry: PropTypes.object,
    })
  ),
};

const Places = ({ labelName = '附近的地点', center, active, className }) => (
  <aside className={`menu has-background-dark ${className}`}>
    <Search />
    <p className="menu-label has-text-light">{labelName}</p>
    <Placeholder fallback={<Spinner />} timeout={1000}>
      <PlaceList active={active} center={center} />
    </Placeholder>
  </aside>
);

export default Places;
