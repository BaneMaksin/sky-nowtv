/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import React from 'react';
import { render } from '@testing-library/react';

import { Grid } from '../grid';

describe('Shared grid component', () => {

  it('should render grid component without custom style class', () => {

    // Render the component
    const { asFragment } = render(
      <Grid>
        Foo Bar
      </Grid>
    );

    // Match the snapshot
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render grid component with custom style class', () => {

    // Render the component
    const { container } = render(
      <Grid className="foo-bar">
        Foo Bar
      </Grid>
    );

    // Find the custom class
    expect(container.querySelector('div').classList.contains('foo-bar'))
      .toBeTruthy();
  });
});
