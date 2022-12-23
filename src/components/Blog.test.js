import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe ('<Blog />', () => {
  const blog = {
    title: 'Blog testing is done with react-testing-library',
    author: 'Diego Ramos',
    url: 'www.tst.com',
    user: {
      username: 'mockuser'
    }
  }

  test('renders content', () => {

    render(<Blog blog={blog}/>)

    const element = screen.getAllByText('Blog testing is done with react-testing-library')
    expect(element).toBeDefined()
  })

  test('blog renders title and author but not url or likes by default', () => {
    const component = render(<Blog blog={blog} />)
    expect(component.container.querySelector('.title')).toHaveTextContent(blog.title)
    expect(component.container.querySelector('.author')).toHaveTextContent(blog.author)
  })

})
