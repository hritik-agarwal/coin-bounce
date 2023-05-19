const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
  {
    content: {type: String, required: true},
    author: {type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'User'},
    blog: {type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'Blog'},
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Comment', commentSchema, 'comments')
