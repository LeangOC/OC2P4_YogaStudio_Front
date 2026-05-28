describe('AuthGuard', () => {

  it('should redirect unauthenticated user to login', () => {

    cy.visit('/sessions')

    cy.url().should('include', '/login')
  })
})
