export function isBoolean(value: any): value is boolean {
    return typeof value === "boolean";
}

export function isFunction(value: any): value is Function {
    return typeof value === "function";
}

export function isNumber(value: any): value is number {
    return typeof value === "number";
}

export function isObject(value: any): value is object {
    return typeof value === "object" && value !== null;
}

export function isString(value: any): value is string {
    return typeof value === "string";
}
