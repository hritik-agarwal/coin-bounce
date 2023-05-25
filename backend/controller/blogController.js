const fs = require('fs')
const Joi = require('joi')
const {v2: cloudinary} = require('cloudinary')
const Blog = require('../model/blog')
const Comment = require('../model/comment')
const {
  // BACKEND_SERVER_PATH,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = require('../config')
const BlogDTO = require('../dto/blog')
const BlogDetailsDTO = require('../dto/blogDetails')

const MONGO_ID_REGEX = /^[0-9a-fA-F]{24}$/

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
})

const blogController = {
  // Create a New Blog
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
    // const image = base64Image.replace(/^data:image\/(png|jpg|jpeg);base64,/, '')
    // const buffer = Buffer.from(image, 'base64')
    // const imagePath = `storage/${Date.now()}-${author}.png`
    let response
    try {
      // await fs.writeFileSync(imagePath, buffer)
      response = await cloudinary.uploader.upload(base64Image)
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
        imagePath: response.url,
      })
      await blog.save()
    } catch (error) {
      return next(error)
    }
    // SEND RESPONSE
    const blogDTO = new BlogDTO(blog)
    return res.status(201).json({blog: blogDTO})
  },

  // Fetching all Blogs
  async getAll(req, res, next) {
    try {
      const blogs = await Blog.find({})
      const blogsDTO = []
      for (let i = 0; i < blogs.length; i++) {
        const blogDTO = new BlogDTO(blogs[i])
        blogsDTO.push(blogDTO)
      }
      return res.status(200).json({blogs: blogsDTO})
    } catch (error) {
      return next(error)
    }
  },

  // Fetching Blog by ID
  async getById(req, res, next) {
    const getByIdSchema = Joi.object({
      id: Joi.string().regex(MONGO_ID_REGEX).required(),
    })
    const {error} = getByIdSchema.validate(req.params)
    if (error) return next(error)
    try {
      const {id} = req.params
      const blog = await Blog.findOne({_id: id}).populate('author')
      const blogDTO = new BlogDetailsDTO(blog)
      return res.status(200).json({blog: blogDTO})
    } catch (error) {
      return next(error)
    }
  },

  // Update Blog by ID
  async update(req, res, next) {
    const updateBlogSchema = Joi.object({
      title: Joi.string(),
      image: Joi.string(),
      content: Joi.string(),
      author: Joi.string().regex(MONGO_ID_REGEX).required(),
      blogId: Joi.string().regex(MONGO_ID_REGEX).required(),
    })
    const {error} = updateBlogSchema.validate(req.body)
    if (error) return next(error)
    const {title, image, content, author, blogId} = req.body
    let blog
    try {
      blog = await Blog.findOne({_id: blogId})
    } catch (error) {
      return next(error)
    }
    if (image) {
      // let previousImage = blog.imagePath.split('/').at(-1)
      // fs.unlinkSync(`storage/${previousImage}`)
      // const newImage = image.replace(/^data:image\/(png|jpg|jpeg);base64,/, '')
      // const buffer = Buffer.from(newImage, 'base64')
      // const imagePath = `storage/${Date.now()}-${author}.png`
      try {
        // await fs.writeFileSync(imagePath, buffer)
        let response = await cloudinary.uploader.upload(photo)
        await Blog.updateOne(
          {_id: blogId},
          {imagePath: response.url, title, content}
        )
      } catch (error) {
        return next(error)
      }
    } else {
      try {
        await Blog.updateOne({_id: blogId}, {title, content})
      } catch (error) {
        return next(error)
      }
    }
    return res.status(200).json({message: 'Blog Updated'})
  },

  // Delete Blog
  async delete(req, res, next) {
    const deleteByIdSchema = Joi.object({
      id: Joi.string().regex(MONGO_ID_REGEX).required(),
    })
    const {error} = deleteByIdSchema.validate(req.params)
    if (error) return next(error)
    try {
      const {id} = req.params
      await Blog.deleteOne({_id: id})
      await Comment.deleteMany({blog: id})
    } catch (error) {
      return next(error)
    }
    return res.status(200).json({message: 'Blog Deleted'})
  },
}

module.exports = blogController
