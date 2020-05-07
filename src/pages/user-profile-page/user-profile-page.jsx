import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { auth } from '../../firebase/firebase.utils';
import pattern from '../../assets/pattern.svg';
import Loader from '../../components/loader/loader';
import userIco from '../../assets/userIco.svg';
import logo from '../../assets/logo.svg';
import logout from '../../assets/logout.svg';
import './user-profile-page.scss';
const UserProfilePage = ({ currentUser, history, reading, historyArr }) => {
  const handleSignout = () => {
    auth.signOut();
    history.push(`/`);
  };
  return currentUser ? (
    <div className="user-profile-page">
      <Helmet>
        <title>We Read African &mdash; Profile</title>
        <meta property="og:title" content="We Read African &mdash; Profile" />
        <meta property="og:type" content="website" />
        <meta name="description" content=" " />
        <meta property="og:site_name" content="We Read African" />
        <meta
          property="og:url"
          content="https://www.wereadafrican.com/user-profile"
        />
      </Helmet>
      <div className="body">
        <div className="left">
          <div className="logo">
            <img src={logo} alt="We Read African Logo" />
          </div>
          <div className="user">
            <div className="user-photo">
              <img
                src={currentUser.photoURL ? currentUser.photoURL : userIco}
                alt="user"
              />
            </div>
            <h3>{currentUser.displayName}</h3>
          </div>
          <div className="sign-out" onClick={handleSignout}>
            <span>LOGOUT</span>
            <img src={logout} alt="Logout Icon" />
          </div>
        </div>
        <div className="right">
          <div className="current-reading">
            <div className="heading">
              <span>Current Reading</span>
            </div>
            {reading ? (
              <Link
                to={`/blog/${reading.tag}/${reading.title
                  .split(' ')
                  .join('-')
                  .toLowerCase()}`}
              >
                <h3 className="reading">{reading.title}</h3>
              </Link>
            ) : null}
          </div>
          <div className="favorite">
            <div className="heading">
              <span>History</span>
            </div>
            <div className="history-lists">
              {historyArr.lenght !== 0
                ? [...new Set(historyArr)]
                    .filter((item, index) => index < 4)
                    .map((item, index) => (
                      <Link
                        key={index}
                        to={`/blog/${reading.tag}/${reading.title
                          .split(' ')
                          .join('-')
                          .toLowerCase()}`}
                      >
                        <span>{item.title}</span>
                      </Link>
                    ))
                : null}
            </div>
          </div>
          <div className="pattern">
            <img src={pattern} alt="Pattern" />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});
export default withRouter(connect(mapStateToProps)(UserProfilePage));
