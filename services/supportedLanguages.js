const {
  parseCsvToArray,
  downloadFile,
} = require("./../utils/parse-csv-to-json");

const { Language } = require("../models/language");

// Read data from source
const supportedLanguages = async function (url) {
  try {
    if (!url) {
      throw new Error("URL not supplied!");
    }
    const downloadedFile = await downloadFile(url);
    if (downloadedFile) {
      const data = await parseCsvToArray(downloadedFile);

      //Convert data to a list of language objects
      if (data.length > 0) {
        const languageList = [];
        data.forEach((l) => {
          languageList.push(new Language(l["Language"], l["ISO 639-1 code"]));
        });

        // Return the list
        return languageList;
      }
    }
  } catch (err) {
    console.log("ERROR: ", err.message);
  }
};

//supportedLanguages(urls.languagesUrl);

module.exports.supportedLanguages = supportedLanguages;
