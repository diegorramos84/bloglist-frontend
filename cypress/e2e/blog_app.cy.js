describe('Blog app', function() {
  beforeEach(function() {
   cy.request('POST', 'http://localhost:3001/api/testing/reset')
   const user = {
     name: 'Diego Ramos',
     username: 'diegorramos',
     password: 'test'
   }
   cy.request('POST', 'http://localhost:3001/api/users/', user)
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
})
