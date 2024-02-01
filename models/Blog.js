const mongoose = require('mongoose');


const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  intro: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
});


module.exports = mongoose.model('Blog', blogSchema);