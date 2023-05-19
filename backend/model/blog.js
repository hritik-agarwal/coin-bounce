const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema(
  {
    title: {type: String, required: true},
    content: {type: String, required: true},
    imagePath: {type: String, required: true},
    author: {type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'User'},
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Blog', blogSchema, 'blogs')
