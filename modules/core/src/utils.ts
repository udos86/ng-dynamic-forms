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

export function getValue(object: any, key: string, defaultValue: any) {

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
                
                value[property] = getValue(value, property, defaultValue[property]);
            }
        }

        return Object.assign(defaultValue, value);
    }

    return value;
}

