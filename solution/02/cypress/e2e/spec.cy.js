/// <reference types="Cypress" />

describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/')
    cy.get('.main-header img');
  });

  it('should display the page title', () => {
    cy.visit('http://localhost:5173/')
    cy.get('h1').contains('React Tasks')
  })
})