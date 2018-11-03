import React from 'react';
import cx from 'classnames';

const Navbar = ({ hasExpanded, toggleNavbar }) => {
  return (
    <nav className="navbar is-dark" aria-label="main navigation">
      <div className="navbar-brand">
        <div className="navbar-item" onClick={toggleNavbar}>
          <a
            className={cx(['navbar-burger', { 'is-active': hasExpanded }])}
            style={{ display: 'block' }}
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
