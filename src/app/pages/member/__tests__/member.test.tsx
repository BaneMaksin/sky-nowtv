/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import React from 'react';
import { render } from '@testing-library/react';
import { expect } from '@jest/globals';
import {
  MemoryRouter,
  Routes,
  Route
} from 'react-router-dom';

import { MemberPage } from '../member';

// Mock Redux module
jest.mock('react-redux');

// Mock store instance
jest.mock('@store', () => ({}));

// Mock use data hook
jest.mock('../hooks/use-data/use-data');

describe('Member page component', () => {

  it('should render member page component', () => {

    // Render the component
    const { asFragment } = render(
      <MemoryRouter initialEntries={['/member/e837c9f5-247f-445f-bcc3-7d434348336b']}>
        <Routes>
          <Route
            element={<MemberPage />}
            path="/member/:memberId"
          />
        </Routes>
      </MemoryRouter>
    );

    // Match the snapshot
    expect(asFragment()).toMatchSnapshot();
  });
});
