// Object.assign Polyfill 
if (typeof Object.assign != 'function') {
    (function () {
        Object.assign = function (target) {
            'use strict';
            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var output = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var source = arguments[index];
                if (source !== undefined && source !== null) {
                    for (var nextKey in source) {
                        if (source.hasOwnProperty(nextKey)) {
                            output[nextKey] = source[nextKey];
                        }
                    }
                }
            }
            return output;
        };
    })();
}

export function getValue (object: any, property: string, defaultValue: any) {

    let value = object[property];

    if (value === undefined && defaultValue !== undefined) {
        return defaultValue;
    }

    if (typeof value === "object" && typeof value === "object") {
        return Object.assign(defaultValue, value);
    }

    return value;
}

