import { useReducer } from 'react';
import { set, __ } from 'lodash/fp';

const reducer = (state, action) => {
  const { type, payload } = action;
  const setState = set(__, __, state);
  switch (type) {
    case 'search': {
      return setState('keyword', payload);
    }
    case 'setCenter': {
      return setState('center', payload);
    }
    default:
      return state;
  }
};

const useSearchState = initialState => {
  return useReducer(reducer, initialState);
};

export default useSearchState;
