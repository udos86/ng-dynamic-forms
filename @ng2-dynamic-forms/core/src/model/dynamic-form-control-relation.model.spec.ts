import {DynamicTextAreaModel} from "../model/textarea/dynamic-textarea.model";
import {
    findDisableRelation,
    findEnableRelation,
    findActivationRelation,
    findIds
} from "./dynamic-form-control-relation.model";

describe("DynamicFormControlRelationModel test suite", () => {

    describe("default model test suite", () => {

        let testModel: DynamicTextAreaModel,
            config = {

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

        beforeEach(() => {
            testModel = new DynamicTextAreaModel(config);
        });

        it("tests if findDisableRelation function works correctly", () => {

            expect(findDisableRelation(testModel.relation)).toBeDefined();
            expect(findDisableRelation(testModel.relation)).toBe(config.relation[0]);
        });

        it("tests if findEnableRelation function works correctly", () => {

            expect(findEnableRelation(testModel.relation)).toBeDefined();
            expect(findEnableRelation(testModel.relation)).toBe(config.relation[1]);
        });

        it("tests if findActivationRelation function works correctly", () => {

            expect(findActivationRelation(testModel.relation)).toBeDefined();
            expect(findActivationRelation(testModel.relation)).toBe(config.relation[0]);
        });

        it("tests if findIds function works correctly", () => {

            expect(findIds(testModel.relation).length).toBe(2);
            expect(findIds(testModel.relation).join()).toBe("mySelect,myRadioGroup");
        });

    });

});