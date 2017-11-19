import React, { Component } from 'react';

export default class MessageInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      isTyping: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.sendMessage();
    this.setState({ message: '' });
  };

  sendMessage = () => {
    this.props.sendMessage(this.state.message);
  };

  componentWillUnmount() {
    this.stopCheckingTyping();
  }

  sendTyping = () => {
    this.lastUpdateTime = Date.now();
    if (!this.state.isTyping) {
      this.setState({ isTyping: true });
      this.props.sendTyping(true);
      this.startCheckingTyping();
    }
  };

  /*
	*	startCheckingTyping
	*/
  startCheckingTyping = () => {
    console.log('Typing');
    this.typingInterval = setInterval(() => {
      if (Date.now() - this.lastUpdateTime > 300) {
        this.setState({ isTyping: false });
        this.stopCheckingTyping();
      }
    }, 300);
  };

  /*
	*	stopCheckingTyping
	*/
  stopCheckingTyping = () => {
    console.log('Stop Typing');
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
      this.props.sendTyping(false);
    }
  };

  handleChange = e => {
    const { resetInput, valInput } = this.props;
    this.setState({ message: e.target.value });
    document.querySelector('.form-control').focus();
    if (valInput.length > 0) resetInput();
  };

  render() {
    const { message } = this.state;
    const { user, valInput } = this.props;
    return (
      <div className="message-input">
        <form onSubmit={this.handleSubmit} className="message-form">
          <input
            id="message"
            type="text"
            className="form-control"
            value={`${valInput}${message}`}
            autoComplete={'off'}
            placeholder={
              user ? 'Type your message' : 'Enter your name to write'
            }
            onKeyUp={e => {
              e.keyCode !== 13 && this.sendTyping();
            }}
            onChange={this.handleChange}
            disabled={!user}
          />
          <button disabled={message.length < 1} type="submit" className="send">
            Send
          </button>
        </form>
      </div>
    );
  }
}
