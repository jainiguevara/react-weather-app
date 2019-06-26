import React, { useEffect, useState } from 'react';

import api from './../api';

let WeatherContext
WeatherContext = React.createContext();
const { Provider, Consumer } = WeatherContext;


const WeatherProvider = props => {
  const [currentCity, setCurrentCity] = useState('Singapore');
  const [weather, setWeather] = useState(undefined);
  const [focused, setFocused] = useState(0);
  const [forecast, setForecast] = useState([]);
  const [tempType, setTempType] = useState('C');


  useEffect(() => {
    let current = {}
    api('/weather', currentCity)
    .then(response => {
      const date = new Date(response.dt * 1000)
      const dayOfWeek = parseDayOfWeek(date.getDay());
      const { temp, temp_min: min, temp_max: max } = response.main;
      const temperatures = convertTemperature({ temp, min, max })
      current = {
        name: response.name,
        dt: response.dt,
        dayOfWeek: dayOfWeek.short,
        date: `${dayOfWeek.short} ${date.toLocaleTimeString()}`,
        description: parseWeatherDescription(response.weather[0].description),
        icon: `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`,
        alt: response.weather[0].description,
        ...temperatures,
      }
      setFocused(response.dt);
      setWeather(current);
      
      api('/forecast', currentCity)
        .then(response => {
          const filtered = response.list.reduce(function(acc, value) {
            const date = new Date(value.dt * 1000);
            if (date.getUTCHours() === 12 && new Date(current.dt * 1000).toDateString() !== date.toDateString()) {
              const dayOfWeek = parseDayOfWeek(date.getDay()).short;
              const { temp, temp_min: min, temp_max: max } = value.main;
              const temperatures = convertTemperature({ temp, min, max })
              acc.push({
                dt: value.dt,
                dayOfWeek,
                icon: `http://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`,
                alt: value.weather[0].description,
                ...temperatures,
              })
              return acc;
            }
            return acc;
          }, []);
          filtered.unshift(current);
          setForecast(filtered);
        })

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
      forecast,
      tempType,
      focused,
      handleTempTypeChange,
    }}>
      {props.children}
    </Provider>
  );
};

export { WeatherProvider, Consumer as WeatherConsumer, WeatherContext };


const convertTemperature = ({temp, min, max}) => {
  return {
    celsius: Math.round(temp - 273.15),
    fahrenheit: Math.round((temp - 273.15) * 9/5 + 32),
    celsiusMin: Math.round(min - 273.15),
    fahrenheitMin: Math.round((min - 273.15) * 9/5 + 32),
    celsiusMax: Math.round(max - 273.15),
    fahrenheitMax: Math.round((max - 273.15) * 9/5 + 32),
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