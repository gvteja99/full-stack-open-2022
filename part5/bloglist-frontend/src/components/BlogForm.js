import {TogglableForm} from './Togglable'
import blogService from '../services/blogs'
import { useRef } from 'react'

const BlogForm = ({title, setTitle, author, setAuthor, url, setUrl, toggle, setToggle, setNotificationMessage}) => {
  

    const createBlogRef = useRef()

    const createBlog = async (event) => {
        event.preventDefault()
        
        try {
        
        createBlogRef.current.toggleVisibility()
        await blogService.create({"title": title, "author": author, "url": url})
        setToggle(!toggle)
    
        setNotificationMessage(`NOTIFICATION_MESSAGE|a new blog ${title} by ${author} added`)
        setTimeout(() => {
            setNotificationMessage('')
        }, 5000)
    
        setTitle('')
        setAuthor('')
        setUrl('')
        
    
        } catch (exception) {
        console.error(exception)
        }
    }


    return (
        <TogglableForm buttonLabel='new blog' ref={createBlogRef}>
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
        </TogglableForm> 
)}

export default BlogForm