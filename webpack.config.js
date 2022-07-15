/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

/**
 * Webpack configuration.
 *
 * @param {object} env - Environment properties.
 * @param {object} args - CLI arguments.
 * @returns {object | Error} - Webpack configuration or error object.
 */
const config = async (env, args) => {
  const { NODE_ENV } = process.env;

  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require,import/no-dynamic-require
    return require(`./webpack/${(env && env.NODE_ENV === 'production') || (NODE_ENV && NODE_ENV === 'production')
      ? 'prod' : 'dev'}`)(env, args);
  } catch (error) {
    throw new Error(`Missing webpack configuration object, received error instead: ${error}`);
  }
};

// Export configuration
module.exports = config;
