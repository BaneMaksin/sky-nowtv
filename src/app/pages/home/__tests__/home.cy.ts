/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { getByTestId, macBook13, iphoneX } from '@cypress';

describe('Homepage', () => {

  before(() => {
    cy.visit('/');
  });

  it('messages should show all the correct details', () => {
    cy.get('h1').should('have.text', 'Messages');
    cy.get('[data-testid="message-individual"]').should('be.visible');
    getByTestId('message-individual').eq(0).should('have.text', 'Mauris lacinia sapien quis libero.');
    cy.get('[data-testid="message-image"]').should('be.visible');
    cy.get('[data-testid="message-author"]').should('be.visible');
    getByTestId('message-author').eq(0).should('have.text', 'Amanda Baker');
    cy.get('[data-testid="message-date"]').should('be.visible');
    getByTestId('message-date').eq(0).should('have.text', '27th Feb 2017 13:47');
  });

  it('should have a Load more button', () => {
    cy.get('button').should('have.text', 'Load more');
  });

  it('should load more messages when the Load more button is clicked', () => {
    getByTestId('home-message').should('have.length', 20);
    cy.get('button').click();
    getByTestId('home-message').should('have.length', 40);
  });

  it('should not show the Load more button when there is no more data to show', () => {
    cy.get('button').click();
    cy.get('button').click();
    cy.get('button').click();
    cy.get('button').should('not.exist');
  });

  it('should show the correct layout for macbook13 devices', macBook13, () => {
    getByTestId('side-section').contains('Home');
  });

  it('should show the correct layout for iphoneX devices', iphoneX, () => {
    getByTestId('menu-header').contains('Home');
  });
});
