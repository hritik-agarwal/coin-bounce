const Joi = require('joi')
const Comment = require('../model/comment')
const CommentDTO = require('../dto/comment')

const MONGO_ID_REGEX = /^[0-9a-fA-F]{24}$/

const commentController = {
  // Creating a Comment
  async create(req, res, next) {
    const createCommentSchema = Joi.object({
      content: Joi.string().required(),
      author: Joi.string().regex(MONGO_ID_REGEX).required(),
      blog: Joi.string().regex(MONGO_ID_REGEX).required(),
    })
    const {error} = createCommentSchema.validate(req.body)
    if (error) return next(error)
    try {
      const {content, author, blog} = req.body
      const newComment = new Comment({content, author, blog})
      await newComment.save()
      return res.status(200).json({message: 'Comment Created'})
    } catch (error) {
      return next(error)
    }
  },

  // Fetching Blog Comments
  async getCommentByBlogId(req, res, next) {
    const getCommentByBlogIdSchema = Joi.object({
      id: Joi.string().regex(MONGO_ID_REGEX).required(),
    })
    const {error} = getCommentByBlogIdSchema.validate(req.params)
    try {
      const {id} = req.params
      const comments = await Comment.find({blog: id}).populate('author')
      const commentList = []
      for (let i = 0; i < comments.length; i++) {
        const commentDTO = new CommentDTO(comments[i])
        commentList.push(commentDTO)
      }
      return res.status(200).json({data: commentList})
    } catch (error) {
      return next(error)
    }
  },
}

module.exports = commentController
