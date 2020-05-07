import React from 'react';
import loader from '../../assets/loader.gif';
import './loader.scss';
const Loader = () => {
  return (
    <div className="loading-screen">
      <img src={loader} alt="Loader" />
    </div>
  );
};

export default Loader;
