/// <reference types="Cypress" />

describe('contact form', () => {
  it('should submit the form', () => {
    cy.visit('http://localhost:5173/about')
    cy.get('[data-cy="contact-input-message"]').type("Hi, Nice to meet you")
    cy.get('[data-cy="contact-input-name"]').type('John Doe')
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
    cy.get('[data-cy="contact-input-email"]').type('test@example.com{enter}')

    cy.get('[data-cy="contact-btn-submit"][type="submit"]').as('submitBtn')
    //cy.get('@submitBtn').click()
    cy.get('@submitBtn').contains('Sending...')
    cy.get('@submitBtn').should('have.attr', 'disabled')
  })

  it('should validate the form input', () => {
    cy.visit('http://localhost:5173/about')
    cy.get('[data-cy="contact-btn-submit"][type="submit"]').click();
    cy.get('[data-cy="contact-btn-submit"][type="submit"]')
      .then(el => {
        expect(el).to.not.have.attr('disabled');
        expect(el.text()).to.not.equal('Sending...')
      })
    cy.get('[data-cy="contact-btn-submit"][type="submit"]').contains('Send Message');

    cy.get('[data-cy="contact-input-message"]').as('inpnutMsg')
    cy.get('@inpnutMsg').focus().blur()
    cy.get('@inpnutMsg')
      .parent()
      .then(el => {
        expect(el.attr('class')).to.contains('invalid')
      })
    cy.get('[data-cy="contact-input-name"]').focus().blur()
    cy.get('[data-cy="contact-input-name"]')
      .parent()
      .then(el => {
        expect(el.attr('class')).to.contains('invalid')
      })
    cy.get('[data-cy="contact-input-email"]').focus().blur()
    cy.get('[data-cy="contact-input-email"]')
      .parent()
      .then(el => {
        expect(el.attr('class')).to.contains('invalid')
      })
  });
})