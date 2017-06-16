const fs = require('fs');
const jsyaml = require('js-yaml');
const lru = require('lru-cache');

const cache = lru();

const getConfig = (configName, configFolder) => {
    let config = {};

    const configFileName = `${configName}.yml`;
    const pathToConfig = `${configFolder}/${configFileName}`;

    if (cache.has(pathToConfig)) {
        config = cache.get(pathToConfig);
    } else {
        config = jsyaml.safeLoad(fs.readFileSync(pathToConfig, 'utf8'));
        cache.set(pathToConfig, config);
    }

    return config;
}

module.exports = {
    getConfig
};