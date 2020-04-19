const helpMenu = (code) => {
  const helpMessage = `
    DESCRIPTION
        This is a command line application to track stocks.
        npm run search [options] or node index.js [options]
        
        
    OPTIONS
        Options can be one of the following:
        1. support c: checking for supported currencies
           e.g npm run search support c 
        
        2. support l: checking for supported languages
        e.g npm run search support l
        
        3.stock [options]: check for current stock price
        e.g node index.js stock [symbol] [preferred_currency] [preferred_language]

        4. Help flag: character 'h' or 'H'
           npm run search h   or npm run search H 

    OUTPUT
        1. Shows message with all supported currencies
        2. Shows message with all supported languages
        3. Shows message with the current price for a stock in the users prefered currency and language
        3. Shows a help menu
        `;

  return console.log(helpMessage);
};

module.exports.helpMenu = helpMenu;
