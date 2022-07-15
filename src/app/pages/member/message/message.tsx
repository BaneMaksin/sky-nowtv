/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import React from 'react';

import { MemberMessageProps } from './message.interfaces';

// Style
import style from './message.scss';

/**
 * Member message component.
 *
 * @param formattedDate - Formatted date.
 * @param message - Member message.
 * @returns Virtual element.
 */
export const MemberMessage = ({
  data: {
    formattedDate,
    message
  }
}: MemberMessageProps): JSX.Element => (
  <div
    data-testid="member-message"
    className={style.card}
  >

    <div className={style.message}>
      <p className={style.text}>
        {message}
      </p>
    </div>

    <div className={style.author}>
      <small className={style.date}>
        {formattedDate}
      </small>
    </div>
  </div>
);
