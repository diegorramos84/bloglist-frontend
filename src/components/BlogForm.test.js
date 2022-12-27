import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {

  let createBlog = jest.fn()

  beforeEach(() => {
    render(<BlogForm createBlog={createBlog}/>)
  })


  test('when clicking on form Submit pass the correct details to eventHandler to create a new blog', async () => {
    const user = userEvent.setup()
    // typing the needed text to create a new blog
    await user.type(getTitle(), 'Testing the title')
    await user.type(getAuthor(), 'Diego Ramos')
    await user.type(getUrl(), 'www.test.com')
    // user click on submit
    await user.click(screen.getByRole('button', { type: 'submit' }))

    await waitFor(() => {
      expect(createBlog).toHaveBeenCalledTimes(1)
    })
  })
})

function getTitle() {
  return screen.getByRole('textbox', {
    name: /title:/i
  })
}

function getAuthor() {
  return screen.getByRole('textbox', {
    name: /author:/i
  })
}

function getUrl() {
  return screen.getByRole('textbox', {
    name: /url:/i
  })
}
