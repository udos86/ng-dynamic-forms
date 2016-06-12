import {
    DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA, 
    DYNAMIC_FORM_TEXTAREA_WRAP_SOFT,
    DynamicTextAreaModel
} from "./dynamic-textarea.model";

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

        it("tests if correct default cols property is set", () => {

            expect(defaultObject.cols).toBeDefined();
            expect(defaultObject.cols).toBe(20);
        });

        it("tests if correct default rows property is set", () => {

            expect(defaultObject.rows).toBeDefined();
            expect(defaultObject.rows).toBe(2);
        });

        it("tests if correct default wrap property is set", () => {

            expect(defaultObject.wrap).toBeDefined();
            expect(defaultObject.wrap).toEqual(DYNAMIC_FORM_TEXTAREA_WRAP_SOFT);
        });
        
    });

});