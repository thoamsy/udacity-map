import React, { useContext } from 'react';
import { unstable_createResource as createResource } from 'react-cache';
import styled from 'styled-components';

import { getPlacesWithKeyword } from '../api/geocode';
import MapContext from '../container/MapContext';

const nearbyResource = createResource(
  getPlacesWithKeyword,
  ({ lng, lat, keyword }) => '' + lat + lng + keyword
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

const PlaceList = ({ active }) => {
  const { store } = useContext(MapContext);
  const { center, keyword } = store;

  const onClickPlace = id => () => {
    console.log(id);
  };
  const res = getNearby(center, keyword);
  const { results: places = [] } = res ?? {};
  return (
    <ul className="menu-list" role="menu">
      {places.map((place, i) => (
        <li key={place.id} onClick={onClickPlace(place.id)}>
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

export default Places;
