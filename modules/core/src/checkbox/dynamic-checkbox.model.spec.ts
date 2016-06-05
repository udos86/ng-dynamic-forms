import {DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX, DynamicCheckboxModel} from "./dynamic-checkbox.model";

describe("DynamicCheckboxModel test suite", () => {

    describe("default object test suite", () => {

        let defaultObject: DynamicCheckboxModel;

        beforeEach(() => {
            defaultObject = new DynamicCheckboxModel({});
        });
        
        it("tests if correct default type property is set", () => {

            expect(defaultObject.type).toBeDefined();
            expect(defaultObject.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX);
        });
        
    });

});