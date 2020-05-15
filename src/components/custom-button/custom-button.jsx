import React from 'react';
import './custom-button.scss';
const CustomButton = ({
  children,
  isGoogleSignIn,
  isFacebookSignIn,
  acen,
  inverted,
  ...otherProps
}) => {
  return (
    <button
      className={`${inverted ? 'inverted' : ''} ${
        isGoogleSignIn ? 'google-sign-in' : ''
      } ${isFacebookSignIn ? 'facebook-sign-in' : ''} ${
        acen ? 'acen' : ''
      } custom-button`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default CustomButton;
