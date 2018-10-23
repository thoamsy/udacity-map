import { API_KEY } from '../constant';

const getAPIUrl = ({ category, action, ...params }) =>
  `https://maps.googleapis.com/maps/api/${category}/${
    action ? action + '/' : ''
  }json?${Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')}&key=${API_KEY}`;

export const getLocationWithLatLng = async ({ lat, lng }) => {
  if (!(lat && lng)) return;
  const url = getAPIUrl({ category: 'geocode', latlng: `${lat},${lng}` });

  const res = await fetch(url, {
    mode: 'cors',
  });
  if (res.ok) {
    return res.json();
  } else {
    return res.statusText;
  }
};

export const getPlacesWithKeyword = async ({ lat, lng, keyword }) => {
  if (!(lat && lng)) return;
  const location = `${lat},${lng}`;
  const options = {
    category: 'place',
    action: 'nearbysearch',
    radius: 10000,
    language: 'zh-CN',
    location,
  };
  keyword && (options.keyword = keyword);
  const url = getAPIUrl(options);
  try {
    const res = await fetch(url, {
      mode: 'cors',
      headers: {
        'content-type': 'application/json',
      },
    });
    if (res.ok) {
      return res.json();
    } else {
      return res.statusText;
    }
  } catch (err) {
    return {
      type: 'error',
      err,
    };
  }
};
