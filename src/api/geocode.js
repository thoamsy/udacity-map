import { API_KEY } from '../constant';
export const getLocationWithLatLng = async ({ lat, lng }) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;

  const res = await fetch(url, {
    mode: 'cors',
  });
  if (res.ok) {
    return res.json();
  } else {
    return res.statusText;
  }
};
