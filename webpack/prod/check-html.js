/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

const { promises: { readFile } } = require('fs');
const { join } = require('path');
const { validate } = require('schema-utils');

// Plugin name
const PLUGIN_NAME = 'Check generated HTML file markup';

// Schema for env object
const envSchema = {
  type: 'object',
  properties: {
    NODE_ENV: {
      type: 'string'
    }
  }
};

/**
 * Webpack plugin to run after compilation has emitted all the assets and check for valid index HTML markup.
 */
class CheckHTMLMarkupPlugin {

  /**
   * Constructor.
   *
   * @param {object} env - Environment properties.
   */
  constructor(env) {

    // Validate constructor arguments
    validate(envSchema, env, {
      name: PLUGIN_NAME
    });

    // Assign constructor options to the class instance
    this._env = env;
  }

  /**
   * Plugins are instantiated objects with an apply method on their prototype. This apply method is called
   * once by the webpack compiler while installing the plugin. The apply method is given a reference
   * to the underlying webpack compiler, which grants access to compiler callbacks.
   *
   * @param {object} compiler - The compiler module is the main engine that creates a compilation instance
   * with all the options passed through the CLI or Node API.
   */
  apply(compiler) {

    // Specify the event hook to attach to
    compiler.hooks.afterEmit.tapPromise(
      PLUGIN_NAME,

      /**
       * Tap into the plugins.
       *
       * @param {object} compilation - Compilation hooks instance.
       * @returns {Promise<boolean>} - Promise that will be resolved when the markup of
       * index HTML file has been verified.
       */
      async compilation => {

        // Safety check for production build
        if (this._env.NODE_ENV !== 'production') {
          return true;
        }

        // Get index HTML distributable path
        const indexHTMLFilename = compilation.options.plugins
          .find(plugin => plugin.constructor.name === 'HtmlWebpackPlugin')?.options?.filename;

        // Safety check for production build
        if (!indexHTMLFilename) {
          throw new Error('Missing compilation index HTML file!');
        }

        // Get the index HTML content
        const indexHTMLDistributableContent = await readFile(
          join(compilation.compiler.outputPath, indexHTMLFilename),
          'utf8'
        );

        // Check the content for required markup
        if (!indexHTMLDistributableContent.includes('<html')
          || !indexHTMLDistributableContent.includes('<head')
          || !indexHTMLDistributableContent.includes('<title')
          || !indexHTMLDistributableContent.includes('</head>')
          || !indexHTMLDistributableContent.includes('<body')
          || !indexHTMLDistributableContent.includes('id="app"')
          || !indexHTMLDistributableContent.includes('<script')
          || !indexHTMLDistributableContent.includes('</script>')
          || !indexHTMLDistributableContent.includes('</body>')
          || !indexHTMLDistributableContent.includes('</html>')
        ) {
          throw new Error('Index HTML file does not contains valid markup!');
        }

        // Everything seems good, proceed with compilation
        return true;
      }
    );
  }
}

module.exports = {
  CheckHTMLMarkupPlugin
};
