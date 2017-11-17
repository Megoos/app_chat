const uuidv4 = require('uuid/v4');

//создания пользователя

const createUser = ({ name }) => ({
  id: uuidv4(),
  name: name
});

//создание сообщения
const createMessage = () => {};

const createChat = () => {};

module.exports = {
  createChat,
  createMessage,
  createUser
};
