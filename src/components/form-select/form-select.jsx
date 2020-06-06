import React from 'react';
import './form-select.scss';
const FormSelect = ({ handleChange, opt, options, ...otherProps }) => {
  return (
    <select className="form-select" onChange={handleChange} {...otherProps}>
      <option value="">select</option>
      {options.map((item, index) => (
        <option key={index} value={item.toLowerCase()}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default FormSelect;
