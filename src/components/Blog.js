import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs}) => {
  const [visible, setVisible] = useState(false)
  const user = JSON.parse(window.localStorage.loggedBlogappUser)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const increaseLikes = async () => {
    const increaseLikes = blog.likes + 1

    const response = await blogService.update(blog.id,{...blog, likes: increaseLikes })
    setBlogs(blogs.map(b => b.id !== response.id ? b : response))
  }

  const deleteBlog = async () => {
    if (window.confirm(`Remove log ${blog.title} by ${blog.author}`)) {
      await blogService.removeBlog(blog.id)
      const updatedBlogs = blogs.filter(b => b.id !== blog.id)
      setBlogs(updatedBlogs)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

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
        {/* <button onClick={deleteBlog}>delete </button> */}
        {
        (user.username === blog.user.username)
        ? <button onClick={deleteBlog}>delete </button>
        : null
        }

      </div>
    </div>
)}

export default Blog
