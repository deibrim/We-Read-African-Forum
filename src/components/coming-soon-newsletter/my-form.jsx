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
      FNAME: this.state.name.split(' ')[0],
      LNAME: this.state.name.split(' ')[1] ? this.state.name.split(' ')[1] : '',
      EMAIL: this.state.email,
    });
    this.setState({ email: '', name: '' });
  };
  render() {
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
