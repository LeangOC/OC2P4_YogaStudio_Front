describe('Update Session', () => {

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

    cy.intercept('GET', '**/api/teacher*', {
      fixture: 'teachers.json'
    }).as('teachers')

    cy.intercept('GET', '**/api/teacher/1', {
      fixture: 'teacher-detail.json'
    }).as('teacher')

    cy.intercept('PUT', '**/api/session/1', {
      body: {
        id: 1,
        name: 'Updated Yoga Session',
        description: 'Updated description',
        date: '2024-03-01',
        teacher_id: 1,
        users: [],
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-03-01T00:00:00.000Z'
      }
    }).as('updateSession')

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
  it('should update session', () => {

    cy.contains('Edit')
      .click()

    cy.url()
      .should('include', '/sessions/update/1')

    cy.get('input[formControlName="name"]')
      .clear()
      .type('Updated Yoga Session')

    cy.get('input[formControlName="date"]')
      .clear()
      .type('2024-03-01')

    cy.get('mat-select[formControlName="teacher_id"]')
      .click()

    cy.wait('@teachers')

    cy.contains('.mat-mdc-option', 'Margot')
      .click()

    cy.get('textarea[formControlName="description"]')
      .clear()
      .type('Updated description')

    cy.get('button[type="submit"]')
      .click()

    cy.wait('@updateSession')

    cy.url()
      .should('include', '/sessions')
  })

  it('should display error when required field is missing', () => {

    cy.contains('Edit')
      .click()

    cy.url()
      .should('include', '/sessions/update/1')

    cy.get('input[formControlName="name"]')
      .clear()
      .click()
      .blur()

    cy.get('input[formControlName="date"]')
      .clear()
      .click()
      .blur()

    cy.get('textarea[formControlName="description"]')
      .clear()
      .click()
      .blur()

    cy.get('button[type="submit"]')
      .should('be.disabled')

    cy.get('input[formControlName="name"]')
      .should('have.class', 'ng-invalid')

    cy.get('input[formControlName="date"]')
      .should('have.class', 'ng-invalid')

    cy.get('textarea[formControlName="description"]')
      .should('have.class', 'ng-invalid')
  })
})
