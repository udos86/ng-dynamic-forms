export function equals<T>(value: T, ...comparables: T[]): boolean {
    return !!(comparables.find(comparable => value === comparable));
}

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

export function isObject(value: any): boolean {
    return typeof value === "object";
}

export function isString(value: any): boolean {
    return typeof value === "string";
}

export function merge(baseValue: any, defaultValue: any): any {

    if (!isDefined(baseValue)) {
        return defaultValue;
    }

    if (isObject(baseValue)) {

        for (let property in baseValue) {

            if (baseValue.hasOwnProperty(property) && isObject(baseValue[property])) {

                baseValue[property] = merge(baseValue[property], defaultValue ? defaultValue[property] : null);
            }
        }

        return defaultValue ? Object.assign(defaultValue, baseValue) : baseValue;
    }

    return baseValue;
}

export function maskToString(mask: string | RegExp | (string | RegExp)[]): string | string[] {

    if (isString(mask)) {

        return mask as string;

    } else if (mask instanceof RegExp) {

        return mask.toString();

    } else if (Array.isArray(mask)) {

        return mask.map(value => maskToString(value)) as string[];
    }
}

export function maskFromString(mask: string | string[]): string | RegExp | (string | RegExp)[] {

    if (isString(mask)) {

        let isRegExp = (mask as string).startsWith("/") && (mask as string).endsWith("/");

        return isRegExp ? new RegExp((mask as string).slice(1, mask.length - 1)) : mask;

    } else if (Array.isArray(mask)) {

        return (mask as string[]).map(value => maskFromString(value)) as string[];
    }
}