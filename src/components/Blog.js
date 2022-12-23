import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, username }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

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

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        <p className='title'>{blog.title} <button onClick={toggleVisibility}>view</button></p>
        <p className='author'>{blog.author}</p>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.title} <button onClick={toggleVisibility}>hide</button></p>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={increaseLikes}>like</button></p>
        <p>{blog.author}</p>
        {(username === blog.user.username)
          ? <button onClick={deleteBlog}> delete </button>
          : null }
      </div>
    </div>
  )
}

export default Blog
