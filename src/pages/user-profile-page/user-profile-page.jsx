import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { auth } from '../../firebase/firebase.utils';
// import pattern from '../../assets/pattern.svg';
import map from '../../assets/africa/map-primary.svg';
import posts from '../../assets/activities/posts.svg';
import calender from '../../assets/info/calender.svg';
import location from '../../assets/info/location.svg';
import time from '../../assets/info/time.svg';
import website from '../../assets/info/website.svg';
import Loader from '../../components/loader/loader';
import StarRating from '../../components/rating/rating';
import MemberActivityBox from '../../components/member-activity-box/member-activity-box';
import './user-profile-page.scss';
const UserProfilePage = ({ currentUser, history }) => {
  const [state, setState] = useState({ cover: '', pp: '' });
  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        let coverUrl = '';
        let ppUrl = '';
        const imagePp = await firebase
          .storage()
          .ref()
          .child(`users/${currentUser.id}/profile-pic`)
          .listAll();
        imagePp.items.forEach(async (itemRef) => {
          const url = await itemRef.getDownloadURL();
          ppUrl = url;
        });
        const imageCover = await firebase
          .storage()
          .ref()
          .child(`users/${currentUser.id}/cover`)
          .listAll();
        imageCover.items.forEach(async (itemRef) => {
          const url = await itemRef.getDownloadURL();
          coverUrl = url;
          setState({ cover: coverUrl, pp: ppUrl });
        });
      }
    };
    fetchData();
  }, [currentUser]);
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
      <div className="profile-page-header">
        <div className="profile-page-header-image">
          <div className="cover-container">
            <img className="cover-image" src={state.cover} alt="cover" />
          </div>
        </div>
        <div className="profile-pic_buttons">
          <div className="group">
            <div
              className="profile-pic"
              style={{ backgroundImage: 'url(' + state.pp + ')' }}
            >
              <img src={map} alt="profile picture" className="profile-p" />
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
            {currentUser.location ? currentUser.location : ''}
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
            data={{ img: posts, num: '2,222', text: 'Forum Posts' }}
          />
        </div>
      </div>
    </div>
  ) : (
      <Loader />
    );
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default withRouter(connect(mapStateToProps)(UserProfilePage));
