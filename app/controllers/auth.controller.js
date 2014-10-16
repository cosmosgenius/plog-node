"use strict";
/**
 * Check is the given token is authorized
 * @param  {string}  token Auth token
 * @return {Boolean}       
 */
exports.isAuthorized = function isAuthorized(token) {
    if(token === process.env.ACCESS_TOKEN) {
        return true;
    }
    return false;
};