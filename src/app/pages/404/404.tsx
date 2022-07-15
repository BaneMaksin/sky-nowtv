/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import React from 'react';

/**
 * Fallback match for no matching routes stateless component.
 *
 * @returns Virtual element.
 */
export const NoMatchPage = (): JSX.Element => (
  <section>
    <h1>
      404
    </h1>

    <p>
      Page can not be found!
    </p>

    <p>
      Please navigate to the home page
    </p>
  </section>
);
