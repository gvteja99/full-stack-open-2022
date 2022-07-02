const Blog = require('../models/blog')


const initialBlogs = [
    {
        "title": "Kathi Netthuru",
        "author": "John Grisham",
        "url": "http://www.kattinetthuru.org",
        "likes": 108
    },
    {
        "title": "Yo Vizag",
        "author": "Jacob Smith",
        "url": "http://www.vizag.yo",
        "likes": 6
    }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon', date: new Date() })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}
