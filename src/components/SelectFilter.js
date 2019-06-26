import React from 'react';

const SelectFIlter = props => {
  const { name, data } = props;
  return (
    <div className="select-filter">
      <div><strong>{name}</strong></div>
      <select>
        {data.map(d => <option key={d.name}>{d.name}</option>)}
      </select>
    </div>
  );
};

export default SelectFIlter;
