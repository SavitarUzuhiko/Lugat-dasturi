const {Schema , model} = require('mongoose');

const AuthSchema = new Schema({
  email:{type: String, required: true, unique: true},
  password:{type: String, required: true},
  isActivate:{type: Boolean, default: false},
},{timestamps: true, versionKey: false});

module.exports = model('Auth', AuthSchema);