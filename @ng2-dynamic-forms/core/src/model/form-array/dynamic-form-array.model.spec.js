"use strict";
var forms_1 = require("@angular/forms");
var dynamic_form_array_model_1 = require("./dynamic-form-array.model");
var dynamic_input_model_1 = require("../input/dynamic-input.model");
describe("DynamicFormArrayModel test suite", function () {
    describe("default model test suite", function () {
        var defaultModel;
        var config = {
            id: "default",
            initialCount: 3,
            createGroup: function () { return [new dynamic_input_model_1.DynamicInputModel({ id: "defaultInput" })]; },
            validator: forms_1.Validators.required
        };
        beforeEach(function () {
            defaultModel = new dynamic_form_array_model_1.DynamicFormArrayModel(config);
        });
        it("tests if default model is correctly initialized", function () {
            expect(defaultModel.initialCount).toBe(config.initialCount);
            expect(defaultModel.groups.length).toBe(defaultModel.initialCount);
            expect(defaultModel.id).toEqual(config.id);
            expect(defaultModel.type).toEqual(dynamic_form_array_model_1.DYNAMIC_FORM_CONTROL_TYPE_ARRAY);
            expect(defaultModel.asyncValidator).toBeNull();
            expect(defaultModel.validator).toBeDefined();
            expect(defaultModel.createGroup().length).toEqual(1);
            expect(defaultModel.removeGroup).toBeDefined();
        });
        it("should serialize correctly", function () {
            var json = JSON.parse(JSON.stringify(defaultModel));
            expect(json.asyncValidators).toBeUndefined();
            expect(json.id).toEqual(defaultModel.id);
            expect(json.groups.length).toEqual(defaultModel.groups.length);
            expect(json.type).toEqual(dynamic_form_array_model_1.DYNAMIC_FORM_CONTROL_TYPE_ARRAY);
            expect(json.validator).toEqual("required");
            expect(json.validators).toBeUndefined();
        });
    });
});

//# sourceMappingURL=dynamic-form-array.model.spec.js.map
