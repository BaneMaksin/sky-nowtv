/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { MemberPage } from './member';

/**
 * Member routes component.
 *
 * @returns Virtual element.
 */
export const MemberRoutes = (): JSX.Element => (
  <Routes>
    <Route
      element={<MemberPage />}
      path=":memberId"
    />
    <Route
      element={(
        <Navigate
          replace
          to="/"
        />
      )}
      path="*"
    />
  </Routes>
);
