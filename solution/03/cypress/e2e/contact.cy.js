/// <reference types="Cypress" />

describe('contact form', () => {
  it('should submit the form', () => {
    cy.visit('http://localhost:5173/about')
    cy.get('[data-cy="contact-input-message"]').type("Hi, Nice to meet you")
    cy.get('[data-cy="contact-input-name"]').type('John Doe')
    cy.get('[data-cy="contact-input-email"]').type('test@example.com')
    cy.get('[data-cy="contact-btn-submit"][type="submit"]')
      .contains('Send Message')
      .and('not.have.attr',  'disabled')
    const btn = cy.get('[data-cy="contact-btn-submit"][type="submit"]')
    btn.click()
    btn.contains('Sending...')
    btn.should('have.attr', 'disabled')
  })
})