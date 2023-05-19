const mongoose = require('mongoose')

const refreshTokenSchema = new mongoose.Schema(
  {
    token: {type: String, required: true},
    userId: {type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true},
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('RefreshToken', refreshTokenSchema, 'tokens')
