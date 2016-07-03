import {DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX, DynamicCheckboxModel} from "./dynamic-checkbox.model";

describe("DynamicCheckboxModel test suite", () => {

    describe("default object test suite", () => {

        let defaultObject: DynamicCheckboxModel;

        beforeEach(() => {
            defaultObject = new DynamicCheckboxModel({id: "default"});
        });
        
        it("tests if correct default type property is set", () => {

            expect(defaultObject.type).toBeDefined();
            expect(defaultObject.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX);
        });

        it("tests if correct default value property is set", () => {

            expect(defaultObject.value).toBeDefined();
            expect(defaultObject.value).toBe(false);
        });
        
    });

});