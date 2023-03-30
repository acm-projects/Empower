const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_ROUNDS = 10
const MIN_PASS_LEN = 5

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
    minlength: MIN_PASS_LEN,
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


//Hashing
userSchema.pre('save', async function(next){

  if(!this.isModified('password')) next()
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS)
  next()
})

module.exports = mongoose.model('user', userSchema)