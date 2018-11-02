import styled from 'styled-components';
import React, { Suspense, useContext } from 'react';

import PlaceList from '../components/PlaceList';
import Spinner from '../components/Spinner';
import Search from '../components/Search';
import MapContext from './MapContext';

const AsideContainer = styled.section`
  width: 400px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: 20;
  transform: translateX(-100%);
`;

const Aside = ({ labelName = '附近的地点' }) => {
  const { dispath, store } = useContext(MapContext);

  const { center, keyword } = store;
  return (
    <AsideContainer>
      <aside className="menu has-background-dark section">
        <Search />
        <p className="menu-label has-text-light">{labelName}</p>
        <Suspense fallback={<Spinner />} maxDuration={1000}>
          <PlaceList center={center} keyword={keyword} />
        </Suspense>
      </aside>
    </AsideContainer>
  );
};
export default Aside;
