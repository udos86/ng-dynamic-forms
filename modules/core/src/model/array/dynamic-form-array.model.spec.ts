import {DYNAMIC_FORM_CONTROL_TYPE_ARRAY, DynamicFormArrayModel} from "./dynamic-form-array.model";

describe("DynamicFormArrayModel test suite", () => {

    describe("default object test suite", () => {

        let defaultObject: DynamicFormArrayModel;

        beforeEach(() => {
            defaultObject = new DynamicFormArrayModel({id: "default", createGroup: () => []});
        });
        
        it("tests if correct default type property is set", () => {

            expect(defaultObject.groups).toBeDefined();
            expect(defaultObject.groups.length).toBe(0);
            expect(defaultObject.id).toEqual("default");
            expect(defaultObject.initialCount).toBe(1);
            expect(defaultObject.type).toBeDefined();
            expect(defaultObject.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_ARRAY);

            expect(defaultObject.createGroup).toBeDefined();
            expect(defaultObject.addGroup).toBeDefined();
            expect(defaultObject.removeGroup).toBeDefined();
        });
        
    });

});