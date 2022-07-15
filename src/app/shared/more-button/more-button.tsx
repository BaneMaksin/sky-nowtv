/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import React from 'react';

import { MoreButtonInterfaces } from './more-button.interfaces';

// Style
import style from './more-button.scss';

/**
 * Shared load more messages button component.
 *
 * @param clickHandler - Button click handler.
 * @param isMore - Flag if there is more messages to load.
 * @returns Virtual element.
 */
export const MoreButton = ({
  clickHandler,
  isMore
}: MoreButtonInterfaces): JSX.Element => (
  isMore ? (
    <button
      className={style.button}
      aria-label="Load more"
      onClick={clickHandler}
      type="button"
    >
      Load more
    </button>
  ) : null
);
