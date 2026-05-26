describe('Create Session', () => {

  beforeEach(() => {

    cy.intercept('POST', '/api/auth/login', {
      fixture: 'admin.json'
    }).as('login')

    cy.intercept('GET', '**/api/session', {
      fixture: 'sessions.json'
    }).as('sessions')

    cy.intercept('GET', '**/api/teacher*', {
      fixture: 'teachers.json'
    }).as('teachers')

    cy.intercept('POST', '**/api/session', {
      body: {
        id: 2,
        name: 'New Yoga Session',
        description: 'Evening yoga',
        date: '2024-02-01',
        teacher_id: 1,
        users: [],
        createdAt: '2024-02-01T00:00:00.000Z',
        updatedAt: '2024-02-01T00:00:00.000Z'
      }
    }).as('createSession')

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

  it('should create session', () => {
    cy.contains('Create')
      .click()
    cy.url()
      .should('include', '/sessions/create')
    cy.get('input[formControlName="name"]')
      .type('New Yoga Session')
    cy.get('input[formControlName="date"]')
      .type('2024-02-01')
    cy.get('mat-select[formControlName="teacher_id"]')
      .click()
    cy.wait('@teachers')
    cy.contains('.mat-mdc-option', 'Margot')
      .click()
    cy.get('textarea[formControlName="description"]')
      .type('Evening yoga')
    cy.get('button[type="submit"]')
      .click()
    cy.wait('@createSession')
    cy.url()
      .should('include', '/sessions')
  })

  it('should display error when required field is missing', () => {

    cy.contains('Create')
      .click()

    cy.url()
      .should('include', '/sessions/create')

    cy.get('input[formControlName="name"]')
      .click()
      .blur()
      .should('have.class', 'ng-invalid')

    cy.get('input[formControlName="date"]')
      .click()
      .blur()
      .should('have.class', 'ng-invalid')

    cy.get('mat-select[formControlName="teacher_id"]')
      .should('have.class', 'ng-invalid')

    cy.get('button[type="submit"]')
      .should('be.disabled')
  })
})
