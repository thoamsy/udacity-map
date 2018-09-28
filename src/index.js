import React, { Placeholder } from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.min.css';

import { createCache, createResource } from 'simple-cache-provider';

// import App from './App';

const cache = createCache();
const sleep = (ms, value = Math.random()) =>
  new Promise(r => setTimeout(() => r(value), ms));
const loadResource = (id, a) => sleep(2000, `${id}-${a}-value`);
const myResource = createResource(loadResource);

const Loader = createResource(() => import('./Foo.js'));
const Foo = () => {
  // preload 类似于针对 await 的优化
  myResource.preload(cache, 'foo', 2);
  myResource.preload(cache, 'bar', 2);
  const foo = myResource.read(cache, 'foo', 2);
  const bar = myResource.read(cache, 'bar', 2);

  // code splitting
  Loader.read(cache);
  return (
    <>
      <div>{foo}</div>
      <div>{bar}</div>
    </>
  );
};
const App = () => {
  // placeholder 支持普通的 Element 和 render props 的形式
  return (
    <Placeholder fallback="loading…" delayMs={1500}>
      {timeout => (timeout ? 'loading…' : <Foo />)}
    </Placeholder>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));
