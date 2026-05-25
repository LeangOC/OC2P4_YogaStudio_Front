describe('Account', () => {

  beforeEach(() => {

    cy.intercept('POST', '/api/auth/login', {
      body: {
        token: 'token',
        type: 'Bearer',
        id: 1,
        username: 'john@test.com',
        firstName: 'John',
        lastName: 'Doe',
        admin: false
      }
    }).as('login')

    cy.intercept('GET', 'api/user/1', {
      fixture: 'user.json'
    }).as('user')

    cy.visit('/login')

    cy.get('input[formControlName="email"]')
      .type('john@test.com')

    cy.get('input[formControlName="password"]')
      .type('123456')

    cy.get('button[type="submit"]')
      .click()

    cy.wait('@login')
  })

  it('should display user information', () => {

    cy.visit('/me')

    cy.wait('@user')

    cy.contains('John DOE')
      .should('be.visible')

    cy.contains('john@test.com')
      .should('be.visible')
  })
})
