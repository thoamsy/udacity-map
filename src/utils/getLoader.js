import React from 'react';
import { identity } from 'ramda';
import { createResource } from 'simple-cache-provider';
import { cache } from '../cache';

export default function getLoader(loader, hash = identity) {
  const Resource = createResource(loader, hash);
  console.log(Resource);
  const Component = Resource.read(cache).default;

  return React.createElement(Component);
}
