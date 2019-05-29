import { TestBed, inject } from "@angular/core/testing";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { DynamicFormRelationService } from "./dynamic-form-relation.service";
import { DynamicTextAreaModel } from "../model/textarea/dynamic-textarea.model";
import { DynamicFormService } from "./dynamic-form.service";
import { DynamicSelectModel } from "../model/select/dynamic-select.model";
import { DynamicRadioGroupModel } from "../model/radio/dynamic-radio-group.model";
import {
    AND_OPERATOR,
    OR_OPERATOR,
    MATCH_DISABLED,
    MATCH_ENABLED,
    MATCH_REQUIRED
} from "../model/misc/dynamic-form-control-relation.model";
import {
    DISABLED_MATCHER,
    DisabledMatcher,
    HIDDEN_MATCHER,
    REQUIRED_MATCHER,
    RequiredMatcher
} from "./dynamic-form-relation.matchers";

describe("DynamicFormRelationService test suite", () => {

    let service: DynamicFormRelationService,
        group: FormGroup,
        model: DynamicTextAreaModel = new DynamicTextAreaModel({id: "testTextArea"}),
        rel1 = {
            state: MATCH_DISABLED,
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
        rel2 = {
            state: MATCH_ENABLED,
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
        rel3 = {
            state: MATCH_DISABLED,
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
        rel4 = {
            state: MATCH_ENABLED,
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
        rel5 = {
            state: MATCH_DISABLED,
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
        rel6 = {
            state: MATCH_REQUIRED,
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
        rel7 = {
            state: MATCH_REQUIRED,
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
        rel8 = {
            state: MATCH_REQUIRED,
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
        };

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            providers: [DynamicFormRelationService, DISABLED_MATCHER, HIDDEN_MATCHER, REQUIRED_MATCHER]
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
        expect(service.findRelation(model.relations, [rel1.state])).toBe(rel1);

        model.relations = [rel2];
        expect(service.findRelation(model.relations, [rel2.state])).toBe(rel2);

        model.relations = [rel6];
        expect(service.findRelation(model.relations, [rel6.state])).toBe(rel6);
    });

    it("should check if form control is to be disabled correctly", () => {

        model.relations = [rel1];
        expect(service.matchesCondition(model.relations[0], group, DisabledMatcher)).toBe(false);

        model.relations = [rel2];
        expect(service.matchesCondition(model.relations[0], group, DisabledMatcher)).toBe(true);

        model.relations = [rel3];
        expect(service.matchesCondition(model.relations[0], group, DisabledMatcher)).toBe(false);

        model.relations = [rel4];
        expect(service.matchesCondition(model.relations[0], group, DisabledMatcher)).toBe(false);

        model.relations = [rel5];
        expect(service.matchesCondition(model.relations[0], group, DisabledMatcher)).toBe(true);

    });

    it("should check if form control is to be required correctly", () => {

        model.relations = [rel6];
        expect(service.matchesCondition(model.relations[0], group, RequiredMatcher)).toBe(false);

        model.relations = [rel7];
        expect(service.matchesCondition(model.relations[0], group, RequiredMatcher)).toBe(false);

        model.relations = [rel8];
        expect(service.matchesCondition(model.relations[0], group, RequiredMatcher)).toBe(true);
    });

    it("should get all related form controls correctly", () => {

        model.relations = [{
            state: MATCH_DISABLED,
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
        }];

        expect(service.getRelatedFormControls(model, group).length).toBe(2);
    });

    it("should throw when model depends on itself", () => {

        model.relations = [{
            state: MATCH_DISABLED,
            when: [
                {
                    id: "testTextArea",
                    value: "test"
                }
            ]
        }];

        expect(() => service.getRelatedFormControls(model, group))
            .toThrow(new Error(`FormControl ${model.id} cannot depend on itself`));
    });
});
