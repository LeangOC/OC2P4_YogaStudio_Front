describe('Delete Session', () => {

  beforeEach(() => {

    cy.intercept('POST', '/api/auth/login', {
      fixture: 'admin.json'
    }).as('login')

    cy.intercept('GET', '**/api/session', {
      fixture: 'sessions.json'
    }).as('sessions')

    cy.intercept('GET', '**/api/session/1', {
      fixture: 'session-detail.json'
    }).as('sessionDetail')

    cy.intercept('GET', '**/api/teacher/1', {
      fixture: 'teacher-detail.json'
    }).as('teacher')

    cy.intercept('DELETE', '**/api/session/1', {
      statusCode: 200
    }).as('deleteSession')

    cy.visit('/login')

    cy.get('input[formControlName="email"]')
      .type('admin@test.com')

    cy.get('input[formControlName="password"]')
      .type('123456')

    cy.get('button[type="submit"]')
      .click()

    cy.wait('@login')
    cy.wait('@sessions')
  })

  it('should delete session', () => {

    cy.contains('Detail')
      .click()

    cy.wait('@sessionDetail')
    cy.wait('@teacher')

    cy.contains('Delete')
      .click()

    cy.wait('@deleteSession')

    cy.url()
      .should('include', '/sessions')
  })
})
