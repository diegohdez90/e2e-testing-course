/// <reference types="Cypress" />

describe('contact form', () => {
  it('should submit the form', () => {
    cy.visit('http://localhost:5173/about')
    cy.get('[data-cy="contact-input-message"]').type("Hi, Nice to meet you")
    cy.get('[data-cy="contact-input-name"]').type('John Doe')
    cy.get('[data-cy="contact-input-email"]').type('test@example.com')
    // cy.get('[data-cy="contact-btn-submit"][type="submit"]')
    //   .contains('Send Message')
    //   .and('not.have.attr',  'disabled')


    // const btn = cy.get('[data-cy="contact-btn-submit"][type="submit"]')
    // btn.click()
    // btn.contains('Sending...')
    // btn.should('have.attr', 'disabled')

    cy.get('[data-cy="contact-btn-submit"][type="submit"]')
      .then(el => {
        expect(el.attr('disabled')).to.be.undefined;
        expect(el.text()).to.be.eq('Send Message')
      })

    cy.get('[data-cy="contact-btn-submit"][type="submit"]').as('submitBtn')
    cy.get('@submitBtn').click()
    cy.get('@submitBtn').contains('Sending...')
    cy.get('@submitBtn').should('have.attr', 'disabled')
  })
})