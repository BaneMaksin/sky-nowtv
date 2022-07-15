/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import React from 'react';

import { Copyright } from '@shared';

import { HeaderMenu } from './menu';

// Style
import style from './header.scss';

/**
 * Main header component.
 *
 * @returns Virtual element.
 */
export const Header = (): JSX.Element => (
  <header className={style.header}>
    <div className={style.circles} />

    <HeaderMenu />

    <Copyright className={style.copyright} />
  </header>
);
