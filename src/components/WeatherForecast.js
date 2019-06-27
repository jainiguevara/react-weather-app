import React, { useContext } from 'react';

import { WeatherContext } from './../contexts/WeatherContext';

const WeatherForecast = () => {
  const { forecast, focused, tempType, handleSelectForecast } = useContext(WeatherContext);
  
  if (forecast.length === 0) {
    return (<div>Loading Forecast...</div>)
  }

  // Renders max and min temperatures in the list
  const renderTemperature = ({
    celsiusMax, celsiusMin, fahrenheitMax, fahrenheitMin
  }) => {
    if (tempType === 'C') {
      return <div className="temp"><b>{celsiusMax}°</b> {celsiusMin}°</div>
    }
    return <div className="temp"><b>{fahrenheitMax}°</b> {fahrenheitMin}°</div>
  }

  // Function to select the weather and displays
  // into the Current Weather component
  const handleClick = dt => {
    handleSelectForecast(dt);
  }

  return (
    <div className="weather-forecast">
      {forecast.map(fc => {
        return (
          <div
            key={fc.dt}
            className={focused === fc.dt ? 'focused' : 'forecast'}
            onClick={() => handleClick(fc.dt)}
          >
            <div className="week-day">{fc.dayOfWeek}</div>
            <div className="condition"><img src={fc.icon} alt={fc.alt} /></div>
            {renderTemperature(fc)}
          </div>
        )
      })}
    </div>
  );
};

export default WeatherForecast;
