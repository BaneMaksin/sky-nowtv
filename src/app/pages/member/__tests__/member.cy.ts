/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

describe('Member page', () => {

  before(() => {
    cy.visit('/member/73f30d93-f87b-45ea-bda5-60fa4b3716b5');
  });

  it('should have the correct name and details', () => {
    cy.get('h2').should('have.text', 'Amanda Baker');
    cy.get('[data-testid="member-email"]').should('have.text', 'abakera@craigslist.org');
    cy.get('[data-testid="member-image"]').should('be.visible');
  });

  it('should have the correct number of messages', () => {
    cy.get('[data-testid="member-message"]').should('have.length', 3);
  });
});
