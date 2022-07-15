/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import React from 'react';

import { MemberHeaderProps } from './header.interfaces';

// Style
import style from './header.scss';

/**
 * Member header stateless component.
 *
 * @param firstName - Member first name.
 * @param lastName - Member last name.
 * @param email - Member email address.
 * @param avatar - Member avatar.
 * @returns Virtual element.
 */
export const MemberHeader = ({
  member: {
    firstName,
    lastName,
    avatar,
    email
  }
}: MemberHeaderProps): JSX.Element => (
  <header className={style.header}>
    <div className={style.context}>
      <h2 className={style.title}>
        {firstName}
        {' '}
        {lastName}
      </h2>

      <div
        data-testid="member-email"
        className={style.text}
      >
        <a href={`mailto: ${email}`}>
          {email}
        </a>
      </div>
    </div>

    <img
      alt={`${firstName} ${lastName}`}
      data-testid="member-image"
      className={style.image}
      src={avatar}
    />
  </header>
);
