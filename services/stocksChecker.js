const Axios = require("axios");


/**
 * Gives stock price for a given company
 *
 * @param {string} symbol - symbol of the company whose stock price is being searched
 */
const stocksChecker = async (symbol) => {
  try {
    const response = await Axios.get("https://www.alphavantage.co/query", {
      params: {
        function: "GLOBAL_QUOTE",
        symbol,
        apikey: "HB45NQL6096ZI1M6",
      },
    });

    return response.data["Global Quote"]["05. price"];
  } catch (e) {
    console.log(e.message);
    return "Error";
  }
};

// stocksChecker("MSFT");
module.exports.stocksChecker = stocksChecker;
