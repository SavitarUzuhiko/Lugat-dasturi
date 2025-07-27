const {Schema, model} = require('mongoose');

const wordSchema = Schema({
  word:{type: String, required: true},
  definition:{type: String,optional: true},
  category:{type: Types.ObjectId, ref: 'Category', required: true},
  image:{type: String,optional: true},
});

module.exports = model('Word', wordSchema);