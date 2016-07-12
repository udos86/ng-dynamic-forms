import {DYNAMIC_FORM_CONTROL_TYPE_INPUT, DYNAMIC_FORM_CONTROL_INPUT_TYPE_TEXT, DynamicInputModel} from "./dynamic-input.model";
import {AUTOCOMPLETE_ON} from "../dynamic-form-autofill";

describe("DynamicInputModel test suite", () => {

    describe("default object test suite", () => {

        let defaultObject: DynamicInputModel;

        beforeEach(() => {
            defaultObject = new DynamicInputModel({id: "default"});
        });
        
        it("tests if correct default type property is set", () => {

            expect(defaultObject.type).toBeDefined();
            expect(defaultObject.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_INPUT);
        });

        it("tests if correct default input type property is set", () => {

            expect(defaultObject.inputType).toBeDefined();
            expect(defaultObject.inputType).toEqual(DYNAMIC_FORM_CONTROL_INPUT_TYPE_TEXT);
        });

        it("tests if correct default autoComplete property is set", () => {

            expect(defaultObject.autoComplete).toBeDefined();
            expect(defaultObject.autoComplete).toEqual(AUTOCOMPLETE_ON);
        });

        it("tests if correct default autoFocus property is set", () => {

            expect(defaultObject.autoFocus).toBeDefined();
            expect(defaultObject.autoFocus).toBe(false);
        });

        it("tests if correct default cls properties aree set", () => {

            expect(defaultObject.cls).toBeDefined();
            expect(defaultObject.cls.element.container).toEqual("");
            expect(defaultObject.cls.element.control).toEqual("");
            expect(defaultObject.cls.element.label).toEqual("");
            expect(defaultObject.cls.grid.container).toEqual("");
            expect(defaultObject.cls.grid.control).toEqual("");
            expect(defaultObject.cls.grid.label).toEqual("");
        });

        it("tests if correct default help property is set", () => {

            expect(defaultObject.help).toBeDefined();
            expect(defaultObject.help).toBeNull();
        });

        it("tests if correct default label properties aree set", () => {

            expect(defaultObject.label).toBeDefined();
            expect(defaultObject.label).toBeNull();
        });

        it("tests if correct default max property is set", () => {

            expect(defaultObject.max).toBeDefined();
            expect(defaultObject.max).toBeNull();
        });

        it("tests if correct default maxLength property is set", () => {

            expect(defaultObject.maxLength).toBeDefined();
            expect(defaultObject.maxLength).toBe(100);
        });
        
        it("tests if correct default min property is set", () => {

            expect(defaultObject.min).toBeDefined();
            expect(defaultObject.min).toBeNull();
        });

        it("tests if correct default placeholder property is set", () => {

            expect(defaultObject.placeholder).toBeDefined();
            expect(defaultObject.placeholder).toEqual("");
        });

        it("tests if correct default readonly property is set", () => {

            expect(defaultObject.readonly).toBeDefined();
            expect(defaultObject.readonly).toBe(false);
        });
        
        it("tests if correct default step property is set", () => {

            expect(defaultObject.step).toBeDefined();
            expect(defaultObject.step).toBeNull();
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