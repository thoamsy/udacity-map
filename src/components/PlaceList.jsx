import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { createResource } from 'simple-cache-provider';
import { cache } from '../cache';
import { getPlacesWithKeyword } from '../api/geocode';

const nearbyResource = createResource(
  getPlacesWithKeyword,
  ({ lng, lat }) => lat + lng
);
const getNearby = center => nearbyResource.read(cache, center);

const Place = styled.a.attrs({
  className: ({ isActive }) => (isActive ? 'is-active' : ''),
})``;

const PlaceList = ({ labelName = '附近的地点', center, isActive }) => {
  const res = getNearby(center);
  const places = res?.results || [];
  return (
    <aside className="menu">
      <p className="menu-label">{labelName}</p>
      <ul className="menu-list">
        {places.map(place => (
          <li key={place.id}>
            <Place className={isActive}>{place.name}</Place>
          </li>
        ))}
      </ul>
    </aside>
  );
};

PlaceList.propTypes = {
  labelName: PropTypes.string,
  places: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      icon: PropTypes.string,
      geometry: PropTypes.object,
    })
  ),
};

export default PlaceList;
