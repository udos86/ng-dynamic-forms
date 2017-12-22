import { JSONUtils } from "./json.utils";

describe("JSON Utils test suite", () => {

    let configObject: any;

    beforeEach(() => {

        configObject = {
            a: 5,
            b: true,
            c: "test",
            d: {
                prop1: 2
            },
            e: {
                prop1: 1,
                prop2: {
                    nested1: 42
                }
            }
        };
    });

    it("should convert a text mask to string correctly", () => {

        let testValue1 = "test",
            testValue2 = /[1-9]/,
            testValue3 = [testValue1, testValue2],
            testResult3 = JSONUtils.maskToString(testValue3) as string[];

        expect(JSONUtils.maskToString(testValue1)).toEqual(testValue1);
        expect(JSONUtils.maskToString(testValue2)).toEqual(testValue2.toString());

        expect(testResult3[0]).toEqual(testValue1);
        expect(testResult3[1]).toEqual(testValue2.toString());

        expect(JSONUtils.maskToString({} as string)).toBeNull();
    });

    it("should recreate a text mask from string correctly", () => {

        let testValue1 = "test",
            testValue2 = "/[1-9]/",
            testValue3 = [testValue1, testValue2],
            testResult3 = JSONUtils.maskFromString(testValue3) as (string | RegExp)[];

        expect(JSONUtils.maskFromString(testValue1)).toEqual(testValue1);
        expect(JSONUtils.maskFromString(testValue2)).toEqual(new RegExp("[1-9]"));

        expect(testResult3[0]).toEqual(testValue1);
        expect(testResult3[1]).toEqual(new RegExp("[1-9]"));

        expect(JSONUtils.maskFromString({} as string)).toBeNull();
    });
});