import React from 'react';
import cx from 'classnames';

const Navbar = ({ children, onClick, isOpen }) => (
  <nav className="navbar" aria-label="main navigation">
    <div className="navbar-brand">
      <a
        className={cx(['navbar-burger', { 'is-active': isOpen }])}
        aria-label="menu"
        aria-expanded={isOpen}
        onClick={onClick}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>
    <menu className={cx('navbar-menu', { 'is-active': isOpen })}>
      <div className="navbar-start">{children}</div>
    </menu>
  </nav>
);

export default Navbar;
