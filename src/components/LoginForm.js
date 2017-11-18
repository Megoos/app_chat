import React, { Component } from 'react';
import { VERIFY_USER } from '../Events';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
      error: ''
    };
  }

  setUser = ({ user, isUser }) => {
    console.log(user, isUser);
    if (isUser) {
      this.setError('Name is busy!...');
    } else {
      this.setError('');
      this.props.setUser(user);
    }
  };

  handleChange = e => {
    this.setState({ nickname: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { socket } = this.props;
    const { nickname } = this.state;
    socket.emit(VERIFY_USER, nickname, this.setUser);
  };

  setError = error => {
    this.setState({ error });
  };

  render() {
    const { nickname, error } = this.state;
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit} className="login-form">
          <label htmlFor="nickname">
            <h3>Enter your name</h3>
          </label>
          <input
            ref={input => {
              this.textInput = input;
            }}
            type="text"
            id="nickname"
            value={nickname}
            onChange={this.handleChange}
            placeholder="Your name"
          />
          <div className="error">{error ? error : null}</div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
