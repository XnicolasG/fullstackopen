const express = require('express')
const app = express()
const blogRoutes = require('./Controller/blog')
const cors = require('cors')

app.use(express.json());
app.use(cors())
app.use('/api/blog', blogRoutes)

module.exports = app