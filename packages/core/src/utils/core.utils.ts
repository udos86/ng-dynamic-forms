export function isBoolean(value: unknown): value is boolean {
    return typeof value === "boolean";
}

export function isFunction(value: unknown): value is Function {
    return typeof value === "function";
}

export function isNumber(value: unknown): value is number {
    return typeof value === "number";
}

export function isObject(value: unknown): value is object {
    return typeof value === "object" && value !== null;
}

export function isString(value: unknown): value is string {
    return typeof value === "string";
}
