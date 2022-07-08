import Notification from './Notification'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'
import {TogglableBlog} from './Togglable'


const Blog = ({blogs, title, setTitle, author, setAuthor, url, setUrl, 
  user, setUser, toggle, setToggle, notificationMessage, setNotificationMessage}) => {
  
  
  const logoutUser = () => {
    window.localStorage.clear()
    setUser(null)
  }
  
  const addLike = async (event, blog) => {
    event.preventDefault()
    try {
      const updatedBlog = {...blog, likes:blog.likes+1}
      delete updatedBlog.user;
      await blogService.update(blog.id, updatedBlog)
      setToggle(!toggle)
    } catch (exception) {
      console.error(exception)
    }
  }

  const deleteBlog = async (event, blog) => {
    event.preventDefault()
    try {
      await blogService.remove(blog.id)
      setToggle(!toggle)
    } catch (exception) {
      console.error(exception)
    }
  }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  // console.log(blogs);

  return (
  <div>
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged-in <button onClick={logoutUser}>logout</button></p>
    </div> 
    <div>
      <Notification message={notificationMessage} />
      <BlogForm 
      title={title}
      setTitle={setTitle}
      author={author}
      setAuthor={setAuthor}
      url={url}
      setUrl={setUrl}
      toggle={toggle}
      setToggle={setToggle}
      setNotificationMessage={setNotificationMessage}/>
      {blogs
      .sort((a, b) => a.likes > b.likes?-1:1)
      .map(blog =>
        <div key={blog.id} style={blogStyle}>
          <div>
            {blog.title} {blog.author}
          </div>
          <TogglableBlog buttonLabel='show'>
          <div>
            {blog.url}
          </div>
          <form onSubmit={(event) => addLike(event, blog)}>
            <div>
              likes {blog.likes}<button type="submit">like</button>
            </div>
          </form>
          <div>
            {user.name}
          </div>
          <form onSubmit={(event) => deleteBlog(event, blog)}>
            <div>
              <button type="submit">delete</button>
            </div>
          </form>
          </TogglableBlog>
        </div>
      )}
    </div>
  </div> 
)}

export default Blog