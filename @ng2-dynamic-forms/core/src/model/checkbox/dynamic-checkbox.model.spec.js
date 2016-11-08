"use strict";
var dynamic_checkbox_model_1 = require("./dynamic-checkbox.model");
describe("DynamicCheckboxModel test suite", function () {
    describe("default model test suite", function () {
        var config = { id: "default" };
        var defaultModel;
        beforeEach(function () {
            defaultModel = new dynamic_checkbox_model_1.DynamicCheckboxModel(config);
        });
        it("tests if default model is correctly initialized", function () {
            expect(defaultModel.align).toEqual(dynamic_checkbox_model_1.DYNAMIC_FORM_CONTROL_CHECKBOX_ALIGN_START);
            expect(defaultModel.asyncValidators).toEqual([]);
            expect(defaultModel.disabled).toBe(false);
            expect(defaultModel.id).toEqual(config.id);
            expect(defaultModel.indeterminate).toBe(false);
            expect(defaultModel.label).toBeNull();
            expect(defaultModel.name).toEqual(defaultModel.id);
            expect(defaultModel.type).toEqual(dynamic_checkbox_model_1.DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX);
            expect(defaultModel.validators).toEqual([]);
            expect(defaultModel.value).toBe(false);
        });
        it("should serialize correctly", function () {
            var json = JSON.parse(JSON.stringify(defaultModel));
            expect(json.id).toEqual(defaultModel.id);
            expect(json.value).toBe(defaultModel.value);
            expect(json.type).toEqual(dynamic_checkbox_model_1.DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX);
        });
    });
});

//# sourceMappingURL=dynamic-checkbox.model.spec.js.map
