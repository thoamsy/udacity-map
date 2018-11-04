import React, { useContext, useRef, useState } from 'react';
import { unstable_createResource as createResource } from 'react-cache';
import styled from 'styled-components';

import { getPlacesWithKeyword } from '../api/geocode';
import { DispatchContext, StoreContext } from '../container/SearchContext';

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
  const dispatch = useContext(DispatchContext);
  const store = useContext(StoreContext);
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
  const ref = useRef();
  // ref.current?.focus?.();
  ref.current && ref.current.focus();

  const [currentCursor, setCursor] = useState(0);
  const moveCursor = event => {
    event.preventDefault();
    const {
      key,
      target: { dataset },
    } = event;
    if (key === ' ' || key === 'Enter') {
      onClickPlace(dataset.id)();
      setCursor(dataset.index);
    }
  };

  return (
    <ul className="menu-list" role="menu" onKeyPress={moveCursor}>
      {places.map((place, i) => (
        <li
          key={place.id}
          ref={i === currentCursor ? ref : null}
          onClick={onClickPlace(place.id)}
          data-id={place.id}
          data-index={i}
          tabIndex={0}
          role="menuitem"
        >
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
