describe('Register', () => {

  it('should register user', () => {

    cy.intercept('POST', '/api/auth/register', {
      statusCode: 200
    }).as('register')

    cy.visit('/register')

    cy.get('input[formControlName="firstName"]')
      .type('John')

    cy.get('input[formControlName="lastName"]')
      .type('Doe')

    cy.get('input[formControlName="email"]')
      .type('john@test.com')

    cy.get('input[formControlName="password"]')
      .type('123456')

    cy.get('button[type="submit"]')
      .click()

    cy.wait('@register')

    cy.url().should('include', '/login')
  })

  it('should display validation error', () => {

    cy.visit('/register')

    cy.get('button[type="submit"]')
      .should('be.disabled')
  })
})
