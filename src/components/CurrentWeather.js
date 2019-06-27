import React, { useContext } from 'react';

import { WeatherContext } from './../contexts/WeatherContext';

const CurrentWeather = () => {
  const { weather, forecast, tempType, handleTempTypeChange } = useContext(WeatherContext);
  
  // Render a loading message while waiting for API response
  if (!weather && forecast.length === 0) {
    return (<div>Loading Current Weather...</div>)
  }

  const {
    name,
    date,
    description,
    celsius,
    fahrenheit,
    icon,
    alt,
  } = weather;

  // Renders the Temperature display and its corresponding onClick for wheather type change
  const renderTempDisplay = () => {
    if (tempType === 'C') {
      return (
        <div className="temp">
          {celsius}
          <sup>
            °C | <span onClick={handleTempTypeChange} className="temp-button">°F</span>
          </sup>
        </div>
      )
    }
    return (
      <div className="temp">
        {fahrenheit}
        <sup>
          <span onClick={handleTempTypeChange} className="temp-button">°C</span> | °F
        </sup>
      </div>
    )
  }

  return (
    <div data-testid="current-weather" className="current-weather">
      <div className="header">{name}</div>
      <div className="subtitle">{date}</div>
      <div className="subtitle">{description}</div>
      <div className="forecast">
        <div className="weather">
          <img src={icon} alt={alt} />
        </div>
        {renderTempDisplay()}
      </div>
    </div>
  );
};

export default CurrentWeather;