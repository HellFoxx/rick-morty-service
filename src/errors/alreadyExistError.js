class BadRequestError extends Error {
    constructor(message, cause) {
        super(message, cause);
        if (!message) this.message = 'Bad Request';
        this.status = 400;
    }
}

module.exports = BadRequestError;