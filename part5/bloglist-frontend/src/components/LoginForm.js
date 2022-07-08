import loginService from '../services/login'
import blogService from '../services/blogs'
import Notification from './Notification'

const LoginForm = ({notificationMessage, setNotificationMessage, username, setUsername, password, setPassword, setToggle, toggle, setUser}) => {

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
        }
    }

    return (
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
}

export default LoginForm