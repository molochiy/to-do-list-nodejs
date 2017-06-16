const configureRoutes = (app, sl) => {
    app.use('/api/', sl.routes.taskRouter);
}

module.exports = configureRoutes;