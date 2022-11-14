import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginservices from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginservices.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
        type="text"
        name="Username"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
        type="text"
        name="Password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        />
      </div>
    <button type="submit">login</button>
  </form>
  )

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const allBlogs = () => (
    blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )
  )

  return (
    <div>
      <h2>blogs</h2>

    <Notification message={errorMessage} />

    {user === null ?
      loginForm() : // if user is null show login form
      <div>
        <p>{user.name} is logged in <button onClick={handleLogout}>logout</button></p>
        {allBlogs()}
      </div>
    }

    </div>
  )
}

export default App
