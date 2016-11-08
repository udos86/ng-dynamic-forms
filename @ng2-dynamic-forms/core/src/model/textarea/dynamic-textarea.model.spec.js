"use strict";
var forms_1 = require("@angular/forms");
var dynamic_textarea_model_1 = require("./dynamic-textarea.model");
describe("DynamicTextAreaModel test suite", function () {
    describe("default model test suite", function () {
        var config = {
            id: "default",
            validators: [forms_1.Validators.required]
        };
        var defaultModel;
        beforeEach(function () {
            defaultModel = new dynamic_textarea_model_1.DynamicTextAreaModel(config);
        });
        it("tests if default model is correctly initialized", function () {
            expect(defaultModel.cols).toBe(20);
            expect(defaultModel.disabled).toBe(false);
            expect(defaultModel.errorMessages).toBeNull();
            expect(defaultModel.hasErrorMessages).toBe(false);
            expect(defaultModel.id).toEqual(config.id);
            expect(defaultModel.label).toBeNull();
            expect(defaultModel.name).toEqual(defaultModel.id);
            expect(defaultModel.rows).toBe(2);
            expect(defaultModel.type).toEqual(dynamic_textarea_model_1.DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA);
            expect(defaultModel.value).toBeNull();
            expect(defaultModel.wrap).toEqual(dynamic_textarea_model_1.DYNAMIC_FORM_TEXTAREA_WRAP_SOFT);
        });
        it("should serialize correctly", function () {
            var json = JSON.parse(JSON.stringify(defaultModel));
            expect(json.id).toEqual(defaultModel.id);
            expect(json.cols).toBe(defaultModel.cols);
            expect(json.validators.length).toBe(defaultModel.validators.length);
            expect(json.validators[0]).toEqual("required");
            expect(json.value).toBe(defaultModel.value);
            expect(json.type).toEqual(dynamic_textarea_model_1.DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA);
        });
    });
});

//# sourceMappingURL=dynamic-textarea.model.spec.js.map
