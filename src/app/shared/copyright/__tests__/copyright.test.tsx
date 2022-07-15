/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import React from 'react';
import { render } from '@testing-library/react';
import { expect } from '@jest/globals';

import { Copyright } from '../copyright';

describe('Shared copyright component', () => {

  it('should render copyright component without custom style class', () => {

    // Render the component
    const { asFragment } = render(<Copyright />);

    // Match the snapshot
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render copyright component with custom style class', () => {

    // Render the component
    const { container } = render(<Copyright className="foo-bar" />);

    // Find the custom class
    expect(container.querySelector('small').classList.contains('foo-bar'))
      .toBeTruthy();
  });
});
