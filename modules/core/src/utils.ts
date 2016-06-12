export function getConfigValue (configObject: any, propertyKey: string, defaultValue: any) {

    let configValue = configObject[propertyKey];

    if (configValue === undefined && defaultValue !== undefined) {
        return defaultValue;
    }

    if (typeof configValue === "object" && typeof configValue === "object") {
        return Object.assign(defaultValue, configValue);
    }

    return configValue;
}
