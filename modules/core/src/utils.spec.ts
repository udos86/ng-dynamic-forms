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
                }
            };
        });

        it("tests if getValue is working correctly", () => {
            
            let valueA = utils.getValue(configObject, "a", 4);
            let valueB = utils.getValue(configObject, "b", false);
            let valueC = utils.getValue(configObject, "c", null);
            let valueD1 = utils.getValue(configObject, "d", {prop1: 1});
            let valueD2= utils.getValue(configObject, "d", {prop2: 3});
            
            let valueY = utils.getValue(configObject, "y", false);
            let valueZ = utils.getValue(configObject, "z", null);
            
            expect(valueA).toBe(5);
            expect(valueB).toBe(true);
            expect(valueC).toEqual("test");
            
            expect(valueD1.prop1).toBe(2);
            expect(valueD2.prop1).toBe(2);
            expect(valueD2.prop2).toBe(3);
            
            expect(valueY).toBe(false);
            expect(valueZ).toBeNull();
        });
        
    });

});