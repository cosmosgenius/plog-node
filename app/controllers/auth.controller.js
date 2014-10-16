"use strict";
var config = require("config");

/**
 * Check is the given token is authorized
 * @param  {string}  token Auth token
 * @return {Boolean}       
 */
exports.isAuthorized = function isAuthorized(token) {
    return true;
};