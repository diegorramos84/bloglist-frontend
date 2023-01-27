import { useState } from 'react'
import blogService from '../services/blogs'
import { Button } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import VisibilityIcon from '@mui/icons-material/Visibility'

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
    <div className="blog" style={blogStyle}>
      <div>
        <p className='title'>{blog.title}</p>
        <p className='author'>{blog.author}</p>
        {!visible ? <IconButton variant='contained' className="view" style={buttonStyle} onClick={toggleVisibility}><VisibilityIcon color='primary'></VisibilityIcon></IconButton> :null}
      </div>
      <div className='togglableContent'style={showWhenVisible}>
        <Button variant='contained' onClick={toggleVisibility}>hide</Button>
        <p className='url'>{blog.url}</p>
        {/* using callOnlikes "trick" to avoid triggeting the function that has put and get requests */}
        <p className='likes'>  <IconButton className="likeButton"onClick={callOnLikes ? callOnLikes : increaseLikes}>
          <ThumbUpIcon color="primary"></ThumbUpIcon>
        </IconButton>({blog.likes})</p>
        {/* <p>{blog.author}</p> */}
        {(username === blog.user.username)
          ? <Button variant='contained' className="deleteButton"onClick={deleteBlog}> delete </Button>
          : null }
      </div>
    </div>
  )
}

export default Blog
