/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

// Helpers
const { mimeTypes } = require('../helpers/mime-types');

// Map of current updates in progress
const matchedMimeTypes = new Map();

/**
 * Match the request path extension with the mime type list and return the matched mime type.
 *
 * @param {string} extension - Request path extension.
 * @returns {string|undefined} - Matched mime type or undefined.
 */
const getMimeType = extension => {

  // Check did we already matched the extension with mime type
  if (matchedMimeTypes.has(extension)) {
    return matchedMimeTypes.get(extension);
  }

  // We didn't matched the extensions, try to match it
  Object.entries(mimeTypes).some(([mimeType, mimeTypeExtensions]) => (
    mimeTypeExtensions.some(mimeTypeExtension => (mimeTypeExtension === extension
      ? !!(matchedMimeTypes.set(mimeTypeExtension, mimeType))
      : false
    ))
  ));

  // return the matched extension mime type or undefined
  return matchedMimeTypes.get(extension);
};

module.exports = {
  getMimeType
};
