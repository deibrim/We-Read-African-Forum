import React from 'react';
import userIco from '../../assets/userIco.svg';
import arrowDown from '../../assets/arrowDown.svg';
import './user-preview.scss';
const UserPreview = ({ currentUser, arrowD, welcome }) => {
  return (
    <div
      className="user-preview"
      style={welcome ? { marginLeft: '0' } : { border: 'none' }}
    >
      <img
        className="user-icon"
        src={currentUser.photoURL ? currentUser.photoURL : userIco}
        alt="user"
        style={
          welcome
            ? { width: '50px', height: '50px', marginRight: '15px' }
            : { border: 'none' }
        }
      />
      <span>
        {welcome ? 'Welcome,' : null} {currentUser.displayName}
      </span>
      {arrowD ? (
        <img className="arrow-down" src={arrowDown} alt="Arrow Down Icon" />
      ) : null}
    </div>
  );
};

export default UserPreview;
