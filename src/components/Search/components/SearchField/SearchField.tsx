import React, { useState } from "react";

import { root } from './SearchField.scss';

interface SearchFieldProps {
  fieldName: string;
  label: string;
  placeholder: string;
  setSearchText: (...args: any[]) => void;
}

const SearchField: React.FC<SearchFieldProps> = ({ fieldName, label, placeholder, setSearchText }) => {
  const [value, setValue] = useState([]);
  const handleChange = (event) => {
    const value = event.target.value;
    console.log('something');
    setValue(value);
    setSearchText(value);
  }

  return (
    <div className={root}>
      <label htmlFor={fieldName}>{label}</label>
      <input
        name={fieldName}
        placeholder={placeholder}
        type="text"
        value={value}
        autoComplete="off"
        onChange={handleChange}
      />
    </div>)
};

export default SearchField;
