describe('Blog app', function() {
  beforeEach(function() {
   cy.request('POST', 'http://localhost:3003/api/testing/reset')
   const user = {
     name: 'Diego Ramos',
     username: 'diegorramos',
     password: 'test'
   }
   cy.request('POST', 'http://localhost:3003/api/users/', user)
   cy.visit('http://localhost:3000')
 })

  it('Login form is shown', function() {
    cy.contains('login').click()
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('diegorramos')
      cy.get('#password').type('test')
      cy.get('#submit').click()

    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('diegorramos')
      cy.get('#password').type('wrong')
      cy.get('#submit').click()
      cy.contains('Wrong credentials')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('diegorramos')
      cy.get('#password').type('test')
      cy.get('#submit').click()
    })

    it('A blog can be created', function() {
      cy.contains('add new blog').click()
      cy.get('#title').type('this is a test')
      cy.get('#author').type('Diego Ramos')
      cy.get('#url').type('www.cy.com')
      cy.get('#saveblog').click()
    })

    it('user can like a blog', function() {
      cy.contains('add new blog').click()
      cy.get('#title').type('this is a test')
      cy.get('#author').type('Diego Ramos')
      cy.get('#url').type('www.cy.com')
      cy.get('#saveblog').click()
      cy.get('#view').click()
      cy.get('#likeButton').click()
    })
  })
})
