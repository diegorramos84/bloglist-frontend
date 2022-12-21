import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, username }) => {
  const [visible, setVisible] = useState(false)
  // const [currentUser, setCurrentUser] = useState('')


  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  // useEffect(() => {
  //   setCurrentUser(JSON.parse(window.localStorage.loggedBlogappUser).username)
  // }, [])

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const increaseLikes = async () => {
    const increaseLikes = blog.likes + 1
    await blogService.update(blog.id, { ...blog, likes: increaseLikes })
    const updatedBlogs = await blogService.getAll()
    updatedBlogs.sort((a,b) => b.likes - a.likes)
    setBlogs(updatedBlogs)
  }

  const deleteBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.removeBlog(blog.id)
      const updatedBlogs = await blogService.getAll()
      updatedBlogs.sort((a,b) => b.likes - a.likes)
      setBlogs(updatedBlogs)
    }
  }

  // const deleteButton = () => {
  //   const blogOwner = blog.user.username
  //   if (JSON.parse(window.localStorage.loggedBlogappUser).username === blog.user.username){
  //     return(
  //       <button onClick={deleteBlog}> delete </button>
  //     )
  //   } else {
  //     return (null)
  //   }
  // }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        <p>{blog.title} <button onClick={toggleVisibility}>view</button></p>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.title} <button onClick={toggleVisibility}>hide</button></p>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={increaseLikes}>like</button></p>
        <p>{blog.author}</p>
        {console.log(username, 'current user')}
        {console.log(blog.user.username, 'blog owner')}
        {(username === blog.user.username)
          ? <button onClick={deleteBlog}> delete </button>
          : null }
        {/* { deleteButton() } */}
      </div>
    </div>
  )
}

export default Blog
