const fs = require('fs');
const path = require('path');
const appRoot = require('app-root-path');
const S = require('string');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const buildDatabase = (dbConfig) => {
    mongoose.connect(dbConfig.connectionString);

    const entitiesPath = `${appRoot.path}/src/models/entities`;

    fs
        .readdirSync(entitiesPath)
        .filter((file) => {
            const hasExtension = file.indexOf('.') !== 0;
            const hasJsExtension = file.slice(-3) === '.js';
            return hasExtension && hasJsExtension;
        })
        .forEach((file) => {
            const entity = require(path.join(entitiesPath, file));
            const entityName = S('-' + file.slice(0, -3)).camelize().s;
            const schema = new Schema(entity);

            mongoose.model(entityName, schema);
        });

    return mongoose;
}

module.exports = buildDatabase;