/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import React from 'react';
import { Link, useMatch } from 'react-router-dom';
import cn from 'classnames';

// Style
import style from './menu.scss';

/**
 * Header menu stateless component.
 *
 * @returns Virtual element.
 */
export function HeaderMenu(): JSX.Element {
  const isPrivacyRoute = useMatch('/privacy');
  const isHomeRoute = useMatch('/');

  return (
    <div
      data-testid="menu-header"
      className={style.menu}
    >
      <Link
        className={cn(
          style.link,
          { [style['is-active']]: !!isHomeRoute }
        )}
        to="/"
      >
        Home
      </Link>

      <Link
        className={cn(
          style.link,
          { [style['is-active']]: !!isPrivacyRoute }
        )}
        to="/privacy"
      >
        Privacy
      </Link>
    </div>
  );
}
