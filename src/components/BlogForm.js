import { useState } from 'react'
// import blogService from '../services/blogs'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
    likes: '',
  })

  const [newImage, setNewImage] = useState(null)

  const handleBlogChange = (event) => {
    setNewBlog({ ...newBlog, [event.target.name]: event.target.value })
    console.log(newBlog)
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    console.log(file)
    const reader = new FileReader()
    reader.onload = () => {
      setNewImage(reader.result)
    }
    reader.readAsDataURL(file)
    console.log(newImage, 'result')
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      image: newImage,
    })
    console.log(createBlog)
    setNewBlog({
      title: '',
      author: '',
      url: ''
    })
    setNewImage(null)
    document.getElementById('imageInput').value=null
  }

  return (
    <div>
      <form onSubmit={addBlog} encType='multipart/form-data'>
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
        <div>
          <label>
            Image:
            <input
              id='imageInput'
              className="imageInput"
              type="file"
              name="image"
              value={newBlog.image}
              onChange={handleImageChange}
            />
          </label>
        </div>
        <button className="saveblog" type='submit'>save</button>
      </form>
    </div>
  )
}

export default BlogForm
