const GlobalErrorHandler = () => {
    const getModelState = (err) => {
        let modelState;

        if (err.results && err.results.errors) {
            modelState = err.results.errors.map(e => ({
                message: e.message,
                path: e.path.join('/')
            }));
        }

        return modelState;
    };

    const handleError = (err, req, res, next) => {
        if (!err) {
            return next();
        }

        let statusCode = err.statusCode || res.statusCode;
        const isSuccessStatusCode = statusCode >= 200 &&
            statusCode < 300;
        statusCode = !isSuccessStatusCode ? statusCode : 500;

        const modelState = getModelState(err);

        return res.status(statusCode)
            .json({
                error: err && err.message ? err.message : 'Internal Server Error',
                modelState
            });
    };

    const publicInterface = {
        handleError
    };
    return publicInterface;
}

module.exports = GlobalErrorHandler;