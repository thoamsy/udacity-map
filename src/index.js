import React, { Placeholder } from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.min.css';

const createResource = loader => {
  const resource = {
    read(cache, key) {
      return cache.read(resource, key, loader);
    },
    preload(cache, key) {
      return cache.preload(resource, key, loader);
    },
  };
  return resource;
};
const cache = {
  $$typeof: 0xcac4e,
  map: new Map(),
  read(resource, hashedKey, loadResource) {
    if (cache.map.has(hashedKey)) {
      return cache.map.get(hashedKey);
    }
    const suspense = loadResource(hashedKey);
    suspense.then(thing => {
      cache.map.set(hashedKey, thing);
      return thing;
    });
    throw suspense;
  },
  preload(resource, hashedKey, loadResource) {
    return loadResource(hashedKey).then(thing => {
      cache.map.set(hashedKey, thing);
      return thing;
    });
  },
};

const sleep = (ms, value = Math.random()) =>
  new Promise(r => setTimeout(() => r(value), ms));
const loadResource = (id, a) => sleep(2000, `${id}-${a}-value`);
const myResource = createResource(loadResource);

const Loader = createResource(() => import('./Foo.jsx'));
const Foo = () => {
  // preload 类似于针对 await 的优化
  myResource.preload(cache, 'foo');
  myResource.preload(cache, 'bar');
  debugger;
  const foo = myResource.read(cache, 'foo');
  const bar = myResource.read(cache, 'bar');

  // code splitting
  const C = Loader.read(cache).default;
  return (
    <>
      <div>{foo}</div>
      <div>{bar}</div>
      <C />
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
