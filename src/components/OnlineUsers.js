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
    //socket.emit
    socket.on(ONLINE_USERS, this.resetUser());
  }

  resetUser = () => {
    return user => {
      //const { users } = this.state;
      let newUsers = [];
      for (let key in user) {
        newUsers.push(user[key]);
      }

      this.setState({ users: newUsers });
    };
  };

  render() {
    const { users } = this.state;
    const { user } = this.props;
    return (
      <div className="online">
        <h3>Users online:</h3>

        {users.map(userItem => {
          if (user === null || user.name !== userItem.name) {
            return (
              <div className="online-item" key={userItem.id}>
                {userItem.name}
              </div>
            );
          } else {
            return '';
          }
        })}
      </div>
    );
  }
}

export default OnlineUsers;
