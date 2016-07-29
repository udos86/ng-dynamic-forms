import {DYNAMIC_FORM_CONTROL_TYPE_ARRAY, DynamicFormArrayModel} from "./dynamic-form-array.model";

describe("DynamicFormArrayModel test suite", () => {

    describe("default object test suite", () => {

        let defaultObject: DynamicFormArrayModel;

        beforeEach(() => {
            defaultObject = new DynamicFormArrayModel({id: "default", createGroup: () => []});
        });
        
        it("tests if correct default type property is set", () => {

            expect(defaultObject.type).toBeDefined();
            expect(defaultObject.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_ARRAY);
        });
        
    });

});