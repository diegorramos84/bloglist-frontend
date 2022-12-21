import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe ('<Blog />', () => {
  // TODO: HOW to override this function!
  const mockDeleteButton = jest.fn()

  const blog = {
    title: 'Blog testing is done with react-testing-library',
    author: 'Diego Ramos',
    url: 'www.blog-testing.com'
  }

  test('renders content', () => {

    render(<Blog blog={blog} deleteButton={mockDeleteButton} />)

    const element = screen.getByText('Blog testing is done with react-testing-library')
    expect(element).toBeDefined()
  })

})
