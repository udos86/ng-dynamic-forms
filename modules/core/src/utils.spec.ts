import * as utils from "./utils";

describe("Utils test suite", () => {

    describe("getConfigValue test suite", () => {
        
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

        it("tests if getConfigValue is working correctly", () => {
            
            let valueA = utils.getConfigValue(configObject, "a", 4);
            let valueB = utils.getConfigValue(configObject, "b", false);
            let valueC = utils.getConfigValue(configObject, "c", null);
            let valueD1 = utils.getConfigValue(configObject, "d", {prop1: 1});
            let valueD2= utils.getConfigValue(configObject, "d", {prop2: 3});
            
            let valueY = utils.getConfigValue(configObject, "y", false);
            let valueZ = utils.getConfigValue(configObject, "z", null);
            
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