/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

/**
 * Select element by data test id attribute
 * (Using testing library test ID naming convention without dash, instead of Cypress one to reuse the same test IDs).
 *
 * @param testId - Test ID name.
 * @param wildcard - Should the pseudo selector use wildcard.
 * @returns Cypress chainable HTML element.
 */
export const getByTestId = (testId: string, wildcard = false): Cypress.Chainable => (
  cy.get(`[data-testid${wildcard ? '*' : ''}="${testId}"]`)
);
