import React from 'react';

const SelectFIlter = props => {
  const { name, data, handleOnChange } = props;

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

export default SelectFIlter;
