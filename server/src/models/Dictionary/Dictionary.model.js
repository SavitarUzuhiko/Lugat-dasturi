const {Schema , model} = require('mongoose');

const dictionarySchema = new Schema({
  status:{type: String, required: true, enum:['historical', 'futuristic']},
  word:{type: String, required: true},
  definition:{type: String,optional: true},
  image:{type: String,optional: true}
},{timestamps: true, versionKey: false});

module.exports = model('Dictionary', dictionarySchema);