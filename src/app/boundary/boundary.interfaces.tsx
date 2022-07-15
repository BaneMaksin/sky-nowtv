/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { ReactNode } from 'react';

// Boundary component local state
export interface BoundaryState {
  hasError: boolean;
  error: Error;
}

// Boundary component input properties
export interface BoundaryProps {
  children: ReactNode;
}
