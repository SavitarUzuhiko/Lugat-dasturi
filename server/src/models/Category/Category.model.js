const {Schema , model} = require('mongoose');

const categorySchema = Schema({
  name:{type: String, required: true},
  dictionary:{type: Schema.Types.ObjectId, ref: 'Dictionary', required: true},
  department:{type: Schema.Types.ObjectId, ref: 'Department', required: true},
},{timestamps: true, versionKey: false});

module.exports = model('Category', categorySchema);