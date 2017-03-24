export function isBoolean(value: any): boolean {
    return typeof value === "boolean";
}

export function isDefined(value: any): boolean {
    return value !== undefined && value !== null;
}

export function isEmptyString(value: string | null | undefined): boolean {
    return typeof value !== "string" || value.length === 0;
}

export function isFunction(value: any): boolean {
    return typeof value === "function";
}

export function isNumber(value: any): boolean {
    return typeof value === "number";
}

export function isString(value: any): boolean {
    return typeof value === "string";
}

export function getValue(object: any, key: string, defaultValue: any): any {

    if (object === undefined || object === null) {
        return defaultValue;
    }

    let value = object[key];

    if (value === undefined && defaultValue !== undefined) {
        return defaultValue;
    }

    if (typeof value === "object" && typeof defaultValue === "object") {

        for (let property in value) {

            if (value.hasOwnProperty(property) && typeof value[property] === "object") {

                value[property] = getValue(value, property, defaultValue ? defaultValue[property] : null);
            }
        }

        return defaultValue ? Object.assign(defaultValue, value) : value;
    }

    return value;
}