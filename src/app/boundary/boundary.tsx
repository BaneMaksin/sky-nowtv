/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import React, { Component, ReactNode } from 'react';

import { Errors } from '../errors';
import { BoundaryProps, BoundaryState } from './boundary.interfaces';

/**
 * Error boundary component.
 */
export class Boundary extends Component<BoundaryProps, BoundaryState> {

  // Local state
  state: BoundaryState = {
    hasError: false,
    error: null
  };

  /**
   * Unique method for updating local state on errors.
   *
   * @param error - Error instance.
   */
  static getDerivedStateFromError(error: Error): BoundaryState {
    return {
      hasError: true,
      error
    };
  }

  /**
   * Render view.
   *
   * @returns Virtual element.
   */
  render(): ReactNode {
    const { hasError, error } = this.state;
    const { children } = this.props;

    return hasError ? (
      <Errors errors={[error.message]} />
    ) : children;
  }
}
