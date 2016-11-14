import * as utils from "./utils";

describe("Utils test suite", () => {

    describe("getValue test suite", () => {

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

        it("tests if getValue is working correctly", () => {

            let valueA = utils.getValue(configObject, "a", 4);
            let valueB = utils.getValue(configObject, "b", false);
            let valueC = utils.getValue(configObject, "c", null);
            let valueD1 = utils.getValue(configObject, "d", {prop1: 1});
            let valueD2 = utils.getValue(configObject, "d", {prop2: 3});
            let valueE = utils.getValue(configObject, "e", null);

            let valueY = utils.getValue(configObject, "y", false);
            let valueZ = utils.getValue(configObject, "z", null);

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

        it("tests if getValue recursion is working correctly", () => {

            let valueE = utils.getValue(configObject, "e", {
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

    });

    describe("isEmptyString test suite", () => {

        it("tests if isEmptyString is working correctly", () => {

            let testString0 = undefined;
            let testString1 = "";
            let testString2 = "test string";

            expect(utils.isEmptyString(testString0)).toBe(true);
            expect(utils.isEmptyString(testString1)).toBe(true);
            expect(utils.isEmptyString(testString2)).toBe(false);
        });

    });

});