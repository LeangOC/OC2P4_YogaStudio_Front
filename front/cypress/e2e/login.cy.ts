describe('Login', () => {

  it('should login successfully', () => {

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

    cy.visit('/login')

    cy.get('input[formControlName="email"]')
      .type('john@test.com')

    cy.get('input[formControlName="password"]')
      .type('123456')

    cy.get('button[type="submit"]')
      .click()

    cy.wait('@login')

    cy.url().should('include', '/sessions')
  })

  it('should display error on bad credentials', () => {

    cy.intercept('POST', '/api/auth/login', {
      statusCode: 401
    }).as('loginError')

    cy.visit('/login')

    cy.get('input[formControlName="email"]')
      .type('wrong@test.com')

    cy.get('input[formControlName="password"]')
      .type('wrong')

    cy.get('button[type="submit"]')
      .click()

    cy.wait('@loginError')

    cy.contains('An error occurred')
      .should('be.visible')
  })

  it('should disable submit button when form invalid', () => {

    cy.visit('/login')

    cy.get('button[type="submit"]')
      .should('be.disabled')
  })
})
