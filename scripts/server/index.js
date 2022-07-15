/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

// Dependencies
const { createServer } = require('http');

// Base helpers
const { getIPAddress } = require('../helpers/local-ip');

// Helpers
const { getCLIArguments } = require('./cli-arguments');
const { requestHandler } = require('./request');

// Get server CLI arguments
const { directory, port } = getCLIArguments();

// Initialize the server
const server = createServer();

// Start listening on request events
server.on('request', requestHandler(directory));

// Lastly start listening on port
server.listen(port);

// Log that server has started running
console.info(
  '\n',
  `Server running at http://127.0.0.1:${port}/ and http://${getIPAddress()}:${port}`,
  '\n'
);
