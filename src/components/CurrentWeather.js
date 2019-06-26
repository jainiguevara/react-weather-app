import React, { useContext } from 'react';

import { WeatherContext } from './../contexts/WeatherContext';

const CurrentWeather = () => {
  const { weather, tempType, handleTempTypeChange } = useContext(WeatherContext);
  
  if (!weather) {
    return (<div>Loading...</div>)
  }

  const {
    date,
    description,
    celsius,
    fahrenheit,
    icon
  } = weather.display;

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
    <div className="current-weather">
      <div className="header">{weather.name}</div>
      <div className="subtitle">{date}</div>
      <div className="subtitle">{description}</div>
      <div className="forecast">
        <div className="weather">
          <img src={icon} alt="test" />
        </div>
        {renderTempDisplay()}
      </div>
    </div>
  );
};

export default CurrentWeather;