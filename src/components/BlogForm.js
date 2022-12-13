const BlogForm = ({
  newBlogTitle,
  newBlogAuthor,
  newBlogUrl,
  newBlogLikes,
  handleBlogChange,
  handleSubmit
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title:
            <input
              type ="text"
              name= "title"
              value={newBlogTitle}
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
              value={newBlogAuthor}
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
              value={newBlogUrl}
              onChange={handleBlogChange}
            />
          </label>
        </div>
        <div>
          <label>
            likes:
            <input
              type="integer"
              name="likes"
              value={newBlogLikes}
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
