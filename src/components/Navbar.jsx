import React from 'react';
import cx from 'classnames';

import useEnter from '../hooks/useEnter';

const Navbar = ({ hasExpanded, toggleNavbar }) => {
  const onMenuEnter = useEnter(toggleNavbar);

  return (
    <nav className="navbar is-dark" aria-label="main navigation">
      <div className="navbar-brand">
        <div
          className="navbar-item"
          onClick={toggleNavbar}
          onKeyPress={onMenuEnter}
        >
          <a
            className={cx(['navbar-burger', { 'is-active': hasExpanded }])}
            style={{ display: 'block' }}
            tabIndex={0}
            aria-label="menu"
            aria-expanded={hasExpanded}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
