import styled from 'styled-components';
import React, { Suspense } from 'react';

import PlaceList from '../components/PlaceList';
import Spinner from '../components/Spinner';
import Search from '../components/Search';

const AsideContainer = styled.section`
  width: 400px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: 20;
  transform: translateX(-100%);
`;

const style = { minHeight: 900 };
const Aside = ({ labelName = '附近的地点', show }) => {
  return (
    <AsideContainer>
      <aside
        className="menu has-background-dark section"
        style={style}
        aria-hidden={!show}
      >
        <Search />
        <p className="menu-label has-text-light">{labelName}</p>
        <Suspense fallback={<Spinner />} maxDuration={500}>
          <PlaceList show={show} />
        </Suspense>
      </aside>
    </AsideContainer>
  );
};
export default Aside;
