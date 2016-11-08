"use strict";
var dynamic_switch_model_1 = require("./dynamic-switch.model");
describe("DynamicSwitchModel test suite", function () {
    describe("default model test suite", function () {
        var config = { id: "default" };
        var defaultModel;
        beforeEach(function () {
            defaultModel = new dynamic_switch_model_1.DynamicSwitchModel(config);
        });
        it("tests if default model is correctly initialized", function () {
            expect(defaultModel.disabled).toBe(false);
            expect(defaultModel.id).toEqual(config.id);
            expect(defaultModel.label).toBeNull();
            expect(defaultModel.name).toEqual(defaultModel.id);
            expect(defaultModel.type).toEqual(dynamic_switch_model_1.DYNAMIC_FORM_CONTROL_TYPE_SWITCH);
            expect(defaultModel.value).toBe(false);
        });
        it("should serialize correctly", function () {
            var json = JSON.parse(JSON.stringify(defaultModel));
            expect(json.id).toEqual(defaultModel.id);
            expect(json.value).toBe(defaultModel.value);
            expect(json.type).toEqual(dynamic_switch_model_1.DYNAMIC_FORM_CONTROL_TYPE_SWITCH);
        });
    });
});

//# sourceMappingURL=dynamic-switch.model.spec.js.map
