/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import React from 'react';
import { Link, useMatch } from 'react-router-dom';
import cn from 'classnames';

// Style
import style from '../left-column.scss';

/**
 * Left column menu stateless component.
 *
 * @returns Virtual element.
 */
export function SideMenu(): JSX.Element {
  const isPrivacyRoute = useMatch('/privacy');
  const isHomeRoute = useMatch('/');

  return (
    <div className={style['side-wrapper']}>
      <div className={style['side-title']}>
        Menu
      </div>

      <div
        className={style['side-section']}
        data-testid="side-section"
      >
        <Link
          className={cn(
            style.link,
            { [style['is-active']]: !!isHomeRoute }
          )}
          to="/"
        >
          <svg
            viewBox="0 0 512 512"
            className={style.icon}
          >
            <g
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
            >
              <path
                d="M0 0h128v128H0zm0 0M192 0h128v128H192zm0 0M384 0h128v128H384zm0 0M0 192h128v128H0zm0 0"
                data-original="#bfc9d1"
              />
            </g>
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M192 192h128v128H192zm0 0"
              fill="currentColor"
              data-original="#82b1ff"
            />
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M384 192h128v128H384zm0 0M0 384h128v128H0zm0 0M192 384h128v128H192zm0 0M384 384h128v128H384zm0 0"
              fill="currentColor"
              data-original="#bfc9d1"
            />
          </svg>

          Home
        </Link>

        <Link
          className={cn(
            style.link,
            { [style['is-active']]: !!isPrivacyRoute }
          )}
          to="/privacy"
        >
          <svg
            className={style.icon}
            viewBox="0 0 512 512"
            fill="currentColor"
          >
            <circle
              transform="rotate(-45 295.062 327.332)"
              cx="295.099"
              cy="327.254"
              r="110.96"
            />

            {/* eslint-disable-next-line max-len */}
            <path d="M471.854 338.281V163.146H296.72v41.169a123.1 123.1 0 01121.339 122.939c0 3.717-.176 7.393-.5 11.027zM172.14 327.254a123.16 123.16 0 01100.59-120.915L195.082 73.786 40.146 338.281H172.64c-.325-3.634-.5-7.31-.5-11.027z" />
          </svg>
          Privacy
        </Link>
      </div>
    </div>
  );
}
