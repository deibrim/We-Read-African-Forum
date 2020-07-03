import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';
import { setCurrentUser } from '../../redux/user/user.actions';
import './user-dropdown.scss';

const UserDropdown = ({ setCurrentUser }) => {
  const handleSignout = () => {
    auth.signOut();
    setCurrentUser(null);
    // history.push(`/`);
  };
  return (
    <div className="user-dropdown">
      <Link className="user-profile" to="/my-profile">
        Profile
      </Link>
      <div className="sign-out" onClick={handleSignout}>
        <span>Logout</span>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default withRouter(connect(null, mapDispatchToProps)(UserDropdown));
