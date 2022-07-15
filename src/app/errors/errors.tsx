/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import React from 'react';

import { ErrorsProps } from './errors.interface';
import { useErrors } from './hooks';

// Style
import style from './errors.scss';

/**
 * Errors component.
 *
 * @param errors - List of custom errors.
 * @returns Virtual element.
 */
export function Errors({ errors }: ErrorsProps): JSX.Element {

  // Get all errors
  const mappedErrors = useErrors(errors);

  // Render the view
  return mappedErrors?.length ? (
    <aside>
      <div className={style.section}>
        <div className={style.title}>
          Errors
        </div>

        <ul>
          {mappedErrors.map(({ name, message }) => (
            <li>
              <div className={style.products}>
                {name}
              </div>

              <span className={style.status}>
                {message}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  ) : null;
}
