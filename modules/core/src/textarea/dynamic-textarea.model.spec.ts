import {DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA, DynamicTextAreaModel} from "./dynamic-textarea.model";

describe("DynamicTextAreaModel test suite", () => {

    describe("default object test suite", () => {

        let defaultObject: DynamicTextAreaModel;

        beforeEach(() => {
            defaultObject = new DynamicTextAreaModel({});
        });

        it("tests if correct default type property is set", () => {

            expect(defaultObject.type).toBeDefined();
            expect(defaultObject.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA);
        });
        
    });

});