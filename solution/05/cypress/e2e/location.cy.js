/// <reference types="cypress" />

describe('share location', () => {
  beforeEach(() => {
    cy.fixture('user-location.json').as('userLocation')
    cy.visit('/')
      .then(w => {
        cy.get('@userLocation')
          .then(fakePosition => {
            cy.stub(w.navigator.geolocation, 'getCurrentPosition')
              .as('getUserPosition')
              .callsFake((cb) => {
                setTimeout(() => {
                  cb(fakePosition);
                }, 100);
              });
          });
        cy.stub(w.navigator.clipboard, 'writeText')
          .as('saveToClipboard')
          .resolves();
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
    cy.get('[data-cy="share-loc-btn"]').click()
    cy.get('@saveToClipboard').should('have.been.called')
    cy.get('@userLocation')
      .then(fakePosition => {
        const {latitude, longitude} = fakePosition.coords;
        cy.get('@saveToClipboard')
          .should(
            'have.been.calledWithMatch', 
            new RegExp(`${latitude}.*${longitude}.*${encodeURI('John Doe')}`)
          );
      });
  });
});