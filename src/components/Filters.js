import React, { useContext } from 'react';

import { WeatherContext } from './../contexts/WeatherContext';
import SelectFilter from './SelectFilter';

const city = [
  { name: 'Singapore' },
  { name: 'Manila' },
  { name: 'Hong Kong' },
  { name: 'Los Angeles' },
  { name: 'Paris' },
]

const Filters = props => {
  const { weatherTypeList, handleSelectCity, handleSelectWeatherType } = useContext(WeatherContext);
  return (
    <div className="filters">
      <SelectFilter name='City' handleOnChange={handleSelectCity} data={city} />
      <SelectFilter name='Weather Type' handleOnChange={handleSelectWeatherType} data={weatherTypeList} />
    </div>
  );
};

export default Filters;
