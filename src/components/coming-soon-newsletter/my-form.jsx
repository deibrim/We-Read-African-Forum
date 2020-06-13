import React from 'react';
import './my-form.scss';

class MyForm extends React.Component {
  state = {
    email: '',
    name: '',
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, isSuccess: false });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmitted({
      EMAIL: this.state.email,
    });
    this.setState({ email: '', name: '' });
  };
  render() {
    const newsStyle = {
      padding: '40px 0',
      marginTop: '40px',
      borderTop: '1px solid #77323b',
    };
    const headingStyle = {
      fontSize: '17px',
      fontWeight: 500,
      fontColor: '#77323b',
    };
    const pStyle = {
      fontSize: '13px',
      margin: '10px 0',
    };
    const inputStyle = {
      fontSize: '15px',
      width: '100%',
    };
    const labelStyle = {
      fontSize: '14px',
      marginBottom: '15px',
    };
    const buttonStyle = {
      fontSize: '14px',
      width: '100%',
    };
    return (
      <div className="newsletter">
        <form
          onSubmit={this.handleSubmit}
        >
          <input
            type="text"
            name="name"
            value={this.state.name}
            placeholder="Name *"
            className="form-input"
            onChange={this.handleChange}
          />
          <input
            type="email"
            name="email"
            value={this.state.email}
            placeholder="Email*"
            className="form-input"
            onChange={this.handleChange}
          />
          <button className="btn" >
            Send Me My Bookmarks*
          </button>
        </form>
      </div>
    );
  }
}
export default MyForm;
