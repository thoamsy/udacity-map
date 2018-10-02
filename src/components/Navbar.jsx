import React from 'react';
import cx from 'classnames';

const Navbar = ({ onClick, isOpen }) => (
  <nav className="navbar is-dark" aria-label="main navigation">
    <div className="navbar-brand">
      <div className="navbar-item" onClick={onClick}>
        <a
          className={cx(['navbar-burger', { 'is-active': isOpen }])}
          style={{ display: 'block' }}
          aria-label="menu"
          aria-expanded={isOpen}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>
    </div>
  </nav>
);

export default Navbar;
