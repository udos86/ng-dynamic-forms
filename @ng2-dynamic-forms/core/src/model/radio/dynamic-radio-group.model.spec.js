"use strict";
var dynamic_radio_group_model_1 = require("./dynamic-radio-group.model");
describe("DynamicRadioModel test suite", function () {
    describe("default model test suite", function () {
        var config = { id: "default", options: [{ value: "1" }, { value: "2" }] };
        var defaultModel;
        beforeEach(function () {
            defaultModel = new dynamic_radio_group_model_1.DynamicRadioGroupModel(config);
        });
        it("tests if default model is correctly initialized", function () {
            expect(defaultModel.disabled).toBe(false);
            expect(defaultModel.errorMessages).toBeNull();
            expect(defaultModel.hasErrorMessages).toBe(false);
            expect(defaultModel.id).toEqual(config.id);
            expect(defaultModel.label).toBeNull();
            expect(defaultModel.legend).toBeNull();
            expect(defaultModel.name).toEqual(defaultModel.id);
            expect(defaultModel.options.length).toBe(config.options.length);
            expect(defaultModel.type).toEqual(dynamic_radio_group_model_1.DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP);
            expect(defaultModel.value).toBeNull();
        });
        it("should serialize correctly", function () {
            var json = JSON.parse(JSON.stringify(defaultModel));
            expect(json.id).toEqual(defaultModel.id);
            expect(json.options.length).toBe(defaultModel.options.length);
            expect(json.value).toBe(defaultModel.value);
            expect(json.type).toEqual(dynamic_radio_group_model_1.DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP);
        });
    });
});

//# sourceMappingURL=dynamic-radio-group.model.spec.js.map
