import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('') 
  const [url, setUrl] = useState('') 
  const [toggle, setToggle] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  



  useEffect(() => {
    blogService.getAll().then(blogs =>{
      setBlogs( blogs );
    })  
  }, [toggle])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const logoutUser = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)
      setUser(user)
      setToggle(!toggle)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage('ERROR_MESSAGE|wrong username or password')
      setTimeout(() => {
        setNotificationMessage('')
      }, 2000)
      // console.error(exception)
    }
  }

  const createBlog = async (event) => {
    event.preventDefault()
    
    try {

      blogService.create({"title": title, "author": author, "url": url}).then(() => setToggle(!toggle))

      setNotificationMessage(`NOTIFICATION_MESSAGE|a new blog ${title} by ${author} added`)
      setTimeout(() => {
        setNotificationMessage('')
      }, 5000)

      setTitle('')
      setAuthor('')
      setUrl('')
      

    } catch (exception) {
      // setErrorMessage('Wrong credentials')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
      console.error(exception)
    }
  }


  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <Notification message={notificationMessage} />
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogForm = () => (
    <div>
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged-in <button onClick={logoutUser}>logout</button></p>
      </div> 
      <div>
        <Notification message={notificationMessage} />
        <form onSubmit={createBlog}>
        <h2>create new</h2>
        <div>
          title:
            <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
            <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
            <input
            type="text"
            value={url}
            name="URL"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>

        <button type="submit">create</button>
        </form>      
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div> 
  )


  return (
    <div>
      {user === null ?
        loginForm() :
        blogForm()
      }
    </div>
  )
}

export default App
