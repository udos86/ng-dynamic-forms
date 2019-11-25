import { TestBed, inject } from "@angular/core/testing";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { DynamicFormRelationService } from "./dynamic-form-relation.service";
import { DynamicTextAreaModel } from "../model/textarea/dynamic-textarea.model";
import { DynamicFormService } from "./dynamic-form.service";
import { DynamicSelectModel } from "../model/select/dynamic-select.model";
import { DynamicRadioGroupModel } from "../model/radio/dynamic-radio-group.model";
import {
    AND_OPERATOR,
    DISABLED_MATCHER_PROVIDER,
    DISABLED_MATCHER,
    HIDDEN_MATCHER_PROVIDER,
    MATCH_DISABLED,
    MATCH_ENABLED,
    MATCH_REQUIRED,
    OR_OPERATOR,
    REQUIRED_MATCHER_PROVIDER,
    REQUIRED_MATCHER
} from "./dynamic-form-relation-matchers";

describe("DynamicFormRelationService test suite", () => {

    let service: DynamicFormRelationService,
        group: FormGroup,
        model: DynamicTextAreaModel = new DynamicTextAreaModel({id: "testTextArea"}),
        rel1                        = {
            match: MATCH_DISABLED,
            operator: OR_OPERATOR,
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
        rel2                        = {
            match: MATCH_ENABLED,
            operator: AND_OPERATOR,
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
        rel3                        = {
            match: MATCH_DISABLED,
            operator: AND_OPERATOR,
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
        rel4                        = {
            match: MATCH_ENABLED,
            operator: OR_OPERATOR,
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
        rel5                        = {
            match: MATCH_DISABLED,
            operator: OR_OPERATOR,
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
        rel6                        = {
            match: MATCH_REQUIRED,
            operator: OR_OPERATOR,
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
        rel7                        = {
            match: MATCH_REQUIRED,
            operator: AND_OPERATOR,
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
        rel8                        = {
            match: MATCH_REQUIRED,
            operator: OR_OPERATOR,
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
        rel9                        = {
            match: MATCH_DISABLED,
            operator: OR_OPERATOR,
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
        };

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            providers: [DynamicFormRelationService, DISABLED_MATCHER_PROVIDER, HIDDEN_MATCHER_PROVIDER, REQUIRED_MATCHER_PROVIDER]
        });
    });

    beforeEach(inject([DynamicFormRelationService, DynamicFormService],
        (relationService: DynamicFormRelationService, formService: DynamicFormService) => {

            service = relationService;

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

        model.relations = [rel1];
        expect(service.findRelationByMatcher(model.relations, DISABLED_MATCHER)).toBe(rel1);

        model.relations = [rel2];
        expect(service.findRelationByMatcher(model.relations, DISABLED_MATCHER)).toBe(rel2);

        model.relations = [rel6];
        expect(service.findRelationByMatcher(model.relations, REQUIRED_MATCHER)).toBe(rel6);
    });

    it("should check if form control is to be disabled correctly", () => {

        model.relations = [rel1];
        expect(service.matchesCondition(model.relations[0], service.getRelatedFormControls(model, group), DISABLED_MATCHER)).toBe(false);

        model.relations = [rel2];
        expect(service.matchesCondition(model.relations[0], service.getRelatedFormControls(model, group), DISABLED_MATCHER)).toBe(true);

        model.relations = [rel3];
        expect(service.matchesCondition(model.relations[0], service.getRelatedFormControls(model, group), DISABLED_MATCHER)).toBe(false);

        model.relations = [rel4];
        expect(service.matchesCondition(model.relations[0], service.getRelatedFormControls(model, group), DISABLED_MATCHER)).toBe(false);

        model.relations = [rel5];
        expect(service.matchesCondition(model.relations[0], service.getRelatedFormControls(model, group), DISABLED_MATCHER)).toBe(true);

    });

    it("should check if form control is to be required correctly", () => {

        model.relations = [rel6];
        expect(service.matchesCondition(model.relations[0], service.getRelatedFormControls(model, group), REQUIRED_MATCHER)).toBe(false);

        model.relations = [rel7];
        expect(service.matchesCondition(model.relations[0], service.getRelatedFormControls(model, group), REQUIRED_MATCHER)).toBe(false);

        model.relations = [rel8];
        expect(service.matchesCondition(model.relations[0], service.getRelatedFormControls(model, group), REQUIRED_MATCHER)).toBe(true);
    });

    it("should get all related form controls correctly", () => {

        model.relations = [rel9];

        const relatedFormControls = service.getRelatedFormControls(model, group);

        expect(Object.keys(relatedFormControls).length).toBe(rel9.when.length);
    });
});
