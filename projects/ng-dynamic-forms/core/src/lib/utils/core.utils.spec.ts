import { isBoolean, isFunction, isNumber, isObject, isString } from "./core.utils";

describe("core utils test suite", () => {

    let testValue1: undefined = undefined,
        testValue2: null = null,
        testValue3 = 42,
        testValue4 = true,
        testValue5 = false,
        testValue6 = "test",
        testValue7 = {},
        testValue8 = () => {};

    it("should check if a given value is of type boolean", () => {

        expect(isBoolean(testValue1)).toBe(false);
        expect(isBoolean(testValue2)).toBe(false);
        expect(isBoolean(testValue3)).toBe(false);
        expect(isBoolean(testValue4)).toBe(true);
        expect(isBoolean(testValue5)).toBe(true);
        expect(isBoolean(testValue6)).toBe(false);
        expect(isBoolean(testValue7)).toBe(false);
        expect(isBoolean(testValue8)).toBe(false);
    });

    it("should check if a given value is of type function", () => {

        expect(isFunction(testValue1)).toBe(false);
        expect(isFunction(testValue2)).toBe(false);
        expect(isFunction(testValue3)).toBe(false);
        expect(isFunction(testValue4)).toBe(false);
        expect(isFunction(testValue5)).toBe(false);
        expect(isFunction(testValue6)).toBe(false);
        expect(isFunction(testValue7)).toBe(false);
        expect(isFunction(testValue8)).toBe(true);
    });

    it("should check if a given value is of type number", () => {

        expect(isNumber(testValue1)).toBe(false);
        expect(isNumber(testValue2)).toBe(false);
        expect(isNumber(testValue3)).toBe(true);
        expect(isNumber(testValue4)).toBe(false);
        expect(isNumber(testValue5)).toBe(false);
        expect(isNumber(testValue6)).toBe(false);
        expect(isNumber(testValue7)).toBe(false);
        expect(isNumber(testValue8)).toBe(false);
    });

    it("should check if a given value is of type object", () => {

        expect(isObject(testValue1)).toBe(false);
        expect(isObject(testValue2)).toBe(false);
        expect(isObject(testValue3)).toBe(false);
        expect(isObject(testValue4)).toBe(false);
        expect(isObject(testValue5)).toBe(false);
        expect(isObject(testValue6)).toBe(false);
        expect(isObject(testValue7)).toBe(true);
        expect(isObject(testValue8)).toBe(false);
    });

    it("should check if a given value is of type string", () => {

        expect(isString(testValue1)).toBe(false);
        expect(isString(testValue2)).toBe(false);
        expect(isString(testValue3)).toBe(false);
        expect(isString(testValue4)).toBe(false);
        expect(isString(testValue5)).toBe(false);
        expect(isString(testValue6)).toBe(true);
        expect(isString(testValue7)).toBe(false);
        expect(isString(testValue8)).toBe(false);
    });
});