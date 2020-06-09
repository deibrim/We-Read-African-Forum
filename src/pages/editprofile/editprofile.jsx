import React from 'react';
import firebase from 'firebase/app';
import { Link, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { uploadImage, updateProfile } from '../../firebase/firebase.utils';
import { ImageUrl } from '../../firebase/imageurl';
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
      cover: this.props.currentUser.cover
        ? this.props.currentUser.cover
        : '',
      pp: this.props.currentUser.profile_pic
        ? this.props.currentUser.profile_pic
        : '',
      signature: this.props.currentUser.signature
        ? this.props.currentUser.signature
        : '',
    });
  }

  handleCoverChange = async (e) => {
    this.setState({ isLoading: true });
    const selectedFile = e.target.files[0]
    this.fetchImageUrl(selectedFile, 'cover', 'cover')
  };

  handlePpChange = async (e) => {
    this.setState({ isLoading: true });
    const selectedFile = e.target.files[0]
    this.fetchImageUrl(selectedFile, 'profile-pic', 'pp')
  };

  fetchImageUrl = async (selectedFile, dest, sta) => {
    const storageRef = firebase.storage().ref(`users/${this.props.currentUser.id}/${dest}/${selectedFile}`)
    const uploadTask = storageRef.put(selectedFile);
    uploadTask.on('state_changed', snapshot => {
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED:
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING:
          console.log('Upload is running');
          break;
      }
    }, error => {
      console.log(error);
    }, () => {
      // get the uploaded image url back 
      uploadTask.snapshot.ref.getDownloadURL().then(
        downloadURL => {
          sta === 'pp' ?
            this.setState({ pp: downloadURL }, () => console.log(this.state)) : this.setState({ cover: downloadURL }, () => console.log(this.state))
        });
    });
    this.setState({ isLoading: false })
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
      pp, cover,
      signature,
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
              <img className="cover-image" src={cover} alt="cover" />
            </div>
            <div className="ctrls">
              <div className="upload-btn-wrapper">
                <img src={cam} alt="upload icon" />
                <input
                  type="file"
                  name="cover"
                  accept="image/gif, image/jpeg, image/png"
                  onChange={this.handleCoverChange}
                />
              </div>
              <img src={cancel} alt="cancel icon" />
            </div>
          </div>
          <div className="profile-pic_buttons">
            <div className="profile-pic" style={{ backgroundImage: `url(${pp})` }}>
              <div className="pp">
                <div className="upload-btn-wrapper">
                  <img src={cam} alt="upload icon" />
                  <input
                    type="file"
                    name="pp"
                    accept="image/gif, image/jpeg, image/png"
                    onChange={this.handlePpChange}
                  />
                </div>
              </div>
              <img src={map} alt="profile pic" className="africamap" />
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
