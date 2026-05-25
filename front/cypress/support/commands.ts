declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
    }
  }
}

Cypress.Commands.add('login', (email: string, password: string) => {

  cy.intercept('POST', '/api/auth/login', {
    body: {
      token: 'token',
      type: 'Bearer',
      id: 1,
      username: email,
      firstName: 'John',
      lastName: 'Doe',
      admin: false
    }
  }).as('login')

  cy.visit('/login')

  cy.get('input[formControlName="email"]')
    .type(email)

  cy.get('input[formControlName="password"]')
    .type(password)

  cy.get('button[type="submit"]')
    .click()

  cy.wait('@login')
})
