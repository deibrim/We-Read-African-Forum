import React from 'react';
import hide from '../../assets/hide.svg';
import visible from '../../assets/visible.svg';
import './form-input.scss';
const FormInput = ({
  handleChange,
  label,
  toggleShowPassword,
  isShowPass,
  forgotPassword,
  handleForgetPass,
  ...otherProps
}) => {
  return (
    <div
      className="group"
      style={
        forgotPassword ? { marginBottom: '40px' } : { marginBottom: '30px' }
      }
    >
      <input onChange={handleChange} className="form-input" {...otherProps} />
      {label ? (
        <label
          className={`${
            otherProps.value.length ? 'shrink' : ''
          } form-input-label`}
        >
          {label}
        </label>
      ) : null}
      {label ? (
        label.includes('assword') ? (
          <img
            className="showpass"
            onClick={toggleShowPassword ? toggleShowPassword : null}
            src={isShowPass ? hide : visible}
            alt="Show Password Icon"
          />
        ) : null
      ) : null}
      {forgotPassword ? (
        <span onClick={handleForgetPass} className="forgot-password">
          Forgotten password?
        </span>
      ) : null}
    </div>
  );
};

export default FormInput;
