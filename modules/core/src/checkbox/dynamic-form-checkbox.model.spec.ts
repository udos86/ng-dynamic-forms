import {DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX, DynamicFormCheckboxModel} from "./dynamic-form-checkbox.model";

describe("DynamicFormCheckboxModel test suite", () => {

    describe("default object test suite", () => {

        let defaultObject: DynamicFormCheckboxModel;

        beforeEach(() => {
            defaultObject = new DynamicFormCheckboxModel({});
        });
        
        it("tests if correct default type property is set", () => {

            expect(defaultObject.type).toBeDefined();
            expect(defaultObject.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX);
        });
        
    });

});