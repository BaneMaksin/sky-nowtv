/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

// Constants
const { jestChunksPath } = require('./constants');

/**
 * Run Jest unit tests chunk based on CI_NODE_INDEX environment variable.
 */
const runParallel = () => {
  const { CI_NODE_INDEX } = process.env;

  // Get Jest unit tests chunks
  const jestChunks = require(jestChunksPath);

  // Check does chunk exists under CI_NODE_INDEX
  if (!jestChunks[CI_NODE_INDEX].length) {
    console.info(
      '\n',
      `Chunk under CI index ${CI_NODE_INDEX} doesn't contains any unit tests. Stopping the script.`,
      '\n'
    );

    process.exit(); // Default exit code is 0, success
  }

  // Chunk unit tests exists, add them to the list of CLI argument for Jest bin
  process.argv = [
    ...process.argv,
    ...jestChunks[CI_NODE_INDEX]
  ];
};

module.exports = {
  runParallel
};
