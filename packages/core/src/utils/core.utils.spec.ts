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


    it("should convert a text mask to string correctly", () => {

        let testValue1 = "test",
            testValue2 = /[1-9]/,
            testValue3 = [testValue1, testValue2],
            testResult3 = Utils.maskToString(testValue3) as string[];

        expect(Utils.maskToString(testValue1)).toEqual(testValue1);
        expect(Utils.maskToString(testValue2)).toEqual(testValue2.toString());

        expect(testResult3[0]).toEqual(testValue1);
        expect(testResult3[1]).toEqual(testValue2.toString());

        expect(Utils.maskToString({} as string)).toBeNull();
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

        expect(Utils.maskFromString({} as string)).toBeNull();
    });
});