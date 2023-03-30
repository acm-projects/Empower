const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  creationDate: {
    type: Date,
    required: false,
    default: Date.now
  },
  password: {
    type: String,
    required: false
  },
  disability: {
    type: String,
    required: false
  },
  dateOfBirth: {
    type: Date,
    required: false,
    trim: true
  }
  
})

module.exports = mongoose.model('user', userSchema)