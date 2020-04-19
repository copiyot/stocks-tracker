const axios = require("axios");

/**
 * 
 * @param {string} access_key 
 * @param {string} targetCurrency 
 */

const mainCurrencyConverter = async (access_key, targetCurrency) => {
  try {
    const response = await axios.get("http://apilayer.net/api/live", {
      params: {
        access_key,
        currencies: targetCurrency,
        source: "USD",
        format: 1,
      },
    });
    // get the key
    const [key] = Object.keys(response.data.quotes);
    //return currency multiplier
    return response.data.quotes[key];
  } catch (e) {
    console.log(e.message);
    return 1;
  }
};

//Url needed subscription
const backUpCurrencyConverter = async (access_key, targetCurrency, amount) => {
  try {
    const response = await axios.get("http://data.fixer.io/api/convert", {
      params: {
        access_key,
        from: "USD",
        to: targetCurrency,
        amount,
      },
    });
    return response.data;
  } catch (e) {
    console.log(e.message);
    return 1;
  }
};

//mainCurrencyConverter("1ed91e0e621b01bc255ea1e29eff3585", "KES", "USD");

module.exports.mainCurrencyConverter = mainCurrencyConverter;
module.exports.backUpCurrencyConverter = backUpCurrencyConverter;
