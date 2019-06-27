import React from 'react';

// Common component for the drop down list
const SelectFilter = props => {
  const { name, data, handleOnChange } = props;

  // Calls handleOnChange based on what function
  // Filter.js passed to this property
  const onChange = e => {
    handleOnChange(e.target.value)
  }

  return (
    <div className="select-filter">
      <div><strong>{name}</strong></div>
      <select onChange={onChange}>
        {data.map(d => <option key={d.name}>{d.name}</option>)}
      </select>
    </div>
  );
};

export default SelectFilter;
