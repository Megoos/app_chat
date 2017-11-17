import React, { Component } from 'react';
import io from 'socket.io-client';
import LoginForm from './LoginForm';
import OnlineUsers from './OnlineUsers';
import { USER_CONNECTED, LOGOUT } from '../Events';
const socketUrl = 'http://192.168.0.105:3231';

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: null,
      user: null
    };
  }

  componentWillMount() {
    this.initSocket();
  }

  // подключение и инициализация сокета
  initSocket = () => {
    const socket = io(socketUrl);
    socket.on('connect', () => {
      console.log('connected');
    });
    this.setState({ socket });
  };

  // инициализация юзера

  setUser = user => {
    const { socket } = this.state;
    socket.emit(USER_CONNECTED, user);
    this.setState({ user });
  };

  logout = () => {
    const { socket } = this.state;
    socket.emit(LOGOUT);
    this.setState({ user: null });
  };

  render() {
    const { socket, user } = this.state;
    const { title } = this.props;
    return (
      <div className="container">
        <h2>{title}</h2>
        {!user ? (
          <LoginForm socket={socket} setUser={this.setUser} />
        ) : (
          <div>You, {user.name}!</div>
        )}

        <OnlineUsers socket={socket} />
      </div>
    );
  }
}

export default Layout;
