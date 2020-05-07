import React from 'react';
import './smart-newsletter.scss';

class SmartNewsletter extends React.Component {
  state = {
    email: '',
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
    this.setState({ email: '' });
  };
  render() {
    return (
      <div className="newslette">
        <h2 className="heading">Subscribe to the WeReadAfrican newsletter</h2>
        <p>Get notification of blog posts, book release info and more</p>
        <form onSubmit={this.handleSubmit}>
          <div className="group-input">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              placeholder="Type in your email"
              className="form-input"
              onChange={this.handleChange}
            />
          </div>
          <button className="btn">SUBSCRIBE</button>
        </form>
      </div>
    );
  }
}
export default SmartNewsletter;
