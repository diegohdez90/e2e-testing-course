describe('tasks management', () => {
  it('should open and close the new tasks modal',  () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Add Task').click()
    cy.get('.backdrop').click({
      force: true
    })
    cy.get('.backdrop').should('not.exist')
    cy.get('.modal').should('not.exist')
    
    cy.contains('Add Task').click()
    cy.contains('Cancel').click();
    cy.get('.backdrop').should('not.exist')
    cy.get('.modal').should('not.exist')
  })

  it('should createa a new task', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Add Task').click()
    cy.get('#title').type('New Task');
    cy.get('#summary').type('Some description');
    cy.get('.modal').contains('Add Task').click();
    cy.get('.backdrop').should('not.exist')
    cy.get('.modal').should('not.exist')
    cy.get('ul.task-list').find('li.task:last-child').find('h2').contains('New Task')
    cy.get('ul.task-list').find('li.task:last-child').find('p').contains('Some description')
  })

  it('should validate modal form', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Add Task').click()
    cy.get('.error-message').should('not.exist')
    cy.get('#title').type('New Task');
    cy.get('.modal').contains('Add Task').click();
    cy.get('.error-message').should('exist').contains('Please provide values for task title, summary and category!')
  })
})