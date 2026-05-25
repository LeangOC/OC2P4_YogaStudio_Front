describe('Sessions', () => {

  beforeEach(() => {

    cy.intercept('POST', '/api/auth/login', {
      fixture: 'admin.json'
    }).as('login')

    cy.intercept('GET', 'api/session', {
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

  it('should display create button for admin', () => {

    cy.contains('Create')
      .should('be.visible')
  })

  it('should navigate to detail page', () => {

    cy.contains('Detail')
      .click()

    cy.url().should('include', '/sessions/detail')
  })
})

// Detail session
it('should display session details', () => {

  cy.intercept('GET', 'api/session/1', {
    fixture: 'session-detail.json'
  }).as('detail')

  cy.intercept('GET', 'api/teacher/1', {
    fixture: 'teachers.json'
  }).as('teacher')

  cy.visit('/sessions/detail/1')

  cy.wait('@detail')
  cy.wait('@teacher')

  cy.contains('Yoga Session')
    .should('be.visible')

  cy.contains('Morning yoga')
    .should('be.visible')

  cy.contains('Delete')
    .should('be.visible')
})

//Create session
it('should create session', () => {

  cy.intercept('GET', 'api/teacher', {
    fixture: 'teachers.json'
  }).as('teachers')

  cy.intercept('POST', 'api/session', {
    statusCode: 200,
    fixture: 'session-detail.json'
  }).as('createSession')

  cy.visit('/sessions/create')

  cy.wait('@teachers')

  cy.get('input[formControlName="name"]')
    .type('New Session')

  cy.get('input[formControlName="date"]')
    .type('2024-06-10')

  cy.get('mat-select').click()

  cy.get('mat-option')
    .first()
    .click()

  cy.get('textarea[formControlName="description"]')
    .type('Session description')

  cy.get('button[type="submit"]')
    .click()

  cy.wait('@createSession')

  cy.url().should('include', '/sessions')
})

//Modification session
it('should update session', () => {

  cy.intercept('GET', 'api/session/1', {
    fixture: 'session-detail.json'
  }).as('session')

  cy.intercept('GET', 'api/teacher', {
    fixture: 'teachers.json'
  }).as('teachers')

  cy.intercept('PUT', 'api/session/1', {
    statusCode: 200,
    fixture: 'session-detail.json'
  }).as('updateSession')

  cy.visit('/sessions/update/1')

  cy.wait('@session')
  cy.wait('@teachers')

  cy.get('input[formControlName="name"]')
    .clear()
    .type('Updated Session')

  cy.get('button[type="submit"]')
    .click()

  cy.wait('@updateSession')

  cy.url().should('include', '/sessions')
})

// Suppression session
it('should delete session', () => {

  cy.intercept('GET', 'api/session/1', {
    fixture: 'session-detail.json'
  }).as('detail')

  cy.intercept('GET', 'api/teacher/1', {
    fixture: 'teachers.json'
  }).as('teacher')

  cy.intercept('DELETE', 'api/session/1', {
    statusCode: 200
  }).as('deleteSession')

  cy.visit('/sessions/detail/1')

  cy.wait('@detail')
  cy.wait('@teacher')

  cy.contains('Delete')
    .click()

  cy.wait('@deleteSession')

  cy.url().should('include', '/sessions')
})



