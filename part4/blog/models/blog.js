const mongoose = require('mongoose')
const { MONGOURI } = require('../utils/config')

mongoose.set('strictQuery', false);

mongoose.connect(MONGOURI)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => console.log('Error connecting to MongoDB', error.message));

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog