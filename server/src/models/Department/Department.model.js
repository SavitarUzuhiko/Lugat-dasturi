const {Schema , model} = require('mongoose');

const departmentSchema = new Schema({
  name:{type: String, required: true},
  dictionary:{type: Schema.Types.ObjectId, ref: 'Dictionary', required: true, autopopulate: true},
  image:{type: String,optional: true}
},{timestamps: true, versionKey: false});

module.exports = model('Department', departmentSchema);