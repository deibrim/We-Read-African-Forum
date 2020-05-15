import React from 'react';
import { auth } from '../../firebase/firebase.utils';
import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';
import './forgot-password.scss';
export default class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      errorMessage: '',
      isLoading: false
    };
  }
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      errorMessage: ''
    });
  };
  handleSubmit = async event => {
    event.preventDefault();
    const { email } = this.state;

    try {
      this.setState({ isLoading: true });
      await auth.sendPasswordResetEmail(email);
      this.setState({ email: '' });
    } catch (error) {
      error.code === 'auth/wrong-password'
        ? this.setState({
            isLoading: false,
            errorMessage:
              'The password is invalid or the user does not have a password.'
          })
        : error.code === 'auth/user-not-found'
        ? this.setState({
            isLoading: false,
            errorMessage:
              'There is no user record corresponding to this identifier.'
          })
        : this.setState({ isLoading: false, errorMessage: 'Wierd' });
    }
  };
  render() {
    const { email } = this.state;
    return (
      <div className="forgot-password-box">
        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            required
            handleChange={this.handleChange}
            label="Email"
          />
          <div className="btn">
            <CustomButton type="button" onClick={this.handleSubmit}>
              Reset Password
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}
