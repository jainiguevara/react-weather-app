import React, { useEffect, useState } from 'react';

import api from './../api';

let WeatherContext
WeatherContext = React.createContext();
const { Provider, Consumer } = WeatherContext;

const WeatherProvider = props => {
  const [currentCity, setCurrentCity] = useState('Singapore');
  const [weatherType, setWeatherType] = useState('All');
  const [weather, setWeather] = useState(undefined);
  const [forecast, setForecast] = useState([]);
  const [allForecasts, setAllForecasts] = useState([]);
  const [weatherTypeList, setWeatherTypeList] = useState([]);
  const [focused, setFocused] = useState(0);
  const [tempType, setTempType] = useState('C');


  useEffect(() => {
    api('/weather', currentCity)
    .then(response => {
      const current = populateWeatherObject(response);

      setFocused(response.dt);
      setWeather(current);
      setWeatherType(current.description);

      return api('/forecast', currentCity)
        .then(response => {
          const list = populateForecastList(response, current, weatherType);
          list.unshift(current);
          setWeatherTypeList(populateWeatherTypeList(list));
          console.log(populateWeatherTypeList(list));
          setForecast(list);
          setAllForecasts(list);
        })

    })
    .catch(error => {
      console.log(error);
    })
  }, [currentCity])

  // useEffect(() => {
  //   setWeatherTypeList(populateWeatherTypeList(forecast));
  // }, [weatherType])


  const handleTempTypeChange = () => {
    tempType === 'C' ? setTempType('F') : setTempType('C')
  }

  const handleSelectForecast = dt => {
    const selectedWeather = allForecasts.find(fc => fc.dt === dt)
    setWeather(selectedWeather)
  }

  const handleSelectCity = city => {
    setCurrentCity(city);
  }

  const handleSelectWeatherType = type => {
    setWeatherType(type);
    console.log(type, forecast);
    if (type === 'All') {
      setForecast(allForecasts);
    } else {
      const selectedWeather = allForecasts.filter(fc => fc.description === type)
      setForecast(selectedWeather)
    }
  }

  return (
    <Provider value={{
      currentCity,
      weather,
      weatherTypeList,
      weatherType,
      tempType,
      forecast,
      focused,
      handleTempTypeChange,
      handleSelectForecast,
      handleSelectCity,
      handleSelectWeatherType,
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

const populateWeatherObject = response => {
  const date = new Date(response.dt * 1000)
  const dayOfWeek = parseDayOfWeek(date.getDay());
  const { temp, temp_min: min, temp_max: max } = response.main;
  const temperatures = convertTemperature({ temp, min, max })
  return {
    name: response.name,
    dt: response.dt,
    dayOfWeek: dayOfWeek.short,
    date: `${dayOfWeek.short} ${date.toTimeString()}`,
    description: parseWeatherDescription(response.weather[0].description),
    icon: `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`,
    alt: response.weather[0].description,
    ...temperatures,
  }
}

const populateForecastList = (response, current, weatherType) => {
  return response.list.reduce(function(acc, value) {
    const date = new Date(value.dt * 1000);
    if (date.getUTCHours() === 12 && new Date(current.dt * 1000).toDateString() !== date.toDateString()) {
      const dayOfWeek = parseDayOfWeek(date.getDay()).short;
      const { temp, temp_min: min, temp_max: max } = value.main;
      const temperatures = convertTemperature({ temp, min, max })
      acc.push({
        name: current.name,
        dt: value.dt,
        dayOfWeek,
        date: `${dayOfWeek} ${date.toTimeString()}`,
        description: parseWeatherDescription(value.weather[0].description),
        icon: `http://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`,
        alt: value.weather[0].description,
        ...temperatures,
      })
      return acc;
    }
    return acc;
  }, []);
}

const populateWeatherTypeList = list => {
  let arr = [];
  arr = list.reduce(function (acc, value) {
    const name = value.description;
    if (acc.filter(a => a.name === name).length === 0) {
      acc.push({ name });
    }
    return acc;
  }, [])
  arr.unshift({ name: 'All' });
  return arr;
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