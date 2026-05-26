describe('Session Detail', () => {

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

  it('should display session information', () => {

    cy.contains('Detail').click()

    cy.wait('@sessionDetail')
    cy.wait('@teacher')

    cy.contains('Yoga Session')
      .should('be.visible')

    cy.contains('Morning yoga')
      .should('be.visible')

    cy.contains('Margot')
      .should('be.visible')
  })

  it('should display delete button for admin', () => {

    // cy.visit('/sessions/detail/1')
    // il charge directement la page /sessions/detail/1

    cy.contains('Detail').click()


    cy.wait('@sessionDetail')
    cy.wait('@teacher')

    cy.contains('Delete')
      .should('be.visible')
  })
})
