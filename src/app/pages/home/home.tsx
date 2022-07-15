/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import React from 'react';

import { useLoadMoreMessages, MoreButton, Grid } from '@shared';
import { MappedMessage } from '@store/messages';

import { HomeMessage } from './message';
import { useStoreData } from './hooks';

// Style
import style from './home.scss';

/**
 * Homepage component.
 *
 * @returns Virtual element.
 */
export function HomePage(): JSX.Element {

  // Handle batch messages load
  const { chunk, memoizedClickHandler } = useLoadMoreMessages();

  // Get messages and members data
  const { messages, members, isMore } = useStoreData(chunk);

  // Render the view
  return messages?.length && members ? (
    <section className={style.content}>
      <h1 className={style.title}>
        Messages
      </h1>

      <Grid>
        {messages.map((message: MappedMessage) => (
          <HomeMessage
            key={message.id}
            data={message}
          />
        ))}
      </Grid>

      <MoreButton
        clickHandler={memoizedClickHandler}
        isMore={isMore}
      />
    </section>
  ) : null;
}
