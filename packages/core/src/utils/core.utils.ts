import { Observable } from "rxjs";

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

export function isObservable(value: any): value is Observable<any> {
    return !!value && isFunction(value.lift) && isFunction(value.subscribe);
}

export function isString(value: any): value is string {
    return typeof value === "string";
}
