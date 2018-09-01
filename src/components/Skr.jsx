import { createResource } from 'simple-cache-provider';
import { cache } from '../cache';
import { fakeApi } from '../api/fakeapi';

const fakeResource = createResource(fakeApi);

export default function Skr() {
  const data = fakeResource.read(cache);
  return data.title;
}
