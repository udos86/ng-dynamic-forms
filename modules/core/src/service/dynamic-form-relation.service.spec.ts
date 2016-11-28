import {TestBed, inject} from "@angular/core/testing";
import {ReactiveFormsModule, FormGroup} from "@angular/forms";
import {DynamicFormRelationService} from "./dynamic-form-relation.service";
import {DynamicFormService} from "./dynamic-form.service";
import {DynamicRadioGroupModel} from "../model/radio/dynamic-radio-group.model";
import {DynamicSelectModel} from "../model/select/dynamic-select.model";
import {DynamicTextAreaModel} from "../model/textarea/dynamic-textarea.model";

describe("DynamicFormRelationService test suite", () => {

    let service: DynamicFormRelationService,
        controlGroup: FormGroup,
        model: DynamicTextAreaModel,
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

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            providers: [DynamicFormRelationService, DynamicFormService]
        });
    });

    beforeEach(inject([DynamicFormRelationService, DynamicFormService], (relationService, formService) => {

        model = new DynamicTextAreaModel(config);
        service = relationService;
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

    it("tests if findActivationRelation function works correctly", () => {

        expect(service.findActivationRelation(model.relation)).toBeDefined();
        expect(service.findActivationRelation(model.relation)).toBe(config.relation[0]);
    });

    it("tests if findIds function works correctly", () => {

        expect(service.getRelatedControls(model, controlGroup).length).toBe(2);
    });

    it("tests if toBeDisabled function works correctly", () => {

        expect(service.isControlToBeDisabled(model.relation[0], controlGroup)).toBe(false);
        expect(service.isControlToBeDisabled(model.relation[1], controlGroup)).toBe(true);
    });
});