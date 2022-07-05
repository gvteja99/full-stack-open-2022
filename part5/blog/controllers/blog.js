const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const Blog = require('../models/blog')
const User = require('../models/user')

require('express-async-errors')

blogsRouter.get('/', async (request, response) => {

    const decodedToken = request.token
    if (decodedToken && !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    return response.json(blogs)
  })
  
blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = request.token
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  
  const user = await User.findById(decodedToken.id)
  const username = request.user
  const blog = await Blog({...body, user: user.id})
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

  response.status(201).json(savedBlog)

})

blogsRouter.get('/:id', async (request, response) => {

  const decodedToken = request.token
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }

})

blogsRouter.put('/:id', async (request, response) => {

  const decodedToken = request.token
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findByIdAndUpdate(request.params.id, request.body, {new: true})
  response.status(201).json(blog)
})


blogsRouter.delete('/:id', async (request, response) => {

  const username = request.user

  const decodedToken = request.token
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }


  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() != decodedToken.id.toString()) {
    return response.status(401).json({ error: 'Invalid token! This user did not create this blog' })
  } 


  await Blog.findByIdAndRemove({ _id: request.params.id})
  response.status(204).end()
})


module.exports = blogsRouter