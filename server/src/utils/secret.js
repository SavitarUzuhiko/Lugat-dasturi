require('dotenv').config();
const secret = {
  mongo_url: process.env.MONGO_URL || 'mongodb://localhost:27017/newToDo',
  port: process.env.PORT|| 3000
}

module.exports = secret