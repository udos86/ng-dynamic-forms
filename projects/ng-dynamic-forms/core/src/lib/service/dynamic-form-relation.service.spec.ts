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
    STATE_DISABLED,
    STATE_ENABLED,
    STATE_REQUIRED
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
            state: STATE_DISABLED,
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
            state: STATE_ENABLED,
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
            state: STATE_DISABLED,
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
            state: STATE_ENABLED,
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
            state: STATE_DISABLED,
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
            state: STATE_REQUIRED,
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
            state: STATE_REQUIRED,
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
            state: STATE_REQUIRED,
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

        model.relation = [rel1];
        expect(service.findRelation(model.relation, [rel1.state])).toBe(rel1);

        model.relation = [rel2];
        expect(service.findRelation(model.relation, [rel2.state])).toBe(rel2);

        model.relation = [rel6];
        expect(service.findRelation(model.relation, [rel6.state])).toBe(rel6);
    });

    it("should check if form control is to be disabled correctly", () => {

        model.relation = [rel1];
        expect(service.matchesCondition(model.relation[0], group, DisabledMatcher)).toBe(false);

        model.relation = [rel2];
        expect(service.matchesCondition(model.relation[0], group, DisabledMatcher)).toBe(true);

        model.relation = [rel3];
        expect(service.matchesCondition(model.relation[0], group, DisabledMatcher)).toBe(false);

        model.relation = [rel4];
        expect(service.matchesCondition(model.relation[0], group, DisabledMatcher)).toBe(false);

        model.relation = [rel5];
        expect(service.matchesCondition(model.relation[0], group, DisabledMatcher)).toBe(true);

    });

    it("should check if form control is to be required correctly", () => {

        model.relation = [rel6];
        expect(service.matchesCondition(model.relation[0], group, RequiredMatcher)).toBe(false);

        model.relation = [rel7];
        expect(service.matchesCondition(model.relation[0], group, RequiredMatcher)).toBe(false);

        model.relation = [rel8];
        expect(service.matchesCondition(model.relation[0], group, RequiredMatcher)).toBe(true);
    });

    it("should get all related form controls correctly", () => {

        model.relation = [{
            state: STATE_DISABLED,
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

        model.relation = [{
            state: STATE_DISABLED,
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
