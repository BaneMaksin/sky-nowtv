/*
 * Date: 7/15/22, 9:30 AM
 * Copyright: Branislav Maksin (c) 2022
 */

const { TestEnvironment } = require('jest-environment-jsdom'); // for browser js apps

/**
 * Sky Jest environment.
 */
class SkyJestEnvironment extends TestEnvironment {

  /**
   * Constructor.
   *
   * @param {object} config - Project configuration.
   * @param {object} context - Environment context.
   */
  constructor({ globalConfig, projectConfig }, context) {
    super({ globalConfig, projectConfig }, context);
  }

  /**
   * Setup global property before each test suite.
   *
   * @returns {Promise<void>}
   */
  async setup() {
    await super.setup();

    // Assign environment generated variables to global Jest space
    this.global.STORE_REDUCERS_PATHS = JSON.parse(process.env.STORE_REDUCERS_PATHS);
    this.global.__OS_SEPARATOR__ = process.env.__OS_SEPARATOR__;
  }

  /**
   * Teardown before each test suite.
   *
   * @returns {Promise<void>}
   */
  async teardown() {
    await super.teardown();
  }

  /**
   * Run Script instance.
   *
   * @param {Script} script - Script class instance.
   * @returns {unknown}
   */
  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = SkyJestEnvironment;
