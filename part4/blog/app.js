const express = require('express')
const app = express()
const blogRoutes = require('./Controller/blog')
const cors = require('cors');
const usersRouter = require('./Controller/user');

app.use(express.json());
app.use(cors())
app.use('/api/blog', blogRoutes)
app.use('/api/users', usersRouter)

module.exports = app