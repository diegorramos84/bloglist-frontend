describe('Blog app', function() {
  // ! my backend is using port 3003 - remember to update
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
      cy.login({ username: 'diegorramos', password: 'test'})
      cy.createBlog({
        title: 'this is a test',
        author: 'Diego Ramos',
        url: 'www.cy.com'
      })
    })

    it('a blog exists', function() {
      cy.get('.blog').should('contain', 'this is a test')
    })

    it('user can like a blog', function() {
      cy.get('.view').click()
      cy.get('.likeButton').click()
    })

    it('blog owner can delete it', function() {
      cy.get('.view').click()
      cy.get('.likeButton').click()
      cy.get('.deleteButton').click()
    })

    it('users cant delete blog they didnt create', function() {
      // logout from default user
      cy.get('#logoutButton').click()

      // create user2
      const user2 = {
        name: 'user2',
        username: 'user2',
        password: 'test'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user2)

      // login user2
      cy.login({ username: 'user2', password: 'test'})

      // open blog details and try to delete it
      cy.get('.view').click()
      cy.get('.likeButton').click()
      cy.get('.deleteButton')
        .should('not.exist')
    })

    it('blogs are ordered by the amount of likes', function() {
      // create second blog

      // blog2
      cy.createBlog({
        title: 'this blog will have more likes',
        author: 'Diego Ramos',
        url: 'www.cy.com'
      })

      // get blog2 and click like
      cy.get('.view').eq(1).click()
        .get('.likeButton').eq(1).click()

        // check if the blog we liked it is now on top
      cy.get('.blog').eq(0).should('contain', 'this blog will have more likes')
    })


  })
})
