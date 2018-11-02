import React, { useContext } from 'react';
import cx from 'classnames';

import MapContext from '../container/MapContext';

const Navbar = () => {
  const {
    dispatch,
    store: { hasExpanded },
  } = useContext(MapContext);
  const onBurgerClick = () => {
    dispatch({
      type: 'TOGGLE_SIDE_BAR',
    });
  };
  return (
    <nav className="navbar is-dark" aria-label="main navigation">
      <div className="navbar-brand">
        <div className="navbar-item" onClick={onBurgerClick}>
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
