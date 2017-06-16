const yamlConfigProvider = require('./yaml-config-provider');

const configProvider = (pathToConfigs) => {
    const getConfig = (configName, folder) => {
        folder = folder || '';
        const configFolder = `${pathToConfigs}/${folder}`;
        const config = yamlConfigProvider.getConfig(configName, configFolder);
        
        return config;
    }

    const publicInterface = {
        getConfig
    }

    return publicInterface;
}

module.exports = configProvider;