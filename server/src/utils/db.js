const {connect} = require('mongoose');
const {mongo_url} = require('./secret');

const connectDB = async () => {
  try {
    const conn = await connect(mongo_url);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports ={connectDB};