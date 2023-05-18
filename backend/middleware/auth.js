const JWTService = require('../service/JWTService')
const User = require('../model/user')
const UserDTO = require('../dto/user')

const authHandler = async (req, res, next) => {
  try {
    const {accessToken, refreshToken} = req.cookies
    if (!accessToken || !refreshToken)
      return next({status: 401, message: 'Unauthorized'})
    const _id = JWTService.verifyAccessToken(accessToken)._id
    const user = await User.findOne({_id})
    req.user = user
    next()
  } catch (error) {
    return next(error)
  }
}

module.exports = authHandler
