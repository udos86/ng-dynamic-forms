"use strict";
var forms_1 = require("@angular/forms");
var dynamic_form_group_model_1 = require("./dynamic-form-group.model");
var dynamic_input_model_1 = require("../input/dynamic-input.model");
describe("DynamicFormArrayModel test suite", function () {
    describe("default model test suite", function () {
        var config = {
            id: "default",
            group: [new dynamic_input_model_1.DynamicInputModel({ id: "defaultInput" })],
            validator: forms_1.Validators.required
        };
        var defaultModel;
        beforeEach(function () {
            defaultModel = new dynamic_form_group_model_1.DynamicFormGroupModel(config);
        });
        it("tests if default object is correctly initialized", function () {
            expect(defaultModel.id).toEqual(config.id);
            expect(defaultModel.group.length).toBe(1);
            expect(defaultModel.legend).toBeNull();
            expect(defaultModel.type).toEqual(dynamic_form_group_model_1.DYNAMIC_FORM_CONTROL_TYPE_GROUP);
            expect(defaultModel.asyncValidator).toBeNull();
            expect(defaultModel.validator).toBeDefined();
        });
        it("should serialize correctly", function () {
            var json = JSON.parse(JSON.stringify(defaultModel));
            expect(json.id).toEqual(defaultModel.id);
            expect(json.type).toEqual(dynamic_form_group_model_1.DYNAMIC_FORM_CONTROL_TYPE_GROUP);
            expect(json.validator).toEqual("required");
        });
    });
});

//# sourceMappingURL=dynamic-form-group.model.spec.js.map
