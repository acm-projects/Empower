const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    required: false,
    default: Date.now
  },
  url: {
    type: String,
    required: true
  }  
})

// const File = mongoose.model('File', fileSchema)
// module.exports = File
module.exports = mongoose.model('file', fileSchema)