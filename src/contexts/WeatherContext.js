import React, { useEffect, useState } from 'react';

import api from './../api';

let WeatherContext
WeatherContext = React.createContext();
const { Provider, Consumer } = WeatherContext;

// list of cities with locale and time zone
const cities = [
  { name: 'Singapore', locale: 'en-SG', timeZone: 'Asia/Singapore' },
  { name: 'Manila', locale: 'en-SG', timeZone: 'Asia/Hong_Kong' },
  { name: 'Hong Kong', locale: 'en-SG', timeZone: 'Asia/Hong_Kong' },
  { name: 'Los Angeles', locale: 'en-SG', timeZone: 'America/Los_Angeles' },
  { name: 'Paris', locale: 'en-SG', timeZone: 'Europe/Paris' },
];

const WeatherProvider = props => {
  // States
  const [currentCity, setCurrentCity] = useState('Singapore');
  const [weatherType, setWeatherType] = useState('All');
  const [weather, setWeather] = useState(undefined);
  const [forecast, setForecast] = useState([]);
  const [allForecasts, setAllForecasts] = useState([]);
  const [weatherTypeList, setWeatherTypeList] = useState([]);
  const [focused, setFocused] = useState(0);
  const [tempType, setTempType] = useState('C');
  const [error, setError] = useState('');

  const errorMessage = 'Connection error. Please try again later.';

  // This effect is responsible for requesting information in the API
  // This will be called on componentDidMount callback and
  // if currentCity state is changed
  useEffect(() => {
    api('/weather', currentCity)
    .then(response => {

      if (parseInt(response.cod) !== 200) {
        setError(errorMessage)
        return
      }

      const current = populateWeatherObject(response, cities);

      setFocused(response.dt);
      setWeather(current);
      setWeatherType(current.description);
      setError('');

      return api('/forecast', currentCity)
        .then(response => {
          if (parseInt(response.cod) !== 200) {
            setError(errorMessage)
            return
          }
          const list = populateForecastList(response, current, cities);
          list.unshift(current);
          setForecast(list);
          setWeatherTypeList(populateWeatherTypeList(list));
          setAllForecasts(list);
          setError('');
        })

    })
    .catch(error => console.log(error))
  }, [currentCity])

  // 
  // Called inside CurrentWeather.js > onClick(e) function
  // This function is used to switch displays from Celsius to Fahrenheit
  //
  const handleTempTypeChange = () => {
    tempType === 'C' ? setTempType('F') : setTempType('C')
  }

  // 
  // Called in WeatherForecast.js > handleClick(dt) function
  // This function is being used for displaying the selected
  // weather in the 5-day forecast
  //
  const handleSelectForecast = dt => {
    const selectedWeather = allForecasts.find(fc => fc.dt === dt)
    setWeather(selectedWeather)
    setFocused(selectedWeather.dt)
  }

  // 
  // Passed in Filters.js as handleOnChange property
  // and called inside SelectFilter.js > onChange(e) function
  // This function is being used for selecting a city
  //
  const handleSelectCity = city => {
    setCurrentCity(city);
  }

  // 
  // Passed in Filters.js as handleOnChange property
  // and called inside SelectFilter.js > onChange(e) function
  // This function is being used for filtering a weather type
  //
  const handleSelectWeatherType = type => {
    setWeatherType(type);
    if (type === 'All') {
      setForecast(allForecasts);
    } else {
      const selectedWeather = allForecasts.filter(fc => fc.description === type)
      setForecast(selectedWeather)
    }
  }

  return (
    <Provider value={{
      error,
      cities,
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

// Creates an object for converted temperatures
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

// Creates an object to be used for the display
// of dates, city timezones and temperatures
const populateData = (response, date, cities, current = undefined) => {
  const dayOfWeek = parseDayOfWeek(date.getDay()).short;
  const { temp, temp_min: min, temp_max: max } = response.main;
  const temperatures = convertTemperature({ temp, min, max })
  const city = current ? cities.find(c => c.name === current.name):
  cities.find(c => c.name === response.name);
  return {
    dayOfWeek,
    temperatures,
    city,
  }
}
// Parses the response for GET /weather API call
const populateWeatherObject = (response, cities) => {
  const date = new Date(response.dt * 1000)
  const { dayOfWeek, temperatures, city: { locale, timeZone } } = populateData(response, date, cities);
  return {
    name: response.name,
    dt: response.dt,
    dayOfWeek,
    date: `${dayOfWeek} ${date.toLocaleString(locale, { timeZone })}`,
    description: parseWeatherDescription(response.weather[0].description),
    icon: `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`,
    alt: response.weather[0].description,
    ...temperatures,
  }
}

// Parses the response for GET /forecast API call
const populateForecastList = (response, current, cities) => {
  return response.list.reduce(function(acc, value) {
    const date = new Date(value.dt * 1000);
    if (date.getUTCHours() === 12 && new Date(current.dt * 1000).toDateString() !== date.toDateString()) {
      const { dayOfWeek, temperatures, city: { locale, timeZone } } = populateData(value, date, cities, current);
      acc.push({
        name: current.name,
        dt: value.dt,
        dayOfWeek,
        date: `${dayOfWeek} ${date.toLocaleString(locale, { timeZone })}`,
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

// A function to get unique weather types based on the forecast list
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

// A reducer function to parse to set first letter word/s to upper case
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

// Returns the long and short version of the day of week into string 
const parseDayOfWeek = day => {
  const weekDayLong = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  return {
    long: weekDayLong[day],
    short: weekDayLong[day].substring(0, 3),
  }
}