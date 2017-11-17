import React, { Component } from 'react';
import { ONLINE_USERS } from '../Events';

class OnlineUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };
  }

  componentDidMount() {
    const { socket } = this.props;
    this.initSocket(socket);
  }

  initSocket(socket) {
    socket.on('connect', () => {
      socket.emit(ONLINE_USERS, this.resetUser);
    });
  }

  resetUser = obj => {
    for (var key in obj) {
      console.log(key);
    }

    console.log('------');
  };

  render() {
    return (
      <div className="container">
        <h3>online</h3>
      </div>
    );
  }
}

export default OnlineUsers;
