import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import ErrorMessage from './components/ErrorMessage'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginServices from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState()
  const [errorMessage, setErrorMessage] = useState()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
    likes: "",
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginServices.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
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

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        <label>
          Title:
          <input
            type ="text"
            name= "title"
            value={newBlog.title}
            onChange={handleBlogChange}
          />
        </label>
      </div>
      <div>
        <label>
          Author:
          <input
            type ="text"
            name= "author"
            value={newBlog.author}
            onChange={handleBlogChange}
          />
        </label>
      </div>
      <div>
        <label>
          Url:
          <input
            type="text"
            name="url"
            value={newBlog.url}
            onChange={handleBlogChange}
          />
        </label>
      </div>
      <div>
        <label>
          likes:
          <input
            type="integer"
            name="likes"
            value={newBlog.likes}
            onChange={handleBlogChange}
          />
        </label>
      </div>
       <button type='submit'>save</button>
    </form>
  )

  const handleBlogChange = (event) => {
    setNewBlog({...newBlog, [event.target.name]: event.target.value})
  }


  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: newBlog.likes
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        let freshBlog = {
          title: "",
          author: "",
          url: "",
          likes: "",
        }
        setNewBlog(newBlog => ({
          ...newBlog,
          ...freshBlog
        }))

        setMessage('a new blog ' + blogObject.title + ' by ' + blogObject.author + ' added')
        setTimeout(() => {
          setMessage(null)
        }, 5000);
      })
  }

  return (
    <div>
      <h2>blogs</h2>

    <ErrorMessage message={errorMessage} />
    <Notification message={message} />

    {user === null ?
      loginForm() : // if user is null show login form
      <div>
        <p>{user.name} is logged in <button onClick={handleLogout}>logout</button></p>
        <p>create new:</p>
        {blogForm()}
        <br></br>
        {allBlogs()}
      </div>
    }

    </div>
  )
}

export default App
