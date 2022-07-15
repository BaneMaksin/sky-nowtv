/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

describe('404 page', () => {

  before(() => {
    cy.visit('/nothing');
  });

  it('should visit the 404 page', () => {
    cy.get('h1').should('have.text', '404');
    cy.get('section > :nth-child(2)').should('have.text', 'Page can not be found!');
  });
});
