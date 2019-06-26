import React from 'react';

import SelectFilter from './SelectFilter';

const city = [
  { name: 'Singapore' },
  { name: 'Manila' },
  { name: 'Hong Kong' },
  { name: 'Los Angeles' },
  { name: 'Paris' },
]

const weather = [
  { name: 'Cloudy' },
  { name: 'Rainy' },
  { name: 'Sunny' },
  { name: 'Thunder Storms' },
]

const Filters = props => {
  return (
    <div className="filters">
      <SelectFilter name='City' data={city} />
      <SelectFilter name='Weather Type' data={weather} />
    </div>
  );
};

export default Filters;
