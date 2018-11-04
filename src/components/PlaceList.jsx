import React, { useContext, useRef, useState } from 'react';
import { unstable_createResource as createResource } from 'react-cache';
import styled from 'styled-components';

import { getPlacesWithKeyword } from '../api/geocode';
import { DispatchContext, StoreContext } from '../container/SearchContext';
import useEnter from '../hooks/useEnter';

const nearbyResource = createResource(
  getPlacesWithKeyword,
  ({ lng, lat, keyword }) => '' + lat + lng + keyword
);

const useNearBy = ({ dispatch, center, keyword }) => {
  const prevPlacelist = useRef();

  const { results: places } = nearbyResource.read({ keyword, ...center }) ?? {};
  if (prevPlacelist.current !== places) {
    dispatch({
      type: 'getNearby',
      payload: places,
    });
    prevPlacelist.current = places;
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

const PlaceList = ({ show }) => {
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
  const moveCursor = useEnter(({ target: { dataset } }) => {
    onClickPlace(dataset.id)();
    setCursor(+dataset.index);
  });

  return (
    <ul className="menu-list" role="menu" onKeyPress={moveCursor}>
      {places.map((place, i) => (
        <li
          key={place.id}
          ref={i === currentCursor ? ref : null}
          onClick={onClickPlace(place.id)}
          data-id={place.id}
          data-index={i}
          tabIndex={show ? 0 : -1}
          role="menuitem"
        >
          <Place isActive={currentCursor === i} className="has-text-light">
            {place.name}
          </Place>
        </li>
      ))}
    </ul>
  );
};

export default PlaceList;
