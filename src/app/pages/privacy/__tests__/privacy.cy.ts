/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

describe('Privacy page', () => {

  before(() => {
    cy.visit('/privacy');
  });

  it('should visit the privacy page', () => {
    cy.get('h1').should('have.text', 'Lorem Ipsum');
  });
});
