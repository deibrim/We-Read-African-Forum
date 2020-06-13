import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { auth } from '../../firebase/firebase.utils';
import posts from '../../assets/activities/posts.svg';
import star from '../../assets/activities/star.svg';
import calender from '../../assets/info/calender.svg';
import location from '../../assets/info/location.svg';
import time from '../../assets/info/time.svg';
import website from '../../assets/info/website.svg';
import Loader from '../../components/loader/loader';
import StarRating from '../../components/rating/rating';
import MemberActivityBox from '../../components/member-activity-box/member-activity-box';
import ForumSideBar from '../../components/ForumSideBar/ForumSideBar';
import './user-profile-page.scss';
const UserProfilePage = ({ currentUser, history }) => {

  const handleSignout = () => {
    auth.signOut();
    history.push(`/`);
  };
  const getTimeZonee = () => {
    const date = new Date();
    return date.getTimezoneOffset()
  }
  return (
    <div className="user-profile-page main">
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
      {currentUser ? (
        <div className="user-profile">
          <div className="profile-page-header">
            <div className="profile-page-header-image">
              <div className="cover-container">
                {currentUser.cover !== '' ? <img className="cover-image" src={currentUser.cover} alt="cover" /> : null}
              </div>
            </div>
            <div className="profile-pic_buttons">
              <div className="group_">
                <div
                  className="profile-pic"
                  style={currentUser.profile_pic !== '' ? { backgroundImage: `url(${currentUser.profile_pic} )` } : {}}
                >
                </div>
                <br />
                <span>{currentUser.displayName}</span>
              </div>
              <div className="buttons">
                <span className="logout" onClick={handleSignout}>
                  Logout
            </span>
                <Link to="/edit-profile">
                  <span>Edit Profile</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="user-desc_info">
            <div className="rate">
              <span>Member</span>
              <span className="demacator">|</span>
              <StarRating rating={2} />
            </div>
            <div className="desc">
              <span className="bio">{currentUser.bio ? currentUser.bio : ''}</span>
            </div>
            <div className="info">
              <span className="joined">
                {' '}
                <img src={calender} alt="calender icon" /> Joined: {currentUser.createdAt ? new Date(currentUser.createdAt.seconds * 1000).toString().split(' ')
                  .slice(1, 4)
                  .join(' ') : "January 2020"}
              </span>
              <span className="link">
                {' '}
                <img src={website} alt="link icon" />{' '}
                <a href={currentUser.website ? currentUser.website : ''}>
                  {currentUser.website ? currentUser.website : ''}
                </a>
              </span>
              <span className="location">
                {' '}
                <img src={location} alt="location icon" />
                {currentUser.location ? currentUser.location : 'Your Location'}
              </span>
              <span className="timezone">
                {' '}
                <img src={time} alt="time icon" /> {currentUser.createdAt ? new Date(currentUser.createdAt.seconds * 1000).toString().split(' ')
                  .slice(5, 6)
                  .join(' ') : "GMT +1"}
              </span>
            </div>
            <br />
            <span className="signature">
              {currentUser.signature ? currentUser.signature : ''}
            </span>
          </div>
          <div className="member-activity">
            <h4>Member Activity</h4>
            <div className="boxes">
              <MemberActivityBox
                data={{ img: posts, num: currentUser.posts ? currentUser.posts.length : 0, text: 'Forum Posts' }}
              />
              <MemberActivityBox
                data={{ img: star, num: 1, text: 'Rating' }}
              />
            </div>
          </div>
        </div>
      ) : (
          <Loader />
        )}
      {currentUser ? <ForumSideBar /> : null}
    </div>)
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default withRouter(connect(mapStateToProps)(UserProfilePage));
