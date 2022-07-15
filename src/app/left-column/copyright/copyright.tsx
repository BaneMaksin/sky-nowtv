/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import React from 'react';

import { Copyright } from '@shared';

// Style
import style from '../left-column.scss';

/**
 * Left column copyright stateless component.
 *
 * @returns Virtual element.
 */
export const SideCopyright = (): JSX.Element => (
  <div className={style['side-wrapper']}>
    <div className={style['side-title']}>
      Copyright
    </div>

    <div className={style['side-section']}>
      <Copyright />
    </div>
  </div>
);
