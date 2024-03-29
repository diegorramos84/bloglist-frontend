import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import ErrorMessage from './components/ErrorMessage'
import HeroBanner from './components/HeroBanner'
import LoginForm from './components/LoginForm'
import Navbar from './components/Navbar'
import Notification from './components/Notification'
import Togglable from './components/Toggable'
import blogService from './services/blogs'
import loginServices from './services/login'

// Grid

import { Grid, Box } from '@mui/material'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState()
  const [errorMessage, setErrorMessage] = useState()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a,b) => b.likes - a.likes) )
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
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const allBlogs = () => (
    blogs.map(blog =>
      <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} username={user.username}/>
    )
  )


  const createBlog = (blogObject) => {
    console.log(blogObject, 'blog object')
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage('a new blog ' + blogObject.title + ' by ' + blogObject.author + ' added')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  return (
    <div>
      <Navbar></Navbar>
      <HeroBanner></HeroBanner>

      <ErrorMessage message={errorMessage} />
      <Notification message={message} />

      {user === null ?
        <Togglable buttonLabel={'login'}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable> :
        <div>
          <p>{user.name} is logged in <button id="logoutButton" onClick={handleLogout}>logout</button></p>
          <p>create new:</p>
          <Togglable buttonLabel={'add new blog'}>
            <BlogForm createBlog={createBlog}/>
          </Togglable>
          <br></br>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {allBlogs().map((b) => (
                <Grid item xs={12} sm={6} md={4} key={b.id}>
                  {b}
                </Grid>
              ))}
              {/* {allBlogs.map()} */}
            </Grid>
          </Box>
        </div>
      }
    </div>
  )
}

export default App
