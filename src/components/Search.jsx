import React, { useState } from 'react';

const Search = ({ onSubmit }) => {
  const [value, setValue] = useState('');
  const onChange = ({ target }) => setValue(target.value);

  return (
    <form onSubmit={onSubmit(value)} className="form">
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
