class ConflictError extends Error {
  constructor(message) {
    super(`Conflict has been occurred: ${message}`);
    this.statusCode = 409;
  }
}

module.exports = ConflictError;
