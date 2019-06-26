import React from 'react';

import CurrentWeather from './CurrentWeather';
import WeatherForecast from './WeatherForecast'
import Filters from './Filters';

const WeatherApp = () => {

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
