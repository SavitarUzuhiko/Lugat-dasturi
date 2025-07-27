const {Schema , model} = require('mongoose');

const categorySchema = Schema({
  name:{type: String, required: true},
  dictionary:{type: Types.ObjectId, ref: 'Dictionary', required: true},
  department:{type: Types.ObjectId, ref: 'Department', required: true},
});

module.exports = model('Category', categorySchema);