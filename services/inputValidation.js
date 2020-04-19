const { CustomError } = require("./../utils/customError");

module.exports.inputValidation = (input) => {
  if (!input) {
    throw new CustomError("Error", "EMPTY");
  }
  if (input.length > 3) {
    throw new CustomError("Error", "INV-ISO");
  }
  if (input.toLowerCase() === "h") {
    throw new CustomError("Error", "HELP");
  }

  return true;
};
