import React from 'react';
import { createResource } from 'simple-cache-provider';
import { cache } from '../cache';
import { getLocationWithLatLng } from '../api/geocode';

const locationResource = createResource(
  getLocationWithLatLng,
  ({ lng, lat }) => `${lat}${lng}`
);

const getLocation = center => locationResource.read(cache, center);
const Location = ({ center }) => {
  if (!center) return null;
  const res = getLocation(center);
  return <div>{JSON.stringify(res)}</div>;
};

export default Location;
