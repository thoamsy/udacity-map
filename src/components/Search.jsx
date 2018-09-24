import React from 'react';
import styled from 'styled-components';

const SearchInput = styled.input.attrs({
  className: ({ inputing, loading }) => {
    let names = '';
    if (inputing) {
      names += ' is-rounded';
    }
    if (loading) {
      names += ' is-loading';
    }
    return names;
  },
  disabled: ({ initing }) => initing,
})``;

const Search = ({ value, onChange, onSubmit, initing }) => (
  <form onSubmit={onSubmit} className="form">
    <div className="field has-addons">
      <div className="control is-expanded">
        <SearchInput
          value={value}
          initing={initing}
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
