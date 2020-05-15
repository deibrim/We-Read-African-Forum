import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  auth,
  signInWithGoogle,
  signInWithFacebook,
  createUserProfileDocument
} from '../../firebase/firebase.utils';
import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';

import loader from '../../assets/loader.gif';
import google from '../../assets/google.svg';
import facebook from '../../assets/socials/facebook.svg';

import './sign-up.scss';

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      displayName: '',
      email: '',
      password: '',
      isShowPassword: false,
      confirmPassword: '',
      errorMessage: '',
      isLoading: false
    };
  }
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value, errorMessage: '' });
  };
  handleToggleShowPassword = () =>
    this.setState({ isShowPassword: !this.state.isShowPassword });
  handleSubmit = async e => {
    e.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      this.setState({
        errorMessage: `Password did not match!`
      });
      return;
    }
    const actionCodeSettings = {
      url: 'https://www.example.com/finishSignUp?cartId=1234',
      handleCodeInApp: true,
      iOS: {
        bundleId: 'com.example.ios'
      },
      android: {
        packageName: 'com.example.android',
        installApp: true,
        minimumVersion: '12'
      },
      dynamicLinkDomain: 'example.page.link'
    };
    
    try {
      this.setState({ isLoading: true });
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createUserProfileDocument(user, { displayName });
      await auth.sendSignInLinkToEmail(email, actionCodeSettings)
      this.setState({ isSuccess: true });
    } catch (error) {
      error.code === 'auth/email-already-in-use'
        ? this.setState({
            isLoading: false,
            errorMessage:
              'The email address is already in use by another account'
          })
        : error.code === 'auth/weak-password'
        ? this.setState({
            isLoading: false,
            errorMessage: 'Password should be at least 6 characters'
          })
        : this.setState({ isLoading: false, errorMessage: 'Wierd' });
    }
    this.setState({
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };
  render() {
    const {
      displayName,
      email,
      password,
      confirmPassword,
      isShowPassword,
      errorMessage,
      isLoading
    } = this.state;
    return (
      <div className="sign-up">
        <h3 className="title">Create a New Account</h3>
        {errorMessage !== '' ? (
          <span className="error">{errorMessage}</span>
        ) : null}
        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            label="Full name"
            onChange={this.handleChange}
          />
          <FormInput
            type="email"
            name="email"
            value={email}
            label="Email"
            onChange={this.handleChange}
          />
          <FormInput
            type={isShowPassword ? 'text' : 'password'}
            name="password"
            value={password}
            label="Password"
            onChange={this.handleChange}
            toggleShowPassword={this.handleToggleShowPassword}
            isShowPass={this.state.isShowPassword}
          />
          <FormInput
            type={isShowPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={confirmPassword}
            label="Confirm password"
            onChange={this.handleChange}
            toggleShowPassword={this.handleToggleShowPassword}
            isShowPass={this.state.isShowPassword}
          />
          <div className="buttons">
            <CustomButton type="submit">
              Create Account{' '}
              {isLoading ? <img src={loader} alt="Loader" /> : null}
            </CustomButton>
          </div>
          <p className="or-sign-in-with">Or sign in with:</p>
          <div className="buttons">
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
              <img src={google} alt="Google Logo" /> Google Login
            </CustomButton>
            <CustomButton onClick={signInWithFacebook} isFacebookSignIn>
              <img src={facebook} alt="Facebook Logo" /> Facebook Login
            </CustomButton>
          </div>
        </form>
        <p>
          {' '}
          Already have an account?{' '}
          <Link to="/signin">
            <span>Sign In</span>
          </Link>
        </p>
      </div>
    );
  }
}
