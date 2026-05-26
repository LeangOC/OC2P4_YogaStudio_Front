describe('Sessions', () => {

  beforeEach(() => {

    cy.intercept('POST', '/api/auth/login', {
      fixture: 'admin.json'
    }).as('login')

    cy.intercept('GET', '/api/session', {
      fixture: 'sessions.json'
    }).as('sessions')

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

  it('should display sessions list', () => {

    cy.contains('Yoga Session')
      .should('be.visible')

    cy.contains('Morning yoga')
      .should('be.visible')
  })

  it('should display admin buttons', () => {

    cy.contains('Create')
      .should('be.visible')

    cy.contains('Detail')
      .should('be.visible')
  })

})

