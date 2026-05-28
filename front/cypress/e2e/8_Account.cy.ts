describe('Account', () => {

  beforeEach(() => {

    cy.intercept('POST', '/api/auth/login', {
      body: {
        id: 1,
        username: 'john@test.com',
        firstName: 'John',
        lastName: 'DOE',
        admin: false,
        token: 'fake-token',
        type: 'Bearer'
      }
    }).as('login')

    cy.intercept('GET', '**/api/session', {
      fixture: 'sessions.json'
    }).as('sessions')

    cy.intercept('GET', '**/api/user/1', {
      body: {
        id: 1,
        email: 'john@test.com',
        lastName: 'DOE',
        firstName: 'John',
        admin: false,
        createdAt: '2026-05-25T00:00:00.000Z',
        updatedAt: '2026-05-25T00:00:00.000Z'
      }

    }).as('user')

    cy.intercept('DELETE', '**/api/user/1', {
      statusCode: 200
    }).as('deleteUser')

    cy.visit('/login')

    cy.get('input[formControlName="email"]')
      .type('john@test.com')

    cy.get('input[formControlName="password"]')
      .type('test1234')

    cy.get('button[type="submit"]')
      .click()

    cy.wait('@login')
    cy.wait('@sessions')
  })

  it('should display user information', () => {

    cy.get('[routerlink="me"]')
      .click()

    cy.wait('@user')

    cy.url().should('include', '/me')

    cy.contains('User information')
      .should('be.visible')

    cy.contains('john@test.com')
      .should('be.visible')

    cy.contains('John DOE')
      .should('be.visible')
  })
  it('should delete user account', () => {
    cy.get('[routerlink="me"]')
      .click()

    cy.wait('@user')

    cy.contains('Detail')
      .click()

    cy.wait('@deleteUser')
    cy.url()
      .should('include', '/login')
  })

it('should navigate back when clicking back button', () => {
  cy.get('[routerlink="me"]')
    .click()
  cy.wait('@user')

  cy.url()
    .should('include', '/me')

  cy.get('button[mat-icon-button]')
    .click()

})
})

