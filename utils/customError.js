/**
 * custom error handling 
 * 
 * @param {string} message 
 * @param {string} code 
 */

function CustomError(message, code) {
  this.name = "CustomError";
  this.message = message;
  this.code = code;
}

CustomError.prototype = Error;
CustomError.constructor = CustomError;

module.exports.CustomError = CustomError;
