import {DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA, DynamicFormTextAreaModel} from "./dynamic-form-textarea.model";

describe("DynamicFormTextAreaModel test suite", () => {

    describe("default object test suite", () => {

        let defaultObject: DynamicFormTextAreaModel;

        beforeEach(() => {
            defaultObject = new DynamicFormTextAreaModel({});
        });

        it("tests if correct default type property is set", () => {

            expect(defaultObject.type).toBeDefined();
            expect(defaultObject.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA);
        });
        
    });

});