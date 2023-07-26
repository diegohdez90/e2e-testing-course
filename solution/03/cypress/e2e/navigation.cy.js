/// <reference types="Cypress" />

describe('page navigation', () => {
  it('should navigate beetween pages', () => {
    cy.get('[data-cy="header-about-link"]')
  });
});
