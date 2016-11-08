"use strict";
var dynamic_textarea_model_1 = require("../model/textarea/dynamic-textarea.model");
var dynamic_form_control_relation_model_1 = require("./dynamic-form-control-relation.model");
describe("DynamicFormControlRelationModel test suite", function () {
    describe("default model test suite", function () {
        var testModel, config = {
            id: "default",
            label: "Example Textarea",
            rows: 5,
            placeholder: "example Textarea",
            relation: [
                {
                    action: "DISABLE",
                    when: [
                        {
                            id: "mySelect",
                            value: "option-4"
                        }
                    ]
                },
                {
                    action: "ENABLE",
                    connective: "AND",
                    when: [
                        {
                            id: "mySelect",
                            value: "option-3"
                        },
                        {
                            id: "myRadioGroup",
                            value: "option-4",
                        }
                    ]
                }
            ]
        };
        beforeEach(function () {
            testModel = new dynamic_textarea_model_1.DynamicTextAreaModel(config);
        });
        it("tests if findDisableRelation function works correctly", function () {
            expect(dynamic_form_control_relation_model_1.findDisableRelation(testModel.relation)).toBeDefined();
            expect(dynamic_form_control_relation_model_1.findDisableRelation(testModel.relation)).toBe(config.relation[0]);
        });
        it("tests if findEnableRelation function works correctly", function () {
            expect(dynamic_form_control_relation_model_1.findEnableRelation(testModel.relation)).toBeDefined();
            expect(dynamic_form_control_relation_model_1.findEnableRelation(testModel.relation)).toBe(config.relation[1]);
        });
        it("tests if findActivationRelation function works correctly", function () {
            expect(dynamic_form_control_relation_model_1.findActivationRelation(testModel.relation)).toBeDefined();
            expect(dynamic_form_control_relation_model_1.findActivationRelation(testModel.relation)).toBe(config.relation[0]);
        });
        it("tests if findIds function works correctly", function () {
            expect(dynamic_form_control_relation_model_1.findIds(testModel.relation).length).toBe(2);
            expect(dynamic_form_control_relation_model_1.findIds(testModel.relation).join()).toBe("mySelect,myRadioGroup");
        });
    });
});

//# sourceMappingURL=dynamic-form-control-relation.model.spec.js.map
