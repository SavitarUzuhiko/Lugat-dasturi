const { Schema, model } = require('mongoose');

const UploadSchema = new Schema(
  {
    filePath: { type: String, required: true },
    is_use: { type: Boolean, required: true, default: false },
    where_used:{
      type:String,
      enum:['word', 'dictionary', 'department', 'category']
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = model('Save_File', UploadSchema);
