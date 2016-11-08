"use strict";
var utils = require("./utils");
describe("Utils test suite", function () {
    describe("getValue test suite", function () {
        var configObject;
        beforeEach(function () {
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
        it("tests if getValue is working correctly", function () {
            var valueA = utils.getValue(configObject, "a", 4);
            var valueB = utils.getValue(configObject, "b", false);
            var valueC = utils.getValue(configObject, "c", null);
            var valueD1 = utils.getValue(configObject, "d", { prop1: 1 });
            var valueD2 = utils.getValue(configObject, "d", { prop2: 3 });
            var valueY = utils.getValue(configObject, "y", false);
            var valueZ = utils.getValue(configObject, "z", null);
            expect(valueA).toBe(5);
            expect(valueB).toBe(true);
            expect(valueC).toEqual("test");
            expect(valueD1.prop1).toBe(2);
            expect(valueD2.prop1).toBe(2);
            expect(valueD2.prop2).toBe(3);
            expect(valueY).toBe(false);
            expect(valueZ).toBeNull();
        });
        it("tests if getValue recursion is working correctly", function () {
            var valueE = utils.getValue(configObject, "e", {
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
    describe("isEmptyString test suite", function () {
        it("tests if isEmptyString is working correctly", function () {
            var testString0 = undefined;
            var testString1 = "";
            var testString2 = "test string";
            expect(utils.isEmptyString(testString0)).toBe(true);
            expect(utils.isEmptyString(testString1)).toBe(true);
            expect(utils.isEmptyString(testString2)).toBe(false);
        });
    });
});

//# sourceMappingURL=utils.spec.js.map
