/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

/**
 * Mocked global resize observable instance.
 */
class ResizeObserver {
  observe = jest.fn();

  unobserve = jest.fn();

  disconnect = jest.fn();
}

Object.defineProperty(window, 'ResizeObserver', { value: ResizeObserver });
