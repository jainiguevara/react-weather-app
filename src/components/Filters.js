import React, { useContext } from 'react';

import { WeatherContext } from './../contexts/WeatherContext';
import SelectFilter from './SelectFilter';

// Component for the filters for Cities and Weather Type
const Filters = () => {
  const {
    cities,
    weatherTypeList,
    handleSelectCity,
    handleSelectWeatherType
  } = useContext(WeatherContext);
  return (
    <div className="filters">
      <SelectFilter
        name='City'
        handleOnChange={handleSelectCity}
        data={cities}
      />
      <SelectFilter
        name='Weather Type'
        handleOnChange={handleSelectWeatherType}
        data={weatherTypeList}
      />
    </div>
  );
};

export default Filters;
