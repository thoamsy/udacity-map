import { useReducer } from 'react';
import { set, __, merge, update, map, zipObject } from 'lodash/fp';

const reducer = (state, action) => {
  const { type, payload } = action;
  const setState = set(__, payload, state);
  switch (type) {
    case 'search': {
      return setState('keyword');
    }
    case 'setCenter': {
      return setState('center');
    }
    case 'getNearBy': {
      const placelist = payload;
      if (state.prevPlacelist === placelist) {
        return state;
      }
      const allIds = map('id', placelist);
      return (
        state
        |> set('placelist.allIds', allIds)
        |> set('placelist.byId', zipObject(allIds, placelist))
        |> set('prevPlacelist', placelist)
      );
    }
    case 'clearCenter':
    case 'clickPlace':
      return merge(payload, state);
    case 'TOGGLE_SIDE_BAR':
      return update('hasExpanded', x => !x, state);
    default:
      return state;
  }
};

const useSearchState = initialState => {
  return useReducer(reducer, initialState);
};

export default useSearchState;
