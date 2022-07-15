/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Loader } from '@shared';

// Lazy load components based on routes
const MemberRoutes = lazy(() => import('./member'));
const PrivacyPage = lazy(() => import('./privacy'));
const NoMatchPage = lazy(() => import('./404'));
const HomePage = lazy(() => import('./home'));

/**
 * Pages routes component.
 *
 * @returns Virtual element.
 */
export const Pages = (): JSX.Element => (
  <Suspense fallback={<Loader isVisible />}>
    <Routes>
      <Route
        element={<MemberRoutes />}
        path="/member/*"
      />
      <Route
        element={<PrivacyPage />}
        path="/privacy"
      />
      <Route
        element={<HomePage />}
        path="/"
      />
      <Route
        element={<NoMatchPage />}
        path="*"
      />
    </Routes>
  </Suspense>
);
