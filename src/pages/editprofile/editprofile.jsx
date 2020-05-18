import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import cancel from '../../assets/cancel.svg';
import cam from '../../assets/cam.svg';
import africamap from '../../assets/africamap.svg';
import FormInput from '../../components/form-input/form-input';
import Loader from '../../components/loader/loader';
import './editprofile.scss';
const EditProfile = ({ currentUser, history }) => {
  const [state, setState] = useState({
    fullName: '',
    bio: '',
    website: '',
    location: '',
    signature: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ [name]: value });
  };
  const handelSave = () => {
    history.push('/user-profile');
  };
  const { fullName, bio, website, location, signature } = state;
  return currentUser ? (
    <div className="profile-edit-page">
      <Helmet>
        <title>We Read African &mdash; Edit Profile</title>
        <meta
          property="og:title"
          content="We Read African &mdash; Edit Profile"
        />
        <meta property="og:type" content="website" />
        <meta name="description" content=" " />
        <meta property="og:site_name" content="We Read African" />
        <meta
          property="og:url"
          content="https://www.wereadafrican.com/user-profile"
        />
      </Helmet>
      <div className="profile-edit-page-header">
        <div className="edit-control">
          <div className="cancel_title">
            <Link to="/user-profile">
              <img src={cancel} alt="cancel icon" />
            </Link>
            <span>Edit Profile</span>
          </div>
          <span className="save" onClick={handelSave}>
            Save
          </span>
        </div>
        <div className="profile-page-header-image">
          <div className="ctrls">
            <img src={cam} alt="upload icon" />

            <img src={cancel} alt="cancel icon" />
          </div>
        </div>
        <div className="profile-pic_buttons">
          <div className="profile-pic">
            <span className="">
              <img src={cam} alt="upload icon" />
              <img src={africamap} alt="profile picture" className="pp" />
            </span>
            <br />
          </div>
        </div>
      </div>
      <form onSubmit={handelSave}>
        <FormInput
          type="text"
          name="fullName"
          value={fullName}
          label="Fullname"
          onChange={handleChange}
        />
        <FormInput
          type="text"
          name="bio"
          value={bio}
          label="Bio"
          onChange={handleChange}
        />
        <FormInput
          type="text"
          name="website"
          value={website}
          label="Website"
          onChange={handleChange}
        />
        <FormInput
          type="text"
          name="location"
          value={location}
          label="Location"
          onChange={handleChange}
        />
        <FormInput
          type="text"
          name="signature"
          value={signature}
          label="Signature"
          onChange={handleChange}
        />
      </form>
    </div>
  ) : (
    <Loader />
  );
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default withRouter(connect(mapStateToProps)(EditProfile));
