import React from 'react';

const Search = ({ value, onChange, onSubmit }) => (
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

export default Search;
