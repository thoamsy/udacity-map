import { useReducer } from 'react';
import { set, __, merge } from 'lodash/fp';

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
    case 'clearCenter':
    case 'clickPlace':
      return merge(payload, state);
    default:
      return state;
  }
};

const useSearchState = initialState => {
  return useReducer(reducer, initialState);
};

export default useSearchState;
