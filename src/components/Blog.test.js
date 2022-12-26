import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe ('<Blog />', () => {
  const blog = {
    title: 'Blog testing is done with react-testing-library',
    author: 'Diego Ramos',
    url: 'www.tst.com',
    likes: 2,
    user: {
      username: 'mockuser'
    }
  }

  let component
  const mockHandler = jest.fn()

  beforeEach(() => {
    component = render(<Blog blog={blog} callOnLikes={mockHandler} />)
  })

  test('renders content', () => {
    const element = screen.getAllByText('Blog testing is done with react-testing-library')
    expect(element).toBeDefined()
  })

  test('blog renders title and author but not url or likes by default', () => {
    expect(component.container.querySelector('.title')).toHaveTextContent(blog.title)
    expect(component.container.querySelector('.author')).toHaveTextContent(blog.author)
  })

  test('blog details are not rendered initially', () => {
    const details = component.container.querySelector('.togglableContent')

    expect(details).toHaveStyle('display: none')
  })


  test('blog url and likes are shown when the view toggle button is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const blogDetails = component.container.querySelector('.togglableContent')
    expect(blogDetails).toBeInTheDocument()

    expect(component.container.querySelector('.url')).toHaveTextContent(blog.url)
    expect(component.container.querySelector('.likes')).toHaveTextContent(blog.likes)
  })

  test('clicking like button twice the component received as props is called twice', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = await screen.findByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler).toBeCalledTimes(2)
  })

})
