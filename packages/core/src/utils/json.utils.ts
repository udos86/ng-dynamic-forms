export class JSONUtils {

    static maskToString(mask: string | Object | RegExp | (string | RegExp)[]): string | string[] | null {

        if (typeof mask === "string") {

            return mask as string;

        } else if (mask instanceof RegExp) {

            return mask.toString();

        } else if (Array.isArray(mask)) {

            return mask.map(value => JSONUtils.maskToString(value)) as string[];
        } else if (typeof mask === "object") {

            return mask.toString();
        }

        return null;
    }

    static maskFromString(mask: string | string[]): string | Object | RegExp | (string | RegExp)[] | null {

        if (typeof mask === "string") {

            let isRegExp = (mask as string).startsWith("/") && (mask as string).endsWith("/");

            return isRegExp ? new RegExp((mask as string).slice(1, mask.length - 1)) : mask;

        } else if (Array.isArray(mask)) {

            return (mask as string[]).map(value => JSONUtils.maskFromString(value)) as string[];
        } else if (this.IsJsonString(mask)) {
            return JSON.parse(mask);
        }

        return null;
    }

    static parseReviver(_key: string, value: any): any {

        let regexDateISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;

        return typeof value === "string" && regexDateISO.test(value) ? new Date(value) : value;
    }

    static IsJsonString(str: string) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
}