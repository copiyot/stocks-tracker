const {
  parseCsvToArray,
  downloadFile,
} = require("./../utils/parse-csv-to-json");

const { Currency } = require("../models/currency");

// Read data from source
const supportedCurrencies = async function (url) {
  try {
    if (!url) {
      throw new Error("URL not supplied!");
    }
    const downloadedFile = await downloadFile(url);
    if (downloadedFile) {
      const data = await parseCsvToArray(downloadedFile);

      //Convert data to a list of currency objects
      if (data.length > 0) {
        const currencyList = [];
        data.forEach((c) => {
          currencyList.push(
            new Currency(c["Country"], c["Currency"], c["ISO 4217 Code"])
          );
        });

        // Return the list
        return currencyList;
      }
    }
  } catch (err) {
    console.log("ERROR: ", err.message);
  }
};

// supportedCurrencies(urls.currenciesUrl);

module.exports.supportedCurrencies = supportedCurrencies;
