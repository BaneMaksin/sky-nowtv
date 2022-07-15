/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import React from 'react';

import { SideCopyright } from './copyright';
import { SideMenu } from './menu';

// Style
import style from './left-column.scss';

/**
 * Left column stateless component.
 *
 * @returns Virtual element.
 */
export const LeftColumn = (): JSX.Element => (
  <aside className={style.left}>
    <SideMenu />

    <SideCopyright />
  </aside>
);
