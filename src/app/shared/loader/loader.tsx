/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import { selectors } from '@store';

import { LoaderProps } from './loader.interfaces';

// Style
import style from './loader.scss';

/**
 * Member page component.
 *
 * @param isVisible - Manually set the visibility of the loader.
 * @returns Virtual element.
 */
export function Loader({ isVisible }: LoaderProps): JSX.Element {

  // Get loading state from the store
  const isMembersLoading = useSelector(selectors.getMembersLoading, shallowEqual);
  const isMessagesLoading = useSelector(selectors.getMessagesLoading, shallowEqual);

  // Render the view
  return isVisible || isMembersLoading || isMessagesLoading ? (
    <aside className={style.wrapper}>
      <div className={style.loader}>
        <div className={style.item} />
        <div className={style.item} />
        <div className={style.item} />
      </div>
    </aside>
  ) : null;
}
