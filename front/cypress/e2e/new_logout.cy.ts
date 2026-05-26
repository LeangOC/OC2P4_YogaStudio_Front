describe('Logout', () => {

  beforeEach(() => {

    cy.intercept('GET', '**/api/session', {
      fixture: 'sessions.json'
    }).as('sessions')

    cy.login('john@test.com', '123456')

    cy.wait('@sessions')
  })

  it('should logout user', () => {

    cy.contains('Logout')
      .click()

    cy.url()
      .should('include', '/login')
  })
})
