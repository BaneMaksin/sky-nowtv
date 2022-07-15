/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import React from 'react';

import { CopyrightProps } from './copyright.interface';

/**
 * Shared copyright stateless component.
 *
 * @param className - Style class.
 * @returns Virtual element.
 */
export const Copyright = ({ className = '' }: CopyrightProps): JSX.Element => (
  <small {...(className ? { className } : {})}>
    Copyright ©
    {new Date().getFullYear()}
    Sky UK
  </small>
);
