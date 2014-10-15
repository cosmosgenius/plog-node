"use strict";

var errorMap = {
    1404: {
        errorCode : 1404,
        status : 404,
        message : "Log doesn't exist"
    }
};

exports.getErrorMessage = function getErrorMessage (errorCode) {
    return errorMap[errorCode];
};