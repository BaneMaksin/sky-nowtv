/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import React from 'react';
import { useParams } from 'react-router-dom';

import { Grid, MoreButton, useLoadMoreMessages } from '@shared';
import { MappedMessage } from '@store/messages';

import { useCheckMemberId, useStoreData } from './hooks';
import { MemberMessage } from './message';
import { MemberHeader } from './header';

// Style
import style from './member.scss';

/**
 * Member page component.
 *
 * @returns Virtual element.
 */
export function MemberPage(): JSX.Element {

  // Get member ID from route params
  const { memberId } = useParams();

  // Check if member id is in valid format
  const isMemberIdValid = useCheckMemberId(memberId);

  // Handle batch messages load
  const { chunk, memoizedClickHandler } = useLoadMoreMessages();

  // Get messages and member data
  const { messages, member, isMore } = useStoreData(chunk, memberId, isMemberIdValid);

  // Render view
  return messages?.length && member ? (
    <section>
      <h1 className={style.title}>
        Member
      </h1>

      <MemberHeader member={member} />

      <h3 className={style.title}>
        Messages
      </h3>

      <Grid>
        {messages.map((message: MappedMessage) => (
          <MemberMessage
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
