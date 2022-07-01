const config = require('./utils/config')
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const Blog = require('./models/blog')
const blogsRouter = require('./controllers/blog')

const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI)
    .then(() => {
    console.log('connected to MongoDB')
    })
    .catch((error) => {
    console.error('error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})