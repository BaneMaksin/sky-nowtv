/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

// Dependencies
const { networkInterfaces } = require('os');

/**
 * Get local IP address.
 *
 * @returns {string} - Local IP address.
 */
const getIPAddress = () => {
  let ipAddress = '';

  // Search system for valid IP address
  Object.values(networkInterfaces()).some(network => (
    Object.values(network).some(({ family, internal, address }) => (
      family === 'IPv4' && !internal ? (ipAddress = address) : false
    ))
  ));

  return ipAddress;
};

module.exports = {
  getIPAddress
};
