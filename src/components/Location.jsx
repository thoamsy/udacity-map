import React from 'react';
import { createResource } from 'simple-cache-provider';
import { cache } from '../cache';
import { getLocationWithLatLng, getPlacesWithKeyword } from '../api/geocode';

const nearbyResource = createResource(
  getPlacesWithKeyword,
  ({ lng, lat }) => `${lat}${lng}`
);

const getNearby = center => nearbyResource.read(cache, center);
const Location = ({ center }) => {
  if (!center) return null;
  try {
    const res = getNearby(center);
    return <div>{JSON.stringify(res)}</div>;
  } catch (err) {
    return <h1>error</h1>;
  }
};

export default Location;
