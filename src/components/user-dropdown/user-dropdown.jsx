import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';
import './user-dropdown.scss';

const UserDropdown = ({ history }) => {
  const handleSignout = () => {
    auth.signOut();
    history.push(`/`);
  };
  return (
    <div className="user-dropdown">
      <Link className="user-profile" to="/user-profile">
        Profile
      </Link>
      <div className="sign-out" onClick={handleSignout}>
        <span>Logout</span>
      </div>
    </div>
  );
};

export default withRouter(UserDropdown);
