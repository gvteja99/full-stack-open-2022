const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
const config = require('../utils/config')

let bearerToken;

beforeAll(async () => {
  const loginResponse = await api
  .post('/api/login')
  .send({username: config.TEST_USERNAME, password: config.TEST_PASSWORD})

  bearerToken = "bearer " + loginResponse.body.token
})


beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })



test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .set('Authorization', bearerToken)
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
    const response = await api
    .get('/api/blogs')
    .set('Authorization', bearerToken)
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})
  
test('the first blog is about Kathi Netthuru', async () => {
    const response = await api
    .get('/api/blogs')
    .set('Authorization', bearerToken)
    

    const titles = response.body.map(r => r.title)
    expect(titles).toContain('Yo Vizag')
})

test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()
  
    const blogToView = blogsAtStart[0]
  
    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .set('Authorization', bearerToken)
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
      .set('Authorization', bearerToken)
      .send(blogWithNoTitle)
      .expect(400)
  
    
    expect(blogsAtEnd).toHaveLength(blogsAtEnd.length)

    const blogWithNoUrl = {
        title: "Test Blog API",
        likes: 0
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization', bearerToken)
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
      .set('Authorization', bearerToken)
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
      .set('Authorization', bearerToken)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd[blogsAtEnd.length-1]['likes']).toBe(0)
  })

test('likes can be changed', async () => {
    const newBlog = {
        title: 'Yo Vizag',
        author: 'Jacob Smith',
        url: 'http://www.vizag.yo',
        likes: 116,
    }
  
    const blogsAtEnd = await helper.blogsInDb()

    await api
      .put(`/api/blogs/${blogsAtEnd[blogsAtEnd.length-1]["id"]}`)
      .set('Authorization', bearerToken)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      
    const response = await api
    .get(`/api/blogs/${blogsAtEnd[blogsAtEnd.length-1]["id"]}`)
    .set('Authorization', bearerToken)

    expect(response.body["likes"]).toBe(newBlog["likes"])
})

test('a blog can be deleted', async () => {

    const newBlog = {
        title: "Bestseller",
        author: "Raju Sundar",
        url: "http://www.bestseller.ai",
    }

    await api
      .post('/api/blogs')
      .set('Authorization', bearerToken)
      .send(newBlog)


    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[blogsAtStart.length-1]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', bearerToken)
      .expect(204)
  
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
        blogsAtStart.length - 1
    )
  
    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
  
  test('a blog cannot be deleted with another token', async () => {

    const newBlog = {
        title: "Bestseller",
        author: "Raju Sundar",
        url: "http://www.bestseller.ai",
    }

    await api
      .post('/api/blogs')
      .set('Authorization', bearerToken)
      .send(newBlog)


    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[blogsAtStart.length-1]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', "bearer INVALIDtoken")
      .expect(401)
  
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
        blogsAtStart.length
    )
  
    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).toContain(blogToDelete.title)
  })



afterAll(() => {
  mongoose.connection.close()
})