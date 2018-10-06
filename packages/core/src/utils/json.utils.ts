import { isString } from "./core.utils";

export function maskToString(mask: string | RegExp | (string | RegExp)[]): string | string[] | null {

    if (isString(mask)) {

        return mask as string;

    } else if (mask instanceof RegExp) {

        return mask.toString();

    } else if (Array.isArray(mask)) {

        return mask.map(value => maskToString(value)) as string[];
    }

    return null;
}

export function maskFromString(mask: string | string[]): string | RegExp | (string | RegExp)[] | null {

    if (isString(mask)) {

        let isRegExp = (mask as string).startsWith("/") && (mask as string).endsWith("/");

        return isRegExp ? new RegExp((mask as string).slice(1, mask.length - 1)) : mask;

    } else if (Array.isArray(mask)) {

        return (mask as string[]).map(value => maskFromString(value)) as string[];
    }

    return null;
}

export function parseReviver(_key: string, value: any): any {

    let regexDateISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|([+\-])([\d|:]*))?$/;

    return isString(value) && regexDateISO.test(value) ? new Date(value) : value;
}
