import {DYNAMIC_FORM_CONTROL_INPUT_TYPE_TEXT, DynamicFormTextInputModel} from "./dynamic-form-text-input.model";
import {DYNAMIC_FORM_CONTROL_TYPE_INPUT} from "../dynamic-form-input-control.model";

describe("DynamicFormInputModel test suite", () => {

    describe("default object test suite", () => {

        let defaultObject: DynamicFormTextInputModel;

        beforeEach(() => {
            defaultObject = new DynamicFormTextInputModel({});
        });
        
        it("tests if correct default type property is set", () => {

            expect(defaultObject.type).toBeDefined();
            expect(defaultObject.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_INPUT);
        });

        it("tests if correct default input type property is set", () => {

            expect(defaultObject.inputType).toBeDefined();
            expect(defaultObject.inputType).toEqual(DYNAMIC_FORM_CONTROL_INPUT_TYPE_TEXT);
        });

        it("tests if correct default prefix property is set", () => {

            expect(defaultObject.prefix).toBeDefined();
            expect(defaultObject.prefix).toBeNull();
        });

        it("tests if correct default suffix property is set", () => {

            expect(defaultObject.suffix).toBeDefined();
            expect(defaultObject.prefix).toBeNull();
        });
        
    });

});