const fs = require('fs')
const Joi = require('joi')
const Blog = require('../model/blog')
const {BACKEND_SERVER_PATH} = require('../config')
const BlogDTO = require('../dto/blog')

const MONGO_ID_REGEX = /^[0-9a-fA-F]{24}$/

const blogController = {
  async create(req, res, next) {
    // DATA VALIDATION
    const createBlogSchema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
      author: Joi.string().regex(MONGO_ID_REGEX).required(),
      image: Joi.string().required(),
    })
    const {error} = createBlogSchema.validate(req.body)
    if (error) return next(error)
    // IMAGE STORAGE
    const {title, content, image: base64Image, author} = req.body
    const image = base64Image.replace(/^data:image\/(png|jpg|jpeg);base64,/, '')
    const buffer = Buffer.from(image, 'base64')
    const imagePath = `storage/${Date.now()}-${author}.png`
    try {
      await fs.writeFileSync(imagePath, buffer)
    } catch (error) {
      return next(error)
    }
    // DATA STORAGE
    let blog
    try {
      blog = new Blog({
        title,
        content,
        author,
        imagePath: `${BACKEND_SERVER_PATH}/${imagePath}`,
      })
      await blog.save()
    } catch (error) {
      return next(error)
    }
    // SEND RESPONSE
    const blogDTO = new BlogDTO(blog)
    return res.status(201).json({blog: blogDTO})
  },
  async getAll(req, res, next) {},
  async getById(req, res, next) {},
  async update(req, res, next) {},
  async delete(req, res, next) {},
}

module.exports = blogController
