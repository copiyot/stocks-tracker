// NPM SCRIPT EXECUTES THE APPLICAITION AS:
// node index.js support [c | [l]
// node index.js stock [symbol] [preferred_currency] [preferred_language]

const { supportedCurrencies } = require("./services/supportedCurrencies");
const { supportedLanguages } = require("./services/supportedLanguages");
const { stocksChecker } = require("./services/stocksChecker");
const {
  mainCurrencyConverter,
  backUpCurrencyConverter,
} = require("./services/currencyConverter");
const { helpMenu } = require("./services/helpMenu");
const { urls } = require("./services/api");

/**
 * Gets user command line args and identifies the action user wants to take
 * @returns Object
 */
const resolveInput = () => {
  // get user input flags
  const inputFlags = process.argv;
  // user is checking language or currency support
  if (inputFlags.length > 3 && inputFlags[2].toLowerCase() === "support") {
    const flag = inputFlags[3].toLowerCase();
    return {
      type: "support",
      value: flag,
      error: flag === "c" || flag === "l" ? "" : "wrong flag",
    };
  }

  // user is searching for stock prices
  if (inputFlags.length > 3 && inputFlags[2].toLowerCase() === "stock") {
    const [symbol, currency, language] = process.argv.slice(3);
    // cases for default language and currency
    if (
      (!currency && language) ||
      (currency && !language) ||
      (!currency && !language)
    ) {
      return {
        type: "stock",
        symbol,
        currency: currency || "USD",
        language: language || "en",
      };
    }

    // case when all flags provided
    return {
      type: "stock",
      symbol,
      currency,
      language,
    };
  }

  // default
  return {
    type: "invalid",
  };
};

/**
 * Prints list of supported currencies to the console
 */
const printCurrency = async () => {
  const currencyList = await supportedCurrencies(urls.currenciesUrl);
  // headers
  console.log(`Country \t Currency \t ISO4217Code`);
  // rows
  currencyList.forEach((c) =>
    console.log(`${c.country}\t\t${c.currency}\t\t${c.ISO4217Code}`)
  );
};

/**
 * Prints list of supported languages to the console
 */
const printLanguages = async () => {
  const languageList = await supportedLanguages(urls.languagesUrl);
  // headers
  console.log(`Language \t ISO639-1Code`);
  console.log("------------------------");
  // rows
  languageList.forEach((l) => console.log(`${l.language} \t ${l.ISO6391Code}`));
};

/**
 * Prints stock message in user preferred language
 *
 * @param {string} code  ISO639-1 language code
 * @param {string} symbol  symbol of the company eg MSFT
 * @param {float} price stock price
 * @param {string} currency  ISO currency code
 */
const translate = (code, symbol, price, currency) => {
  // Template: The current price for AAPL is 247.74 USD
  switch (code.toLowerCase()) {
    case "en":
      return `The current price for ${symbol} is ${price} ${currency}`;
    case "fr":
      return `Le prix actuel de ${symbol} est ${price} ${currency}`;
    case "pt":
      return `O preço atual para ${symbol} é ${price} ${currency}`;
    case "sw":
      return `Bei ya sasa ya ${symbol} ni ${price} ${currency}`;
    default:
      return `The current price for ${symbol} is ${price} ${currency}`;
  }
};

/**
 * executes the whole program asynchronously
 */
const run = async () => {
  const action = resolveInput();

  if (action.type === "invalid") {
    helpMenu(); // user entered wrong commands
  }
  // print currencies
  if (action.type === "support" && action.value === "c") {
    await printCurrency();
    return;
  }
  // print languages
  if (action.type === "support" && action.value === "l") {
    await printLanguages();
    return;
  }
  // print stock prices for default currency
  if (action.type === "stock" && action.currency.toUpperCase() === "USD") {
    const usdPrice = await stocksChecker(action.symbol);
    if (usdPrice !== "Error") {
      console.log(
        translate(
          action.language,
          action.symbol.toUpperCase(),
          usdPrice,
          action.currency.toUpperCase()
        )
      );
    } else {
      console.log("Error occured during your request. Please try again");
    }

    return;
  }

  //print stock prices for user preferred currency
  if (action.type === "stock" && action.currency.toUpperCase() !== "USD") {
    // check if currency is supported
    const currencyList = await supportedCurrencies(urls.currenciesUrl);
    const isSupported = currencyList.find(
      (c) => c.ISO4217Code === action.currency.toUpperCase()
    );
    if (!isSupported) return console.log("Sorry! Currency not supported!");

    // get stock price
    const usdPrice = await stocksChecker(action.symbol);
    if (usdPrice !== "Error") {
      // get conversion rate
      const usdRate = await mainCurrencyConverter(
        "1ed91e0e621b01bc255ea1e29eff3585",
        action.currency
      );

      if (usdRate > 1) {
        const stockPrice = usdPrice * usdRate;
        console.log(
          translate(
            action.language,
            action.symbol.toUpperCase(),
            stockPrice,
            action.currency.toUpperCase()
          )
        );
      }
    } else {
      console.log("Error occured during your request. Please try again");
    }
    return;
  }
};

// Execute the application
run();

// TODOs
// Implement help menu and replace for areas with console logs that say 'Help Menu'
// Put some functions in separate files
