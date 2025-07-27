const {Schema , model} = require('mongoose');

const sectionSchema = new Schema({
  name:{type: String, required: true},
  description:{type: String,optional: true},
  image:{type: String,optional: true}
},{timestamps: true, versionKey: false});

module.exports = model('Section', sectionSchema);