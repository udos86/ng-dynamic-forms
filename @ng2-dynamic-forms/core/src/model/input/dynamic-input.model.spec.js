"use strict";
var dynamic_input_model_1 = require("./dynamic-input.model");
var dynamic_form_autofill_service_1 = require("../../service/dynamic-form-autofill.service");
describe("DynamicInputModel test suite", function () {
    describe("default model test suite", function () {
        var config = { id: "default" };
        var defaultModel;
        beforeEach(function () {
            defaultModel = new dynamic_input_model_1.DynamicInputModel(config);
        });
        it("tests if correct default type property is set", function () {
            expect(defaultModel.type).toEqual(dynamic_input_model_1.DYNAMIC_FORM_CONTROL_TYPE_INPUT);
        });
        it("tests if correct default input type property is set", function () {
            expect(defaultModel.inputType).toEqual(dynamic_input_model_1.DYNAMIC_FORM_CONTROL_INPUT_TYPE_TEXT);
        });
        it("tests if correct default autoComplete property is set", function () {
            expect(defaultModel.autoComplete).toEqual(dynamic_form_autofill_service_1.AUTOCOMPLETE_ON);
        });
        it("tests if correct default autoFocus property is set", function () {
            expect(defaultModel.autoFocus).toBe(false);
        });
        it("tests if correct default cls properties aree set", function () {
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
        it("tests if correct default hint property is set", function () {
            expect(defaultModel.hint).toBeNull();
        });
        it("tests if correct default label properties aree set", function () {
            expect(defaultModel.label).toBeNull();
        });
        it("tests if correct default max property is set", function () {
            expect(defaultModel.max).toBeNull();
        });
        it("tests if correct default maxLength property is set", function () {
            expect(defaultModel.maxLength).toBeNull();
        });
        it("tests if correct default minLength property is set", function () {
            expect(defaultModel.minLength).toBeNull();
        });
        it("tests if correct default min property is set", function () {
            expect(defaultModel.min).toBeNull();
        });
        it("tests if correct default placeholder property is set", function () {
            expect(defaultModel.placeholder).toEqual("");
        });
        it("tests if correct default readonly property is set", function () {
            expect(defaultModel.readOnly).toBe(false);
        });
        it("tests if correct default required property is set", function () {
            expect(defaultModel.required).toBe(false);
        });
        it("tests if correct default spellcheck property is set", function () {
            expect(defaultModel.spellCheck).toBe(false);
        });
        it("tests if correct default step property is set", function () {
            expect(defaultModel.step).toBeNull();
        });
        it("tests if correct default prefix property is set", function () {
            expect(defaultModel.prefix).toBeNull();
        });
        it("tests if correct default suffix property is set", function () {
            expect(defaultModel.suffix).toBeNull();
        });
        it("should serialize correctly", function () {
            var json = JSON.parse(JSON.stringify(defaultModel));
            expect(json.id).toEqual(defaultModel.id);
            expect(json.disabled).toEqual(defaultModel.disabled);
            expect(json.value).toBe(defaultModel.value);
            expect(json.type).toEqual(dynamic_input_model_1.DYNAMIC_FORM_CONTROL_TYPE_INPUT);
        });
    });
});

//# sourceMappingURL=dynamic-input.model.spec.js.map
