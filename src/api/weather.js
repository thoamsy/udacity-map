const DarkSkyAPIKey = 'd4307b57dc6acac1070b21be47862c48';
export default async function getWeather({ lat, lng }) {
  const url = `https://api.darksky.net/forecast/${DarkSkyAPIKey}/${lat},${lng}/?exclude=minutely,hourly,flags&lang=zh&units=si`;
  try {
    const res = await fetch(url, {
      mode: 'cors',
      method: 'GET',
      cache: 'default',
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      throw Error(res.statusText);
    });
    return res;
  } catch (err) {
    return Error(err);
  }
}
