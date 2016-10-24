import {
    DYNAMIC_FORM_CONTROL_TYPE_INPUT,
    DYNAMIC_FORM_CONTROL_INPUT_TYPE_TEXT,
    DynamicInputModel
} from "./dynamic-input.model";
import {AUTOCOMPLETE_ON} from "../../service/dynamic-form-autofill.service";

describe("DynamicInputModel test suite", () => {

    describe("default model test suite", () => {

        let config = {id: "default"};
        let defaultModel: DynamicInputModel;

        beforeEach(() => {
            defaultModel = new DynamicInputModel(config);
        });

        it("tests if correct default type property is set", () => {

            expect(defaultModel.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_INPUT);
        });

        it("tests if correct default input type property is set", () => {

            expect(defaultModel.inputType).toEqual(DYNAMIC_FORM_CONTROL_INPUT_TYPE_TEXT);
        });

        it("tests if correct default autoComplete property is set", () => {

            expect(defaultModel.autoComplete).toEqual(AUTOCOMPLETE_ON);
        });

        it("tests if correct default autoFocus property is set", () => {

            expect(defaultModel.autoFocus).toBe(false);
        });

        it("tests if correct default cls properties aree set", () => {

            expect(defaultModel.cls).toBeDefined();
            expect(defaultModel.cls.element.container).toEqual("");
            expect(defaultModel.cls.element.control).toEqual("");
            expect(defaultModel.cls.element.errors).toEqual("");
            expect(defaultModel.cls.element.label).toEqual("");
            expect(defaultModel.cls.grid.container).toEqual("");
            expect(defaultModel.cls.grid.control).toEqual("");
            expect(defaultModel.cls.grid.errors).toEqual("");
            expect(defaultModel.cls.grid.label).toEqual("");
        });

        it("tests if correct default hint property is set", () => {

            expect(defaultModel.hint).toBeNull();
        });

        it("tests if correct default label properties aree set", () => {

            expect(defaultModel.label).toBeNull();
        });

        it("tests if correct default max property is set", () => {

            expect(defaultModel.max).toBeNull();
        });

        it("tests if correct default maxLength property is set", () => {

            expect(defaultModel.maxLength).toBeNull();
        });

        it("tests if correct default minLength property is set", () => {

            expect(defaultModel.minLength).toBeNull();
        });

        it("tests if correct default min property is set", () => {

            expect(defaultModel.min).toBeNull();
        });

        it("tests if correct default placeholder property is set", () => {

            expect(defaultModel.placeholder).toEqual("");
        });

        it("tests if correct default readonly property is set", () => {

            expect(defaultModel.readOnly).toBe(false);
        });

        it("tests if correct default required property is set", () => {

            expect(defaultModel.required).toBe(false);
        });

        it("tests if correct default spellcheck property is set", () => {

            expect(defaultModel.spellCheck).toBe(false);
        });

        it("tests if correct default step property is set", () => {

            expect(defaultModel.step).toBeNull();
        });

        it("tests if correct default prefix property is set", () => {

            expect(defaultModel.prefix).toBeNull();
        });

        it("tests if correct default suffix property is set", () => {

            expect(defaultModel.suffix).toBeNull();
        });

        it("should serialize correctly", () => {

            let json = JSON.parse(JSON.stringify(defaultModel));

            expect(json.id).toEqual(defaultModel.id);
            expect(json.disabled).toEqual(defaultModel.disabled);
            expect(json.value).toBe(defaultModel.value);
            expect(json.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_INPUT);
        });

    });

});