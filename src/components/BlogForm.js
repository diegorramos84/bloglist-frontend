import { useState } from 'react'
// import blogService from '../services/blogs'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
    likes: '',
  })

  const handleBlogChange = (event) => {
    setNewBlog({ ...newBlog, [event.target.name]: event.target.value })
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    })
    setNewBlog({
      title: '',
      author: '',
      url: '',
    })
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          <label>
            Title:
            <input
              className="titleInput"
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
              className="authorInput"
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
              className="urlInput"
              type="text"
              name="url"
              value={newBlog.url}
              onChange={handleBlogChange}
            />
          </label>
        </div>
        <button className="saveblog" type='submit'>save</button>
      </form>
    </div>
  )
}

export default BlogForm
