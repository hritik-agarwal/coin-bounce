const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
  {
    content: {type: String, required: true},
    author: {type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'users'},
    blog: {type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'blogs'},
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Comment', commentSchema, 'comments')
