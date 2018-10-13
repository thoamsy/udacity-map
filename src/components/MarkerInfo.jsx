import React from 'react';
import weather from '../api/weather';
import { createResource } from '../cache';

const weatherResouce = createResource(
  weather,
  ({ lng, lat }) => '' + lng + lat
);

const emojiWeatherMap = {
  rain: '🌧',
  'clear-day': '☀️',
  'clear-night': '🌙',
  snow: '❄️',
  wind: '💨',
  fog: '🌫',
  cloudy: '☁️',
  'partly-cloudy-day': '🌤',
  thunderstorm: '⛈',
  tornado: '🌪',
};
const defaultEmoji = '🌚';

const MarkInfo = ({ center, name, vicinity }) => {
  const weather = weatherResouce.read(center);
  const {
    daily: { icon, summary, data },
  } = weather;
  const emoji = emojiWeatherMap[icon] ?? defaultEmoji;
  const title = name.includes(vicinity) ? vicinity : vicinity + name;
  return (
    <section className="box">
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">{title}</p>
          <a href="#" className="card-header-icon" aria-label="weather">
            <span className="icon" role="img">
              {emoji}
            </span>
          </a>
        </header>
        <div className="card-content">
          <article className="context">
            <strong>今天：</strong>
            {summary}
            <br />
            <strong>明天：</strong>
            {data[0].summary}
          </article>
        </div>
      </div>
    </section>
  );
};

export default MarkInfo;
