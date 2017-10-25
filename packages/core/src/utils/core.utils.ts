export class Utils {

    static maskToString(mask: string | RegExp | (string | RegExp)[]): string | string[] | null {

        if (typeof mask === "string") {

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

        if (baseValue === undefined || baseValue === null) {
            return defaultValue;
        }

        if (typeof baseValue === "object") {

            for (let property in baseValue) {

                if (baseValue.hasOwnProperty(property) && typeof (baseValue[property] === "object")) {

                    baseValue[property] = Utils.merge(baseValue[property], defaultValue ? defaultValue[property] : null);
                }
            }

            return defaultValue ? Object.assign(defaultValue, baseValue) : baseValue;
        }

        return baseValue;
    }

    static parseJSONReviver(_key: string, value: any): any {

        let regexDateISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;

        return typeof value === "string" && regexDateISO.test(value) ? new Date(value) : value;
    }
}