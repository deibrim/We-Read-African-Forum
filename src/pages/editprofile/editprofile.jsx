import React from 'react';
import firebase from 'firebase/app';
import { Link, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { uploadImage, updateProfile } from '../../firebase/firebase.utils';
import cancel from '../../assets/cancel.svg';
import cam from '../../assets/cam.svg';
import map from '../../assets/africa/map-primary.svg';
import FormInput from '../../components/form-input/form-input';
import Loader from '../../components/loader/loader';
import './editprofile.scss';
class EditProfile extends React.Component {
  state = {
    fullName: '',
    bio: '',
    website: '',
    pp: '',
    cover: '',
    location: '',
    signature: '',
    isLoading: false,
  };
  componentDidMount() {
    this.setState({
      fullName: this.props.currentUser.displayName
        ? this.props.currentUser.displayName
        : '',
      bio: this.props.currentUser.bio ? this.props.currentUser.bio : '',
      website: this.props.currentUser.website
        ? this.props.currentUser.website
        : '',
      location: this.props.currentUser.location
        ? this.props.currentUser.location
        : '',
      signature: this.props.currentUser.signature
        ? this.props.currentUser.signature
        : '',
    });
  }
  handleCoverChange = async (e) => {
    await uploadImage(e.target.files[0], 'cover');
    await this.fetchImageUrl('cover', 'cover-image');
  };
  handlePpChange = async (e) => {
    this.setState({ isLoading: true });
    await uploadImage(e.target.files[0], 'profile-pic');
    await this.fetchImageUrl('profile-pic', 'profile-pic')
    this.setState({ isLoading: false })
  };
  fetchImageUrl = async (dest, sta) => {
    const imagePp = await firebase
      .storage()
      .ref()
      .child(`users/${this.props.currentUser.id}/${dest}`)
      .listAll();
    let url
    imagePp.items.forEach(async (itemRef) => {
      const output = document.querySelector(`.${sta}`);
      // url = await itemRef.getDownloadURL();
      itemRef.getDownloadURL().then((url) => {
        if (dest === "cover") {
          output.src = url
          this.setState({ cover: url }, () => console.log(this.state))
        }
        output.style.backgroundImage = 'url(' + url + ')'
        this.setState({ pp: url }, () => console.log(this.state))
      })

    });
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleSave = async () => {
    const {
      fullName,
      bio,
      website,
      location,
      pp,
      cover,
      signature,
    } = this.state;
    const incomingData = {
      fullName,
      bio,
      website,
      cover,
      profile_pic: pp,
      location,
      signature,
    };
    console.log(incomingData);
    await updateProfile(this.props.currentUser.id, incomingData);
    this.props.history.push('/my-profile');
  };
  render() {
    const { currentUser } = this.props;
    const {
      fullName,
      bio,
      website,
      location,
      signature,
      pp,
      cover,
    } = this.state;
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
            content="https://www.wereadafrican.com/my-profile"
          />
        </Helmet>
        {/* {this.state.isLoading ? (
          <Loader />
        ) : (
            <> */}
        <div className="profile-edit-page-header">
          <div className="edit-control">
            <div className="cancel_title">
              <Link to="/my-profile">
                <img src={cancel} alt="cancel icon" />
              </Link>
              <span>Edit Profile</span>
            </div>
            <span className="save" onClick={this.handleSave}>
              Save
                </span>
          </div>
          <div className="profile-page-header-image">
            <div className="cover-container">
              <img className="cover-image" alt="cover" />
            </div>
            <div className="ctrls">
              <div className="upload-btn-wrapper">
                <img src={cam} alt="upload icon" />
                <input
                  type="file"
                  name="cover"
                  value={cover}
                  accept="image/gif, image/jpeg, image/png"
                  onChange={this.handleCoverChange}
                />
              </div>
              <img src={cancel} alt="cancel icon" />
            </div>
          </div>
          <div className="profile-pic_buttons">
            <div className="profile-pic">
              <div className="pp">
                <div className="upload-btn-wrapper">
                  <img src={cam} alt="upload icon" />
                  <input
                    type="file"
                    name="pp"
                    value={pp}
                    accept="image/gif, image/jpeg, image/png"
                    onChange={this.handlePpChange}
                  />
                </div>
              </div>
              <img src={map} alt="profile picture" className="africamap" />
              <br />
            </div>
          </div>
        </div>
        <form onSubmit={this.handleSave}>
          <FormInput
            type="text"
            name="fullName"
            value={fullName}
            label="Fullname"
            onChange={this.handleChange}
          />
          <FormInput
            type="text"
            name="bio"
            value={bio}
            label="Bio"
            onChange={this.handleChange}
          />
          <FormInput
            type="text"
            name="website"
            value={website}
            label="Website"
            onChange={this.handleChange}
          />
          <FormInput
            type="text"
            name="location"
            value={location}
            label="Location"
            onChange={this.handleChange}
          />
          <FormInput
            type="text"
            name="signature"
            value={signature}
            label="Signature"
            onChange={this.handleChange}
          />
        </form>
        {/* </>
          )} */}
      </div>
    ) : (
        <Loader />
      );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default withRouter(connect(mapStateToProps)(EditProfile));
