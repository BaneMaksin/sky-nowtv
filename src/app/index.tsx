/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { useDeepCompareEffect, Loader } from '@shared';

import { LeftColumn } from './left-column';
import { Boundary } from './boundary';
import { Header } from './header';
import { Errors } from './errors';
import { Pages } from './pages';

// Style
import style from './index.scss';

/**
 * Main application entry layer component.
 *
 * @returns Virtual element.
 */
export function App(): JSX.Element {

  // Get router location object
  const location = useLocation();

  // Use element reference to scroll to the top
  const contentWrapperRef = useRef(null);

  // Scroll to the top of the page if content wrapper is not at the top position
  useDeepCompareEffect(() => {
    contentWrapperRef?.current?.scroll({
      behavior: 'smooth',
      top: 0
    });
  }, [location]);

  return (
    <Boundary>
      <main className={style['app-wrapper']}>
        <Header />

        <div className={style.wrapper}>
          <LeftColumn />

          <article className={style['main-container']}>
            <div
              className={style['content-wrapper']}
              ref={contentWrapperRef}
            >

              <Errors />
              <Pages />
              <Loader />
            </div>
          </article>
        </div>
      </main>
    </Boundary>
  );
}
