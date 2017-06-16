const configureHandlers = (app, sl) => {
    app.use(sl.globalErrorHandler.handleError);
}

module.exports = configureHandlers;