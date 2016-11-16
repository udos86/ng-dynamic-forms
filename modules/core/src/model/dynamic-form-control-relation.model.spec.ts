import {TestBed, async, inject} from "@angular/core/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {DynamicFormService} from "../service/dynamic-form.service";
import {DynamicTextAreaModel} from "./textarea/dynamic-textarea.model";
import {DynamicSelectModel} from "./select/dynamic-select.model";
import {DynamicRadioGroupModel} from "./radio/dynamic-radio-group.model";
import {
    findDisableRelation,
    findEnableRelation,
    findActivationRelation,
    findIds,
    toBeDisabled
} from "./dynamic-form-control-relation.model";

describe("DynamicFormControlRelationModel test suite", () => {

    describe("default model test suite", () => {

        let testModel: DynamicTextAreaModel,
            config = {

                id: "testTextArea",
                relation: [
                    {
                        action: "DISABLE",
                        when: [
                            {
                                id: "testSelect",
                                value: "option-2"
                            }
                        ]
                    },
                    {
                        action: "ENABLE",
                        connective: "AND",
                        when: [
                            {
                                id: "testSelect",
                                value: "option-3"
                            },
                            {
                                id: "testRadioGroup",
                                value: "option-2",
                            }
                        ]
                    }
                ]
            };

        beforeEach(async(() => {

            TestBed.configureTestingModule({
                imports: [ReactiveFormsModule],
                providers: [DynamicFormService]
            });
        }));

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
            expect(findIds(testModel.relation).join()).toBe("testSelect,testRadioGroup");
        });

        it("tests if findIds function works correctly", () => {

            expect(findIds(testModel.relation).length).toBe(2);
            expect(findIds(testModel.relation).join()).toBe("testSelect,testRadioGroup");
        });

        it("tests if toBeDisabled function works correctly", inject([DynamicFormService], service => {

            let formGroup = service.createFormGroup([

                new DynamicSelectModel({

                    id: "testSelect",
                    options: [{value: "option-1"}, {value: "option-2"}, {value: "option-3"}],
                    value: "option-1"
                }),

                new DynamicRadioGroupModel({

                    id: "testRadioGroup",
                    options: [{value: "option-1"}, {value: "option-2"}, {value: "option-3"}],
                    value: "option-1"
                }),

                testModel
            ]);

            expect(toBeDisabled(testModel.relation[0], formGroup)).toBe(false);
            expect(toBeDisabled(testModel.relation[1], formGroup)).toBe(true);
        }));

    });

});