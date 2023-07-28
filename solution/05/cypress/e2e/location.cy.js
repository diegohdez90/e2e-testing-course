/// <reference types="cypress" />

describe('share location', () => {
  beforeEach(() => {
    cy.visit('/')
      .then(w => {
        cy.stub(w.navigator.geolocation, 'getCurrentPosition')
          .as('getUserPosition')
          .callsFake((cb) => {
            setTimeout(() => {
              cb({
                coords: {
                  latitude: 37.5,
                  longitude: 48.01
                }
              });
            }, 100);
          });
      });
  });
  it('should fetch the user location', () => {
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('@getUserPosition').should('have.been.called')
    cy.get('[data-cy="get-loc-btn"]').should('be.disabled');
    cy.get('[data-cy="actions"]').should('contain', 'Location fetched')
  });

  it('shoudl share a location URL', () => {
    cy.get('[data-cy="name-input"]').type('John Doe');
    cy.get('[data-cy="get-loc-btn"]').click()
  });
});
