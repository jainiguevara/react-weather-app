import React, { useContext } from 'react';

import CurrentWeather from './CurrentWeather';
import WeatherForecast from './WeatherForecast'
import Filters from './Filters';
import { WeatherContext } from './../contexts/WeatherContext';

const WeatherApp = () => {
  const { error } = useContext(WeatherContext);

  // Displays error when API returns a 401 or 500 error code
  if (error !== '') {
    return (
      <div className="weather-app">{error}</div>
    )
  }

  return (
    <div>
      <div className="weather-header">
        <Filters />
      </div>
      <div className="weather-app">
        <CurrentWeather />
        <WeatherForecast />
      </div>  
    </div>
  );
};

export default WeatherApp;
