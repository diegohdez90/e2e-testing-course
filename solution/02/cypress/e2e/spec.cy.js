/// <reference types="Cypress" />

describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/')
    cy.get('.main-header img');
  })
})