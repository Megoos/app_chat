import React, { Component } from 'react';
import ChatHeader from './ChatHeader';
import Messages from './Messages';
import MessageInput from './MessageInput';
import {
  CHAT,
  MESSAGE_SENT,
  MESSAGE_RECIEVED,
  TYPING,
  TYPING_REC
} from '../../Events';

class ChatConainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chats: [],
      activeChat: null
    };
  }

  componentDidMount() {
    const { socket } = this.props;
    socket.emit(CHAT, this.addChat);
  }

  addChat = chat => {
    const { socket } = this.props;

    const newChats = [chat];
    this.setState({
      chats: newChats,
      activeChat: chat
    });

    socket.on(TYPING_REC, this.updateTypingInChat(chat.id));
    socket.on(MESSAGE_RECIEVED, this.addMessageToChat(chat.id));
  };

  /*Return function that will adds message */
  addMessageToChat = chatId => {
    return message => {
      const { chats } = this.state;
      let newChats = chats.map(chat => {
        if (chat.id === chatId) chat.messages.push(message);
        return chat;
      });

      this.setState({ chats: newChats });
    };
  };

  /*Updates typing chat*/
  updateTypingInChat = chatId => {
    return ({ isTyping, user }) => {
      if (user !== this.props.user.name) {
        const { chats } = this.state;

        let newChats = chats.map(chat => {
          if (chat.id === chatId) {
            if (isTyping && !chat.typingUsers.includes(user)) {
              chat.typingUsers.push(user);
            } else if (!isTyping && chat.typingUsers.includes(user)) {
              chat.typingUsers = chat.typingUsers.filter(u => u !== user);
            }
          }
          return chat;
        });
        this.setState({ chats: newChats });
      }
    };
  };

  // send mesage in chat
  sendMessage = (chatId, message) => {
    const { socket } = this.props;
    socket.emit(MESSAGE_SENT, { chatId, message });
  };

  // send status typing to server
  sendTyping = (chatId, isTyping) => {
    const { socket } = this.props;
    socket.emit(TYPING, { chatId, isTyping });
  };

  render() {
    const { user } = this.props;
    const { activeChat } = this.state;
    return (
      <div className="chat-room-container">
        {activeChat !== null ? (
          <div className="chat-room">
            <ChatHeader name={activeChat.name} />
            <Messages
              messages={activeChat.messages}
              user={user}
              typingUsers={activeChat.typingUsers}
            />
            <MessageInput
              sendMessage={message => {
                this.sendMessage(activeChat.id, message);
              }}
              sendTyping={isTyping => {
                this.sendTyping(activeChat.id, isTyping);
              }}
              user={user}
            />
          </div>
        ) : (
          <div className="chat-room choose">
            <h3>Chat is null</h3>
          </div>
        )}
      </div>
    );
  }
}

export default ChatConainer;
