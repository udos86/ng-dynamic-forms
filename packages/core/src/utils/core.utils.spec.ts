import { Utils } from "./core.utils";

describe("Core Utils test suite", () => {

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


    it("should detect equality correctly", () => {

        let testValue1 = "test",
            testValue2 = 5,
            comparables1 = ["test1", "test2", "test3"],
            comparables2 = ["test1", "test2", "test"],
            comparables3 = [1, 2, 3, 4],
            comparables4 = [2, 3, 4, 5, 6];

        expect(Utils.equals<string>(testValue1, ...comparables1)).toBe(false);
        expect(Utils.equals<string>(testValue1, ...comparables2)).toBe(true);
        expect(Utils.equals<number>(testValue2, ...comparables3)).toBe(false);
        expect(Utils.equals<number>(testValue2, ...comparables4)).toBe(true);
    });


    it("should merge correctly", () => {

        let valueA = Utils.merge(configObject.a, 4),
            valueB = Utils.merge(configObject.b, false),
            valueC = Utils.merge(configObject.c, null),
            valueD1 = Utils.merge(configObject.d, {prop1: 1}),
            valueD2 = Utils.merge(configObject.d, {prop2: 3}),
            valueE = Utils.merge(configObject.e, null);

        let valueY = Utils.merge(configObject.y, false),
            valueZ = Utils.merge(configObject.z, null);

        expect(valueA).toBe(5);
        expect(valueB).toBe(true);
        expect(valueC).toEqual("test");

        expect(valueD1.prop1).toBe(2);
        expect(valueD2.prop1).toBe(2);
        expect(valueD2.prop2).toBe(3);
        expect(valueE.prop1).toBe(1);

        expect(valueY).toBe(false);
        expect(valueZ).toBeNull();
    });


    it("should merge recursively correctly", () => {

        let valueE = Utils.merge(configObject.e, {
            prop1: 10,
            prop2: {
                nested1: 21,
                nested2: 84
            },
            prop3: 100
        });

        expect(valueE.prop1).toBe(1);

        expect(valueE.prop2).toBeDefined();
        expect(valueE.prop2.nested1).toBe(42);

        expect(valueE.prop2.nested2).toBeDefined();
        expect(valueE.prop2.nested2).toBe(84);

        expect(valueE.prop3).toBeDefined();
        expect(valueE.prop3).toBe(100);
    });


    it("should detect empty strings correctly", () => {

        let testString0 = undefined,
            testString1 = "",
            testString2 = "test string";

        expect(Utils.isEmptyString(testString0)).toBe(true);
        expect(Utils.isEmptyString(testString1)).toBe(true);
        expect(Utils.isEmptyString(testString2)).toBe(false);
    });


    it("should detect a number correctly", () => {

        let testNumber0 = undefined,
            testNumber1 = 0,
            testNumber2 = 42;

        expect(Utils.isNumber(testNumber0)).toBe(false);
        expect(Utils.isNumber(testNumber1)).toBe(true);
        expect(Utils.isNumber(testNumber2)).toBe(true);
    });


    it("should detect a true, non-null object correctly", () => {

        let testObject1 = {},
            testObject2 = null;

        expect(Utils.isTrueObject(testObject1)).toBe(true);
        expect(Utils.isTrueObject(testObject2)).toBe(false);
    });


    it("should detect a non-empty object correctly", () => {

        let testObject1 = {},
            testObject2 = null,
            testObject3 = {"test": 42};

        expect(Utils.isNonEmptyObject(testObject1)).toBe(false);
        expect(Utils.isNonEmptyObject(testObject2)).toBe(false);
        expect(Utils.isNonEmptyObject(testObject3)).toBe(true);
    });


    it("should convert a text mask to string correctly", () => {

        let testValue1 = "test",
            testValue2 = /[1-9]/,
            testValue3 = [testValue1, testValue2],
            testResult3 = Utils.maskToString(testValue3) as string[];

        expect(Utils.maskToString(testValue1)).toEqual(testValue1);
        expect(Utils.maskToString(testValue2)).toEqual(testValue2.toString());

        expect(testResult3[0]).toEqual(testValue1);
        expect(testResult3[1]).toEqual(testValue2.toString());
    });


    it("should recreate a text mask from string correctly", () => {

        let testValue1 = "test",
            testValue2 = "/[1-9]/",
            testValue3 = [testValue1, testValue2],
            testResult3 = Utils.maskFromString(testValue3) as (string | RegExp)[];

        expect(Utils.maskFromString(testValue1)).toEqual(testValue1);
        expect(Utils.maskFromString(testValue2)).toEqual(new RegExp("[1-9]"));

        expect(testResult3[0]).toEqual(testValue1);
        expect(testResult3[1]).toEqual(new RegExp("[1-9]"));
    });
});