const mongoose = require('mongoose')
const { MONGOURI } = require('../utils/config')

mongoose.set('strictQuery', false);

mongoose.connect(MONGOURI)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => console.log('Error connecting to MongoDB', error.message));

const blogSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    author: String,
    url: {
      type: String,
      required: true
    },
    likes: {
      type: Number,
      default: 0
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog