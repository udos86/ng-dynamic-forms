export function getValue (object: any, property: string, defaultValue: any) {

    let value = object[property];

    if (value === undefined && defaultValue !== undefined) {
        return defaultValue;
    }

    if (typeof value === "object" && typeof value === "object") {
        return Object.assign(defaultValue, value);
    }

    return value;
}
