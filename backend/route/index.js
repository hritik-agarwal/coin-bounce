const express = require('express')

const router = express.Router()
const authHandler = require('../middleware/auth')
const authController = require('../controller/authController')
const blogController = require('../controller/blogController')
const commentController = require('../controller/commentController')

router.get('/', (req, res) => res.json('Working!'))

// user - register, login, logout, refresh
router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/logout', authHandler, authController.logout)
router.post('/refresh', authController.refresh)

// blog - create, read all, read by id, update, delete
router.post('/blog', authHandler, blogController.create)
router.get('/blog/all', authHandler, blogController.getAll)
router.get('/blog/:id', authHandler, blogController.getById)
router.put('/blog', authHandler, blogController.update)
router.delete('/blog/:id', authHandler, blogController.delete)

// comment - create, read by blog id
router.post('/comment', authHandler, commentController.create)
router.get('/comment/:id', authHandler, commentController.getCommentByBlogId)

module.exports = router
