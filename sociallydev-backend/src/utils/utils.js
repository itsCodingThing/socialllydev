function throwError(massage) {
  let error = new Error(massage);

  error.name = "CustomError";
  throw error;
}

module.exports = { throwError };
