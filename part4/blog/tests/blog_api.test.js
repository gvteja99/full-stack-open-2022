const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')


const initialBlogs = [
    {
        "title": "Kathi Netthuru",
        "author": "John Grisham",
        "url": "http://www.kattinetthuru.org",
        "likes": 108,
    },
    {
        "title": "Yo Vizag",
        "author": "Jacob Smith",
        "url": "http://www.vizag.yo",
        "likes": 6,
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })
  

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})
  
test('the first blog is about Kathi Netthuru', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)
    expect(titles).toContain('Yo Vizag')
})

test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()
  
    const blogToView = blogsAtStart[0]
  
    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
  
    expect(resultBlog.body).toEqual(processedBlogToView)
  })

test('check if id is present', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]
    expect(blogToView['id']).toBeDefined()
})


test('blog without title or url is not added', async () => {
    const blogsAtEnd = await helper.blogsInDb()

    const blogWithNoTitle = {
        url: "http://testerblog.com",
        likes: 0
    }
  
    await api
      .post('/api/blogs')
      .send(blogWithNoTitle)
      .expect(400)
  
    
    expect(blogsAtEnd).toHaveLength(blogsAtEnd.length)

    const blogWithNoUrl = {
        title: "Test Blog API",
        likes: 0
    }
  
    await api
      .post('/api/blogs')
      .send(blogWithNoUrl)
      .expect(400)
  
    
    expect(blogsAtEnd).toHaveLength(blogsAtEnd.length)


  })

test('a valid blog can be added', async () => {
    const newBlog = {
        title: "Jump",
        author: "Jeff Roldgold",
        url: "http://www.jump.pi",
        likes: 808,
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    
      const titles = blogsAtEnd.map(n => n.title)
        expect(titles).toContain(
      'Jump'
    )
  })

test('0 default likes', async () => {
    const newBlog = {
        title: "Bestseller",
        author: "Raju Sundar",
        url: "http://www.bestseller.ai",
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd[blogsAtEnd.length-1]['likes']).toBe(0)
  })

  
test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(
        blogsAtStart.length - 1
    )
  
    const titles = blogsAtEnd.map(r => r.title)
  
    expect(titles).not.toContain(blogToDelete.title)
  })
  


afterAll(() => {
  mongoose.connection.close()
})