const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

UserSchema.plugin(AutoIncrement, { inc_field: 'user_id' })

module.exports = mongoose.model('user', UserSchema)