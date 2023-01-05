import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, username, callOnLikes }) => {
  const [visible, setVisible] = useState(false)

  // const hideWhenVisible = { display: visible ? 'none' : '' }
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

  const buttonStyle = {
    display: 'inline-block',
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
      <div>
        <p className='title'>{blog.title}</p>
        <p className='author'>{blog.author}</p>
        {!visible ? <button id="view" style={buttonStyle} onClick={toggleVisibility}>view</button> :null}
      </div>
      <div className='togglableContent'style={showWhenVisible}>
        <button onClick={toggleVisibility}>hide</button>
        <p className='url'>{blog.url}</p>
        {/* using callOnlikes "trick" to avoid triggeting the function that has put and get requests */}
        <p className='likes'>likes {blog.likes} <button id="likeButton"onClick={callOnLikes ? callOnLikes : increaseLikes}>like</button></p>
        {/* <p>{blog.author}</p> */}
        {(username === blog.user.username)
          ? <button id="deleteButton"onClick={deleteBlog}> delete </button>
          : null }
      </div>
    </div>
  )
}

export default Blog
