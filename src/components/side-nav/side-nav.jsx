import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import CustomButton from '../custom-button/custom-button';
import userIco from '../../assets/userIco.svg';
import close from '../../assets/close.svg';
import pattern from '../../assets/pattern.svg';
import './side-nav.scss';
const SideNav = ({ currentUser, handleToggleSideNav, history, match }) => {
  return (
    <div className="side-nav">
      <div className="close">
        <img src={close} alt="Close Icon" onClick={handleToggleSideNav} />
      </div>
      {currentUser ? (
        <Link
          className="user-profile"
          to="/user-profile"
          onClick={handleToggleSideNav}
        >
          <div className="user">
            <img
              className="user-icon"
              src={currentUser.photoURL ? currentUser.photoURL : userIco}
              alt="user"
            />
            <span>{currentUser.displayName}</span>
          </div>
        </Link>
      ) : (
        <Link to="/signin" onClick={handleToggleSideNav}>
          <CustomButton acen>Log In / Register</CustomButton>
        </Link>
      )}
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-link" onClick={handleToggleSideNav}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="nav-link"
              onClick={handleToggleSideNav}
            >
              About
            </Link>
          </li>
          <li>
            <Link to="/blog" className="nav-link" onClick={handleToggleSideNav}>
              Blog
            </Link>
          </li>
          <li>
            <Link
              to="/forum"
              className="nav-link"
              onClick={handleToggleSideNav}
            >
              Forum
            </Link>
          </li>
          <li>
            <Link
              to="/podcast"
              className="nav-link"
              onClick={handleToggleSideNav}
            >
              Podcast
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="nav-link"
              onClick={handleToggleSideNav}
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      <div className="pattern">
        <img src={pattern} alt="Pattern" />
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});
export default withRouter(connect(mapStateToProps)(SideNav));
