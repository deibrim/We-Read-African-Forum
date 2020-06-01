import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { auth } from '../../firebase/firebase.utils';
import pattern from '../../assets/pattern.svg';
import africamap from '../../assets/africamap.svg';
import posts from '../../assets/activities/posts.svg';
import Loader from '../../components/loader/loader';
import userIco from '../../assets/userIco.svg';
import logo from '../../assets/logo.svg';
import logout from '../../assets/logout.svg';
import './user-profile-page.scss';
import StarRating from '../../components/rating/rating';
import MemberActivityBox from '../../components/member-activity-box/member-activity-box';
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
      <div className="profile-page-header">
        <div className="profile-page-header-image">Header Image</div>
        <div className="profile-pic_buttons">
          <div className="profile-pic">
            <img src={africamap} alt="profile picture" className="pp" />
            <br />
            <span>Jaden Tega</span>
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
          <span>Product Designer | Music Lover | LMB</span>
        </div>
        <div className="info">
          <span className="joined">Joined: January 2020</span>
          <span className="link">
            {' '}
            <a href="">tinycc/pleugz</a>
          </span>
          <span className="location">Lagos, Nigeria</span>
          <span className="timezone">GMT +1</span>
        </div>
        <div className="signature">
          <span>signature Image</span>
        </div>
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
