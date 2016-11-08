"use strict";
var dynamic_checkbox_group_model_1 = require("./dynamic-checkbox-group.model");
describe("DynamicCheckboxGroupModel test suite", function () {
    describe("default model test suite", function () {
        var config = { id: "default", group: [] };
        var defaultModel;
        beforeEach(function () {
            defaultModel = new dynamic_checkbox_group_model_1.DynamicCheckboxGroupModel(config);
        });
        it("tests if default model is correctly initialized", function () {
            expect(defaultModel.id).toEqual(config.id);
            expect(defaultModel.group).toEqual(config.group);
            expect(defaultModel.group.length).toBe(0);
            expect(defaultModel.legend).toBeNull();
            expect(defaultModel.type).toEqual(dynamic_checkbox_group_model_1.DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP);
        });
        it("should serialize correctly", function () {
            var json = JSON.parse(JSON.stringify(defaultModel));
            expect(json.id).toEqual(defaultModel.id);
            expect(json.type).toEqual(dynamic_checkbox_group_model_1.DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP);
        });
    });
});

//# sourceMappingURL=dynamic-checkbox-group.model.spec.js.map
