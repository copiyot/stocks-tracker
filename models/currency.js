/**
 * model for currency of a given country with ISO 4217 code
 *
 * @param {string} country name of country
 * @param {string} currency name of the currency
 * @param {string} ISO4217Code ISO 4217 code for the currency
 */

function Currency(country, currency, ISO4217Code) {
  this.country = country;
  this.currency = currency;
  this.ISO4217Code = ISO4217Code;
}

module.exports.Currency = Currency;
