/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

// Dependencies
const { resolve, extname } = require('path');
const { promises: { readFile, access } } = require('fs');
const { parse } = require('url');

// Helpers
const { getMimeType } = require('./get-mime');

/**
 * HTTP server request handler.
 *
 * @param {string} directory - Server absolute root path directory.
 * @returns {function({url?: *}, *): Promise<boolean>} - Request handler.
 */
const requestHandler = directory => async ({ url }, response) => {
  const { pathname } = parse(url);
  const filteredPathName = `.${pathname.replace(/^(\\.)+/, '.')}`;
  const absolutePathName = resolve(
    directory,
    pathname.split('/').pop().indexOf('.') === -1 || filteredPathName === './'
      ? './index.html'
      : filteredPathName
  );
  let content;

  // First try to verify if file exist and if it's readable
  try {
    await access(absolutePathName);
  } catch (error) {

    // Log the error
    console.error(error);

    // Set 404 status code
    response.statusCode = 404;
    response.end(`File ${pathname} not found!`);

    // Stop further execution
    return false;
  }

  // Everything seems to be ok, try to read the file and serve it content
  try {
    content = await readFile(absolutePathName, 'binary');
  } catch (error) {

    // Log the error
    console.error(error);

    // Set 500 status code
    response.statusCode = 500;
    response.end('Server encountered the error while reading the file content');

    // Stop further execution
    return false;
  }

  // All is good, set the headers
  response.setHeader(
    'Content-type',
    getMimeType(extname(absolutePathName).substring(1)) || 'application/octet-stream'
  );

  // Finally send the response to the client
  response.end(content, 'binary');

  return true;
};

module.exports = {
  requestHandler
};
