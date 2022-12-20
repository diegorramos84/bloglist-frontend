import { useState } from 'react'

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
      url: newBlog.url,
      likes: newBlog.likes
    })
    setNewBlog({
      title: '',
      author: '',
      url: '',
      likes: '',
    })
  }

  return (
    <div>
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
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default BlogForm
