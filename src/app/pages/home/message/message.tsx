/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Member } from '@store/members';
import { selectors } from '@store';

import { HomeMessageProps } from './message.interfaces';

// Style
import style from './message.scss';

/**
 * Shared copyright stateless component.
 *
 * @param className - Style class.
 * @returns Virtual element.
 */
export function HomeMessage({
  data: {
    formattedDate,
    message,
    userId
  }
}: HomeMessageProps): JSX.Element {

  // Get member data based on ID
  const {
    firstName,
    lastName,
    avatar,
    email
  }: Member = useSelector(selectors.getMemberById(userId));

  // Render the view
  return (
    <div
      data-testid="home-message"
      className={style.card}
    >

      <div className={style.message}>
        <p
          data-testid="message-individual"
          className={style.text}
          data-email={email}
        >
          {message}
        </p>

        <img
          alt={`${firstName} ${lastName} avatar`}
          data-testid="message-image"
          className={style.avatar}
          src={avatar}
        />
      </div>

      <div className={style.author}>
        <Link
          data-testid="message-author"
          to={`member/${userId}`}
          className={style.name}
        >
          {firstName}
          {' '}
          {lastName}
        </Link>

        <small
          data-testid="message-date"
          className={style.date}
        >
          {formattedDate}
        </small>
      </div>
    </div>
  );
}
