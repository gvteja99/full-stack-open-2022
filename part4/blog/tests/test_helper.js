const Blog = require('../models/blog')


const initialBlogs = [
    {
        "title": "Kathi Netthuru",
        "author": "John Grisham",
        "url": "hphp://www.kattinetthuru.kamist",
        "likes": 108,
    },
    {
        "title": "Yo Vizag",
        "author": "Panileni Gunta",
        "url": "hphp://www.vizag.yo",
        "likes": 0,
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
