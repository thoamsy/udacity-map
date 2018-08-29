import React, { Placeholder } from 'react';
import { createResource } from 'simple-cache-provider';
import Spinner from './Spinner';
import { cache } from '../cache';
import { fakeApi } from '../api/fakeapi';

const fakeResource = createResource(fakeApi);

export default function Skr() {
  const data = fakeResource.read(cache);
  return (
    <Placeholder delayMs={1000} fackback={<Spinner size="large" />}>
      <div>{data.title}</div>
    </Placeholder>
  );
}
