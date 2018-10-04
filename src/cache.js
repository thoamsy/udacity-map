import * as api from 'react-cache';

const cache = api.createCache();

const createResource = (loader, hash = x => x) => {
  const resource = api.createResource(loader, hash);
  const { read, preload } = resource;
  resource.read = key => read(cache, key);
  resource.preload = key => preload(cache, key);
  return resource;
};

export { createResource, cache };
