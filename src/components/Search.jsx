import React, { useState, useContext } from 'react';
import MapContext from '../container/MapContext';

const Search = () => {
  const [value, setValue] = useState('');
  const { dispatch } = useContext(MapContext);
  const onChange = ({ target }) => setValue(target.value);

  const onSubmit = event => {
    event.preventDefault();
    dispatch({
      type: 'search',
      payload: value,
    });
  };

  return (
    <form onSubmit={onSubmit} className="form">
      <div className="field has-addons">
        <div className="control is-expanded">
          <input
            value={value}
            onChange={onChange}
            type="text"
            className="input"
            placeholder=" 输入附近的地点"
          />
        </div>
        <div className="control">
          <a className="button is-light">
            <span role="img" aria-label="Search">
              🔍
            </span>
          </a>
        </div>
      </div>
    </form>
  );
};

export default Search;
