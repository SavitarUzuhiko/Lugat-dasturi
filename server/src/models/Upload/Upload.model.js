const { Schema, model } = require('mongoose');

const UploadSchema = new Schema(
  {
    filePath: { type: String, required: true },
    is_use: { type: Boolean, required: true, default: false }
  },
  { timestamps: true, versionKey: false }
);

module.exports = model('Save_File', UploadSchema);
