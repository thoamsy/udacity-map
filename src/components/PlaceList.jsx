import React, { Placeholder } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { createResource } from 'simple-cache-provider';
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
})``;

const PlaceList = ({ active, center }) => {
  const res = getNearby(center);
  const places = res?.results || [];
  return (
    <ul className="menu-list">
      {places.map(place => (
        <li key={place.id}>
          <Place isActive={active === place.id}>{place.name}</Place>
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

const Places = ({ labelName = '附近的地点', center, active }) => {
  return (
    <aside className="menu">
      <p className="menu-label">{labelName}</p>
      <Placeholder fallback={<Spinner />}>
        <PlaceList active={active} center={center} />
      </Placeholder>
    </aside>
  );
};

export default Places;
