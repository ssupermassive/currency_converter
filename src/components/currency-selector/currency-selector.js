import React from 'react';

const ITEMS= ['RUB', 'USD', 'EUR'];

const CurrencySelector = ({ value, onChangeHandler, className }) => {

  const changeHandler = onChangeHandler ? 
  (event) => onChangeHandler(event.target.value) : () => null;

  const options = ITEMS.map((value) => <option value={value} key={value}>{value}</option>);
  return <select className={className} value={value} onChange={changeHandler}>{options}</select>
};

export default CurrencySelector;
