import { useState } from 'react'
import blogService from '../services/blogs'
import { Button } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import VisibilityIcon from '@mui/icons-material/Visibility'


// cards

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'


const Blog = ({ blog, setBlogs, username, callOnLikes }) => {
  const [visible, setVisible] = useState(false)

  // const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   border: 'solid',
  //   borderWidth: 1,
  //   marginBottom: 5
  // }

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
    <Card variant='outlined' sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" className='title'gutterBottom>
          {blog.title}
        </Typography>
        <Typography x={{ mb: 1.5 }} color="text.secondary" className='author'>
          {blog.author}
        </Typography >
        <Typography x={{ mb: 1.5 }} color="text.secondary" className='url'>
          {blog.url}
        </Typography>
      </CardContent>
      <CardActions>
        {!visible ? <IconButton variant='contained' className="view" style={buttonStyle} onClick={toggleVisibility}>
          <VisibilityIcon color='primary'></VisibilityIcon></IconButton> :null}
        <Box className='togglableContent'style={showWhenVisible}>
          <Typography x={{ mb: 1.5 }} color="text.secondary" className='author'>
            {blog.author}
          </Typography >
          <Typography x={{ mb: 1.5 }} color="text.secondary" className='url'>
            {blog.url}
          </Typography>
          <p className='likes'>  <IconButton className="likeButton"onClick={callOnLikes ? callOnLikes : increaseLikes}>
            <ThumbUpIcon color="primary"></ThumbUpIcon>
          </IconButton>({blog.likes})</p>
          {(username === blog.user.username)
            ? <Button variant='contained' className="deleteButton"onClick={deleteBlog}> delete </Button>
            : null }
          <Button variant='contained' onClick={toggleVisibility}>hide</Button>
        </Box>
      </CardActions>
    </Card>
  )
}

export default Blog
