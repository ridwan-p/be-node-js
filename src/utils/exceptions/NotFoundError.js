class NotFoundError extends Error {
  constructor(message, options) {
    super(message || 'Data is not found', options);
  }
}

module.exports = NotFoundError;