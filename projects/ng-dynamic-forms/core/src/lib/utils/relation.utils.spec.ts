import { TestBed, inject } from "@angular/core/testing";
import { ReactiveFormsModule, FormGroup } from "@angular/forms";
import { DynamicFormService } from "../service/dynamic-form.service";
import { DynamicFormValidationService } from "../service/dynamic-form-validation.service";
import { DynamicRadioGroupModel } from "../model/radio/dynamic-radio-group.model";
import { DynamicSelectModel } from "../model/select/dynamic-select.model";
import { DynamicTextAreaModel } from "../model/textarea/dynamic-textarea.model";
import {
    findDisabledRelation,
    matchesDisabledRelation,
    matchesRequiredRelation,
    findRequiredRelation
} from "./relation.utils";

describe("Relation utils test suite", () => {

    let group: FormGroup,
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
        },
        rel6 = {
            action: "REQUIRED",
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
        rel7 = {
            action: "REQUIRED",
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
        rel8 = {
            action: "REQUIRED",
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

        group = formService.createFormGroup([

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
        expect(findDisabledRelation(model.relation)).toBe(rel1);

        model.relation = [rel2];
        expect(findDisabledRelation(model.relation)).toBe(rel2);
    });

    it("should check if form control is to be disabled correctly", () => {

        model.relation = [rel1];
        expect(matchesDisabledRelation(model.relation[0], group)).toBe(false);

        model.relation = [rel2];
        expect(matchesDisabledRelation(model.relation[0], group)).toBe(true);

        model.relation = [rel3];
        expect(matchesDisabledRelation(model.relation[0], group)).toBe(false);

        model.relation = [rel4];
        expect(matchesDisabledRelation(model.relation[0], group)).toBe(false);

        model.relation = [rel5];
        expect(matchesDisabledRelation(model.relation[0], group)).toBe(true);

        model.relation = [{action: "TEST", when: [{id: "testTextArea", value: "test"}]}];
        expect(matchesDisabledRelation(model.relation[0], group)).toBe(false);
    });

    it("should find a required relation correctly", () => {

        model.relation = [rel6];
        expect(findRequiredRelation(model.relation)).toBe(rel6);

    });

    it("should check if form control is to be required correctly", () => {

        model.relation = [rel6];
        expect(matchesRequiredRelation(model.relation[0], group)).toBe(false);

        model.relation = [rel7];
        expect(matchesRequiredRelation(model.relation[0], group)).toBe(false);

        model.relation = [rel8];
        expect(matchesRequiredRelation(model.relation[0], group)).toBe(true);

        model.relation = [{action: "TEST", when: [{id: "testTextArea", value: "test"}]}];
        expect(matchesRequiredRelation(model.relation[0], group)).toBe(false);
    });
});
