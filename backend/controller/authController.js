const Joi = require('joi')
const bcryptjs = require('bcryptjs')
const User = require('../model/user')
const UserDTO = require('../dto/user')
const RefreshToken = require('../model/token')
const JWTService = require('../service/JWTService')

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,25}$/

const authController = {
  // register user
  async register(req, res, next) {
    // 1. Input Validation & Duplicate Checking
    // 2. Password Hashing & Storing Data in Database
    // 3. Generate, Store JWT Tokens & Send Response
    const userRegisterSchema = Joi.object({
      name: Joi.string().max(30).required(),
      email: Joi.string().email().required(),
      username: Joi.string().min(5).max(30).required(),
      password: Joi.string().pattern(passwordRegex).required(),
      confirmPassword: Joi.ref('password'),
    })
    const {error} = userRegisterSchema.validate(req.body)
    if (error) {
      return next(error)
    }
    const {name, username, email, password} = req.body
    try {
      const emailInUse = await User.exists({email})
      const usernameInUse = await User.exists({username})
      if (emailInUse) {
        return next({status: 409, message: 'Email already in use!'})
      }
      if (usernameInUse) {
        return next({status: 409, message: 'Username not available!'})
      }
    } catch (error) {
      return next(error)
    }
    const hashedPassword = await bcryptjs.hash(password, 10)
    let user = null
    try {
      const newUser = new User({
        name,
        username,
        email,
        password: hashedPassword,
      })
      user = await newUser.save()
    } catch (error) {
      return next(error)
    }
    try {
      const accessToken = JWTService.signAccessToken({_id: user._id}, '30m')
      const refreshToken = JWTService.signRefreshToken({_id: user._id}, '60m')
      await JWTService.storeRefreshToken(refreshToken, user._id)
      res.cookie('accessToken', accessToken, {
        maxAge: 1000 * 3600 * 24,
        httpOnly: true,
      })
      res.cookie('refreshToken', refreshToken, {
        maxAge: 1000 * 3600 * 24,
        httpOnly: true,
      })
    } catch (error) {
      return next(error)
    }
    const userDTO = new UserDTO(user)
    return res.status(201).json({user: userDTO, auth: true})
  },

  // login user
  async login(req, res, next) {
    // 1. Input Validation
    // 2. Username and Password Matching
    // 3. Generate, Update JWT Tokens & Send Response
    const userLoginSchema = Joi.object({
      username: Joi.string().min(5).max(30).required(),
      password: Joi.string().pattern(passwordRegex).required(),
    })
    const {error} = userLoginSchema.validate(req.body)
    if (error) {
      return next(error)
    }
    const {username, password} = req.body
    let user = null
    try {
      user = await User.findOne({username})
      if (!user) {
        return next({status: 401, message: 'Invalid username!'})
      }
      const match = await bcryptjs.compare(password, user.password)
      if (!match) {
        return next({status: 401, message: 'Invalid password!'})
      }
    } catch (error) {
      return next(error)
    }
    try {
      const accessToken = JWTService.signAccessToken({_id: user._id}, '30m')
      const refreshToken = JWTService.signRefreshToken({_id: user._id}, '60m')
      await RefreshToken.updateOne(
        {userId: user._id},
        {token: refreshToken},
        {upsert: true}
      )
      res.cookie('accessToken', accessToken, {
        maxAge: 1000 * 3600 * 24,
        httpOnly: true,
      })
      res.cookie('refreshToken', refreshToken, {
        maxAge: 1000 * 3600 * 24,
        httpOnly: true,
      })
    } catch (error) {
      return next(error)
    }
    const userDTO = new UserDTO(user)
    return res.status(201).json({user: userDTO, auth: true})
  },

  // logout user
  async logout(req, res, next) {
    // 1. delete refresh token from db
    // 2. clear cookies
    // 3. return response
    const {refreshToken} = req.cookies
    try {
      await RefreshToken.deleteOne({token: refreshToken})
    } catch (error) {
      return next(error)
    }
    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')
    return res.status(200).json({user: null, auth: false})
  },

  // refresh
  async refresh(req, res, next) {
    // 1, Verify Refresh Token
    // 2. Generate New Tokens
    // 3. Return Response
    let userId
    try {
      const {refreshToken: token} = req.cookies
      userId = JWTService.verifyRefreshToken(token)._id
      const match = await RefreshToken.findOne({userId, token})
      if (!match) return next({status: 401, message: 'Unauthorized'})
    } catch (error) {
      return next(error)
    }

    try {
      const accessToken = JWTService.signAccessToken({_id: userId}, '30m')
      const refreshToken = JWTService.signRefreshToken({_id: userId}, '60m')
      await RefreshToken.updateOne(
        {userId},
        {token: refreshToken},
        {upsert: true}
      )
      res.cookie('accessToken', accessToken, {
        maxAge: 1000 * 3600 * 24,
        httpOnly: true,
      })
      res.cookie('refreshToken', refreshToken, {
        maxAge: 1000 * 3600 * 24,
        httpOnly: true,
      })
    } catch (error) {
      return next(error)
    }

    try {
      const user = await User.findOne({_id: userId})
      const userDTO = new UserDTO(user)
      return res.status(201).json({user: userDTO, auth: true})
    } catch (error) {
      return next(error)
    }
  },
}

module.exports = authController
