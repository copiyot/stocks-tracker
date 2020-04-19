/**
 * model for language
 *
 * @param {string} language name of the language
 * @param {string} ISO6391Code ISO 639-1 code for the language
 */

function Language(language, ISO6391Code) {
  this.language = language;
  this.ISO6391Code = ISO6391Code;
}

module.exports.Language = Language;
