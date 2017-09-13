export class Utils {

    static equals<T>(value: T, ...comparables: T[]): boolean {
        return !!(comparables.find(comparable => value === comparable));
    }

    static isBoolean(value: any): boolean {
        return typeof value === "boolean";
    }

    static isDefined(value: any): boolean {
        return value !== undefined && value !== null;
    }

    static isFunction(value: any): boolean {
        return typeof value === "function";
    }

    static isNumber(value: any): boolean {
        return typeof value === "number";
    }

    static isObject(value: any): boolean {
        return typeof value === "object";
    }

    static isTrueObject(value: any): boolean {
        return Utils.isDefined(value) && Utils.isObject(value);
    }

    static isNonEmptyObject(value: object): boolean {
        return Utils.isTrueObject(value) && Object.getOwnPropertyNames(value).length > 0;
    }

    static isString(value: any): boolean {
        return typeof value === "string";
    }

    static isEmptyString(value: string | null | undefined): boolean {
        return typeof value !== "string" || value.length === 0;
    }

    static maskToString(mask: string | RegExp | (string | RegExp)[]): string | string[] | null {

        if (Utils.isString(mask)) {

            return mask as string;

        } else if (mask instanceof RegExp) {

            return mask.toString();

        } else if (Array.isArray(mask)) {

            return mask.map(value => Utils.maskToString(value)) as string[];
        }

        return null;
    }

    static maskFromString(mask: string | string[]): string | RegExp | (string | RegExp)[] | null {

        if (typeof mask === "string") {

            let isRegExp = (mask as string).startsWith("/") && (mask as string).endsWith("/");

            return isRegExp ? new RegExp((mask as string).slice(1, mask.length - 1)) : mask;

        } else if (Array.isArray(mask)) {

            return (mask as string[]).map(value => Utils.maskFromString(value)) as string[];
        }

        return null;
    }

    static merge(baseValue: any, defaultValue: any): any {

        if (!Utils.isDefined(baseValue)) {
            return defaultValue;
        }

        if (Utils.isObject(baseValue)) {

            for (let property in baseValue) {

                if (baseValue.hasOwnProperty(property) && Utils.isObject(baseValue[property])) {

                    baseValue[property] = Utils.merge(baseValue[property], defaultValue ? defaultValue[property] : null);
                }
            }

            return defaultValue ? Object.assign(defaultValue, baseValue) : baseValue;
        }

        return baseValue;
    }

    static parseJSONReviver(_key: string, value: any): any {

        let regexDateISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;

        return Utils.isString(value) && regexDateISO.test(value) ? new Date(value) : value;
    }
}