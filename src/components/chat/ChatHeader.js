import React, { Component } from 'react';

class ChatHeader extends Component {
  state = {};
  render() {
    const { name } = this.props;

    return <div>{name}</div>;
  }
}

export default ChatHeader;
