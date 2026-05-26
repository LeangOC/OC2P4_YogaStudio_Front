describe('Login', () => {

  it('should login successfully', () => {

    cy.intercept('GET', '**/api/session', {
      fixture: 'sessions.json'
    }).as('sessions')

    cy.login('john@test.com', '123456')

    cy.wait('@sessions')

    cy.url()
      .should('include', '/sessions')
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
