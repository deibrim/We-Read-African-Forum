import React from 'react';
import pattern from '../../assets/pattern.svg';
import './newsletter-popup.scss';

class NewsletterPopup extends React.Component {
  state = {
    email: ''
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value, isSuccess: false });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmitted({
      EMAIL: this.state.email
    });
    this.setState({ email: '' });
  };
  render() {
    return (
      <div className="newsletter-popup">
        <div className="head">
          <h2 className="heading">Subscribe to our newsletter</h2>
          <p>Get notification of blog posts, book release info and more</p>
        </div>
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
        <div className="pattern">
          <img src={pattern} alt="Pattern" />
        </div>
      </div>
    );
  }
}
export default NewsletterPopup;
