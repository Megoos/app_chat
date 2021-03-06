const io = require('./index.js').io;
const { createUser, createMessage, createChat } = require('../Action');

const {
  VERIFY_USER,
  USER_CONNECTED,
  USER_DISCONNECTED,
  CHAT,
  MESSAGE_RECIEVED,
  MESSAGE_SENT,
  TYPING,
  ONLINE_USERS,
  TYPING_REC
} = require('../Events');

let connectedUsers = {};

let communityChat = createChat();

module.exports = function(socket) {
  // console.log('\x1bc'); //clears console
  console.log('Socket Id:' + socket.id);

  let sendMessageToChatFromUser;

  let sendTypingFromUser;

  //Verify Username
  socket.on(VERIFY_USER, (nickname, callback) => {
    if (isUser(connectedUsers, nickname)) {
      callback({ user: null, isUser: true });
    } else {
      callback({ user: createUser({ name: nickname }), isUser: false });
    }
  });

  //User Connects with username
  socket.on(USER_CONNECTED, user => {
    connectedUsers = addUser(connectedUsers, user);
    socket.user = user;

    sendMessageToChatFromUser = sendMessageToChat(user.name);
    sendTypingFromUser = sendTypingToChat(user.name);

    io.emit(USER_CONNECTED, connectedUsers);
    io.emit(ONLINE_USERS, connectedUsers);
    console.log(connectedUsers);
  });

  //User disconnects
  socket.on('disconnect', () => {
    if ('user' in socket) {
      connectedUsers = removeUser(connectedUsers, socket.user.name);

      io.emit(USER_DISCONNECTED, connectedUsers);
      io.emit(ONLINE_USERS, connectedUsers);
      console.log('Disconnect', connectedUsers);
    }
  });

  //get online users
  socket.emit(ONLINE_USERS, connectedUsers);

  //Get Community Chat
  socket.on(CHAT, callback => {
    callback(communityChat);
  });

  socket.on(MESSAGE_SENT, ({ chatId, message }) => {
    sendMessageToChatFromUser(chatId, message);
  });

  socket.on(TYPING, ({ chatId, isTyping }) => {
    sendTypingFromUser(chatId, isTyping);
  });
};

function sendTypingToChat(user) {
  return (chatId, isTyping) => {
    io.emit(TYPING_REC, { user, isTyping });
  };
}

function sendMessageToChat(sender) {
  return (chatId, message) => {
    io.emit(MESSAGE_RECIEVED, createMessage({ message, sender }));
  };
}

// function addUser(userList, user) {
//   let newList = Object.assign({}, userList);
//   newList[user.name] = user;
//   return newList;
// }

function addUser(userList, user) {
  return { ...userList, [user.name]: user };
}

function removeUser(userList, username) {
  let newList = { ...userList };
  delete newList[username];
  return newList;
}

function isUser(userList, username) {
  return username in userList;
}
