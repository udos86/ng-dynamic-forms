import { TestBed, inject } from "@angular/core/testing";
import { ReactiveFormsModule, FormGroup } from "@angular/forms";
import { DynamicFormService } from "../service/dynamic-form.service";
import { DynamicFormValidationService } from "../service/dynamic-form-validation.service";
import { DynamicRadioGroupModel } from "../model/radio/dynamic-radio-group.model";
import { DynamicSelectModel } from "../model/select/dynamic-select.model";
import { DynamicTextAreaModel } from "../model/textarea/dynamic-textarea.model";
import { findActivationRelation, getRelatedFormControls, isFormControlToBeDisabled } from "./relation.utils";

describe("Relation utils test suite", () => {

    let controlGroup: FormGroup,
        model: DynamicTextAreaModel = new DynamicTextAreaModel({id: "testTextArea"}),
        rel1 = {
            action: "DISABLE",
            connective: "OR",
            when: [
                {
                    id: "testSelect",
                    value: "option-2"
                },
                {
                    id: "testRadioGroup",
                    value: "option-3"
                }
            ]
        },
        rel2 = {
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
        },
        rel3 = {
            action: "DISABLE",
            connective: "AND",
            when: [
                {
                    id: "testSelect",
                    value: "option-2"
                },
                {
                    id: "testRadioGroup",
                    value: "option-3"
                }
            ]
        },
        rel4 = {
            action: "ENABLE",
            connective: "OR",
            when: [
                {
                    id: "testSelect",
                    value: "option-1"
                },
                {
                    id: "testRadioGroup",
                    value: "option-2",
                }
            ]
        },
        rel5 = {
            action: "DISABLE",
            connective: "OR",
            when: [
                {
                    id: "testSelect",
                    value: "option-1"
                },
                {
                    id: "testRadioGroup",
                    value: "option-3"
                }
            ]
        };

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            providers: [DynamicFormService, DynamicFormValidationService]
        });
    });

    beforeEach(inject([DynamicFormService], (formService: DynamicFormService) => {

        controlGroup = formService.createFormGroup([

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

            model
        ]);
    }));

    it("should find an activation relation correctly", () => {

        model.relation = [rel1];
        expect(findActivationRelation(model.relation)).toBe(rel1);

        model.relation = [rel2];
        expect(findActivationRelation(model.relation)).toBe(rel2);
    });

    it("should get all related form controls correctly", () => {

        model.relation = [rel2];

        expect(getRelatedFormControls(model, controlGroup).length).toBe(2);
    });

    it("should throw when model depends on itself", () => {

        model.relation = [{
            action: "DISABLE",
            when: [
                {
                    id: "testTextArea",
                    value: "test"
                }
            ]
        }];

        expect(() => getRelatedFormControls(model, controlGroup))
            .toThrow(new Error(`FormControl ${model.id} cannot depend on itself`));
    });

    it("should check if form control is to be disabled correctly", () => {

        model.relation = [rel1];
        expect(isFormControlToBeDisabled(model.relation[0], controlGroup)).toBe(false);

        model.relation = [rel2];
        expect(isFormControlToBeDisabled(model.relation[0], controlGroup)).toBe(true);

        model.relation = [rel3];
        expect(isFormControlToBeDisabled(model.relation[0], controlGroup)).toBe(false);

        model.relation = [rel4];
        expect(isFormControlToBeDisabled(model.relation[0], controlGroup)).toBe(false);

        model.relation = [rel5];
        expect(isFormControlToBeDisabled(model.relation[0], controlGroup)).toBe(true);

        model.relation = [{action: "TEST", when: [{id: "testTextArea", value: "test"}]}];
        expect(isFormControlToBeDisabled(model.relation[0], controlGroup)).toBe(false);
    });
});
