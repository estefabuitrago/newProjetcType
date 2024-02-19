import React, { useState, useEffect } from 'react';

const SelectAmount = ({ amount, onSelect, className }) => {
  const [options, setOptions] = useState([]);

  const getOptions = () => {
    const newOptions = [];
    for (let i = 1; i <= amount; i++) {
      newOptions.push(i);
    }
    setOptions(newOptions);
  };

  useEffect(() => {
    getOptions();
  }, [amount]);

  return (
    <select className={className} onChange={(e) => onSelect(parseInt(e.target.value))}>
      {options.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default SelectAmount;
