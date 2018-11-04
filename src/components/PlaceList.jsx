import React, { useContext, useRef, useState, useEffect } from 'react';
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

  useEffect(() => ref.current && ref.current.focus(), [ref.current]);

  const [currentCursor, setCursor] = useState(places[0]?.id);
  const moveCursor = useEnter(({ target: { dataset } }) => {
    onClickPlace(dataset.id)();
    setCursor(dataset.id);
  });

  return (
    <ul className="menu-list" role="menu" onKeyPress={moveCursor}>
      {places.map(({ id, name }, i) => (
        <li
          key={id}
          ref={id === currentCursor ? ref : null}
          onClick={onClickPlace(id)}
          data-id={id}
          tabIndex={show ? 0 : -1}
          role="menuitem"
        >
          <Place isActive={currentCursor === id} className="has-text-light">
            {name}
          </Place>
        </li>
      ))}
    </ul>
  );
};

export default PlaceList;
