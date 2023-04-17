const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: false
  },
  creationDate: {
    type: Date,
    required: false,
    default: Date.now
  },
  url: {
    type: String,
    required: true
  },
  
})



module.exports = mongoose.model('file', fileSchema)