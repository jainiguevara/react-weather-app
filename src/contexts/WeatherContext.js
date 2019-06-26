import React, { useEffect, useState } from 'react';

import api from './../api';

let WeatherContext
WeatherContext = React.createContext();
const { Provider, Consumer } = WeatherContext;


const WeatherProvider = props => {
  const [currentCity, setCurrentCity] = useState('Singapore');
  const [weather, setWeather] = useState(undefined);
  const [forecast, setForecast] = useState([]);
  const [tempType, setTempType] = useState('C');


  useEffect(() => {
    api('/weather', currentCity)
    .then(response => {
      const date = new Date(response.dt * 1000)
      const dayofWeek = parseDayOfWeek(date.getDay());
      const { celsius, fahrenheit } = convertTemperature(response.main.temp)
      setWeather({
        ...response,
        display: {
          date: `${dayofWeek.short} ${date.toLocaleTimeString()}`,
          description: parseWeatherDescription(response.weather[0].description),
          icon: `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`,
          celsius,
          fahrenheit,
        },
      });
    })
    .catch(error => {
      console.log(error);
    })
  },[currentCity])

  const handleTempTypeChange = () => {
    tempType === 'C' ? setTempType('F') : setTempType('C')
  }

  return (
    <Provider value={{
      currentCity,
      weather,
      tempType,
      handleTempTypeChange,
    }}>
      {props.children}
    </Provider>
  );
};

export { WeatherProvider, Consumer as WeatherConsumer, WeatherContext };


const convertTemperature = temp => {
  return {
    celsius: Math.round(temp - 273.15),
    fahrenheit: Math.round((temp - 273.15) * 9/5 + 32),
  }
}

const parseWeatherDescription = string => {
  const strArr = string.split(' ');
  return strArr.reduce(function(acc, value, index, array) {
    acc = acc + value.charAt(0).toUpperCase() + value.slice(1) + ' '
    if (index === array.length - 1) {
      return acc.trim();
    }
    return acc;
  }, '');
}

const parseDayOfWeek = day => {
  const weekDayLong = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return {
    long: weekDayLong[day],
    short: weekDayLong[day].substring(0, 3),
  }
}