/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import React from 'react';
import cn from 'classnames';

import { GridProps } from './grid.interface';

// Style
import style from './grid.scss';

/**
 * Shared grid stateless component.
 *
 * @param className - Style class.
 * @param children - Children elements.
 * @returns Virtual element.
 */
export const Grid = ({ className, children }: GridProps): JSX.Element => (
  <div
    className={cn(
      style.wrapper,
      { [className]: !!className }
    )}
  >
    {children}
  </div>
);
