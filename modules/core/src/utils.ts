export function isBoolean(object: any): boolean {
    return typeof object === "boolean";
}

export function isDefined(object: any): boolean {
    return object !== undefined && object !== null;
}

export function isEmptyString(_string: string | null | undefined): boolean {
    return typeof _string !== "string" || _string.length === 0;
}

export function isFunction(object: any): boolean {
    return typeof object === "function";
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