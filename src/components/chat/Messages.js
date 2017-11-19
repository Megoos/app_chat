import React, { Component } from 'react';

export default class Messages extends Component {
  constructor(props) {
    super(props);

    this.scrollDown = this.scrollDown.bind(this);
  }

  scrollDown() {
    const { container } = this.refs;
    container.scrollTop = container.scrollHeight;
  }

  componentDidMount() {
    this.scrollDown();
  }

  componentDidUpdate(prevProps, prevState) {
    this.scrollDown();
  }

  handleClickSender = e => {
    const { onClickUser } = this.props;

    onClickUser(e.target.textContent);
  };

  render() {
    const { messages, user, typingUsers } = this.props;
    return (
      <div ref="container" className="thread-container">
        <div className="thread">
          {messages.map(mes => {
            return (
              <div
                key={mes.id}
                className={`message-container ${user
                  ? mes.sender === user.name && 'right'
                  : ''} ${user
                  ? mes.message.indexOf(`@${user.name} `) + 1 && 'you'
                  : ''}`}
              >
                <div className="time">{mes.time}</div>
                <div
                  ref="sender"
                  className="name"
                  onClick={this.handleClickSender}
                >
                  {mes.sender}
                </div>

                <div className={`message`}>{mes.message}</div>
              </div>
            );
          })}
          {typingUsers.map(name => {
            return (
              <div key={name} className="typing-user">
                {`${name} is typing . . .`}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
