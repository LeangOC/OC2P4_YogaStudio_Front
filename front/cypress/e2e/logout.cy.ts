describe('Logout', () => {

  it('should logout user', () => {

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

    cy.intercept('GET', 'api/session', {
      fixture: 'sessions.json'
    }).as('sessions')

    cy.visit('/login')

    cy.get('input[formControlName="email"]')
      .type('john@test.com')

    cy.get('input[formControlName="password"]')
      .type('123456')

    cy.get('button[type="submit"]')
      .click()

    cy.wait('@login')
    cy.wait('@sessions')

    cy.contains('Logout')
      .click()

    cy.url().should('include', '/login')
  })
})
