import React, { useContext } from 'react';
import { unstable_createResource as createResource } from 'react-cache';
import styled from 'styled-components';

import { getPlacesWithKeyword } from '../api/geocode';
import MapContext from '../container/MapContext';

const nearbyResource = createResource(
  getPlacesWithKeyword,
  ({ lng, lat, keyword }) => '' + lat + lng + keyword
);

let prevPlacelist = null;
const useNearBy = ({ dispatch, center, keyword }) => {
  const { results: places } = nearbyResource.read({ keyword, ...center }) ?? {};

  if (prevPlacelist !== places) {
    dispatch({
      type: 'getNearby',
      payload: places,
    });
    prevPlacelist = places;
  }

  return places ?? [];
};

const Place = styled.a.attrs({
  className: ({ isActive }) => (isActive ? 'is-active' : ''),
})`
  &&&:hover {
    background-color: #555;
  }
`;

const PlaceList = ({ active }) => {
  const { store, dispatch } = useContext(MapContext);
  const { center, keyword } = store;

  const onClickPlace = id => () => {
    dispatch({
      type: 'clickPlace',
      payload: {
        zoom: 15,
        id,
      },
    });
  };

  const places = useNearBy({ center, keyword, dispatch });
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

export default PlaceList;
