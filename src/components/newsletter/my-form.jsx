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
      <div className="newsletter" style={this.props.sidebar ? newsStyle : {}}>
        <h2 className="heading" style={this.props.sidebar ? headingStyle : {}}>
          Subscribe to the WeReadAfrican newsletter
        </h2>
        <p style={this.props.sidebar ? pStyle : {}}>
          Get notification of blog posts, book release info and more
        </p>
        <form
          onSubmit={this.handleSubmit}
          style={this.props.sidebar ? headingStyle : {}}
        >
          <div className="group-input">
            <label style={this.props.sidebar ? labelStyle : {}}>
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              placeholder="Type in your full name"
              className="form-input"
              onChange={this.handleChange}
              style={this.props.sidebar ? inputStyle : {}}
            />
          </div>
          <div className="group-input">
            <label style={this.props.sidebar ? labelStyle : {}}>Email</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              placeholder="Type in your email"
              className="form-input"
              onChange={this.handleChange}
              style={this.props.sidebar ? inputStyle : {}}
            />
          </div>
          <button className="btn" style={this.props.sidebar ? buttonStyle : {}}>
            SUBSCRIBE
          </button>
        </form>
      </div>
    );
  }
}
export default MyForm;
