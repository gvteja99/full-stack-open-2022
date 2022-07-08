import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'


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
    if (user){
    blogService.getAll().then(blogs =>{
      setBlogs( blogs );
    })  }
  }, [toggle])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  return (
    <div>
      {user === null ?
        <LoginForm 
          notificationMessage={notificationMessage} 
          setNotificationMessage={setNotificationMessage}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          setToggle={setToggle}
          toggle={toggle}
          setUser={setUser}
        /> :
        <Blog 
          blogs={blogs}
          title={title}
          setTitle={setTitle}
          author={author}
          setAuthor={setAuthor}
          url={url}
          setUrl={setUrl}
          user={user}
          setUser={setUser}
          toggle={toggle}
          setToggle={setToggle}
          notificationMessage={notificationMessage}
          setNotificationMessage={setNotificationMessage}
        />
      }
    </div>
  )
}

export default App
