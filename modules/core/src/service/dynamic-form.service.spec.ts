import {TestBed, inject} from "@angular/core/testing";
import {
    ReactiveFormsModule,
    FormGroup,
    FormControl,
    FormArray,
    NG_VALIDATORS,
    NG_ASYNC_VALIDATORS
} from "@angular/forms";
import {DynamicFormService} from "./dynamic-form.service";
import {DynamicCheckboxModel} from "../model/checkbox/dynamic-checkbox.model";
import {DynamicCheckboxGroupModel} from "../model/checkbox/dynamic-checkbox-group.model";
import {DynamicFormArrayModel} from "../model/form-array/dynamic-form-array.model";
import {DynamicFormControlModel} from "../model/dynamic-form-control.model";
import {DynamicInputModel} from "../model/input/dynamic-input.model";
import {DynamicRadioGroupModel} from "../model/radio/dynamic-radio-group.model";
import {DynamicSelectModel} from "../model/select/dynamic-select.model";
import {DynamicSliderModel} from "../model/slider/dynamic-slider.model";
import {DynamicSwitchModel} from "../model/switch/dynamic-switch.model";
import {DynamicTextAreaModel} from "../model/textarea/dynamic-textarea.model";
import {DynamicFormGroupModel} from "../model/form-group/dynamic-form-group.model";
import {group} from "@angular/core";

describe("DynamicFormService test suite", () => {

    let testModel,
        service;

    function testValidator() {

        return {
            testValidator: {
                valid: true
            }
        };
    }

    function testAsyncValidator() {

        return new Promise<boolean>(resolve => setTimeout(() => resolve(true), 0));
    }

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            providers: [
                DynamicFormService,
                {provide: NG_VALIDATORS, useValue: testValidator, multi: true},
                {provide: NG_ASYNC_VALIDATORS, useValue: testAsyncValidator, multi: true}
            ]
        });

        testModel = [

            new DynamicSelectModel<string>(
                {
                    id: "testSelect",
                    options: [
                        {
                            label: "Option 1",
                            value: "option-1",
                        },
                        {
                            label: "Option 2",
                            value: "option-2"
                        }
                    ],
                    value: "option-3"
                }
            ),

            new DynamicInputModel({id: "testInput",}),

            new DynamicCheckboxGroupModel(
                {
                    id: "testCheckboxGroup",
                    group: [
                        new DynamicCheckboxModel(
                            {
                                id: "testCheckboxGroup1",
                                value: true
                            }
                        ),
                        new DynamicCheckboxModel(
                            {
                                id: "testCheckboxGroup2",
                                value: true
                            }
                        )
                    ]
                }
            ),

            new DynamicRadioGroupModel<string>(
                {
                    id: "testRadioGroup",
                    options: [
                        {
                            label: "Option 1",
                            value: "option-1",
                        },
                        {
                            label: "Option 2",
                            value: "option-2"
                        }
                    ],
                    value: "option-3"
                }
            ),

            new DynamicTextAreaModel({id: "testTextArea"}),

            new DynamicCheckboxModel({id: "testCheckbox"}),

            new DynamicFormArrayModel(
                {
                    id: "testFormArray",
                    initialCount: 5,
                    createGroup: () => {
                        return [
                            new DynamicInputModel({id: "basicArrayGroupInput"})
                        ];
                    }
                }
            ),

            new DynamicFormGroupModel({id: "testFormGroup", group: []}),

            new DynamicSliderModel({id: "testSlider"}),

            new DynamicSwitchModel({id: "testSwitch"})
        ];
    });

    beforeEach(inject([DynamicFormService], dynamicFormService => service = dynamicFormService));


    it("should be defined", () => {

        expect(service).toBeDefined();
    });


    it("should create create a form group correctly", () => {

        expect(service.createFormGroup).toBeDefined();

        let result = service.createFormGroup(testModel);

        expect(result instanceof FormGroup).toBe(true);

        expect(result.get("testCheckbox") instanceof FormControl).toBe(true);
        expect(result.get("testCheckboxGroup") instanceof FormGroup).toBe(true);
        expect(result.get("testFormArray") instanceof FormArray).toBe(true);
        expect(result.get("testInput") instanceof FormControl).toBe(true);
        expect(result.get("testRadioGroup") instanceof FormControl).toBe(true);
        expect(result.get("testSelect") instanceof FormControl).toBe(true);
        expect(result.get("testTextArea") instanceof FormControl).toBe(true);
    });


    it("should parse dynamic form JSON correctly", () => {

        let json = JSON.parse(JSON.stringify(testModel)),
            formModel;

        expect(service.fromJSON).toBeDefined();

        formModel = service.fromJSON(json);

        expect(Array.isArray(formModel)).toBe(true);

        expect(formModel[0] instanceof DynamicSelectModel).toBe(true);
        expect(formModel[1] instanceof DynamicInputModel).toBe(true);
        expect(formModel[2] instanceof DynamicCheckboxGroupModel).toBe(true);
        expect(formModel[2]["group"].length).toBe(testModel[2].group.length);
        expect(formModel[3] instanceof DynamicRadioGroupModel).toBe(true);
        expect(formModel[4] instanceof DynamicTextAreaModel).toBe(true);
        expect(formModel[5] instanceof DynamicCheckboxModel).toBe(true);
        expect(formModel[6] instanceof DynamicFormArrayModel).toBe(true);
        expect(formModel[7] instanceof DynamicFormGroupModel).toBe(true);
        expect(formModel[8] instanceof DynamicSliderModel).toBe(true);
        expect(formModel[9] instanceof DynamicSwitchModel).toBe(true);
    });


    it("should throw when unknown DynamicFormControlModel id is specified in JSON", () => {

        expect(() => service.fromJSON([{id: "test"}]))
            .toThrow(new Error(`unknown form control type with id "test" defined on JSON object`));
    });


    it("should find a dynamic form control model by id correctly", () => {

        expect(service.findById).toBeDefined();
        expect(service.findById("testCheckbox", testModel) instanceof DynamicFormControlModel).toBe(true);
        expect(service.findById("testCheckboxGroup", testModel) instanceof DynamicFormControlModel).toBe(true);
        expect(service.findById("testFormArray", testModel) instanceof DynamicFormControlModel).toBe(true);
        expect(service.findById("testInput", testModel) instanceof DynamicFormControlModel).toBe(true);
        expect(service.findById("testRadioGroup", testModel) instanceof DynamicFormControlModel).toBe(true);
        expect(service.findById("testSelect", testModel) instanceof DynamicFormControlModel).toBe(true);
        expect(service.findById("testSlider", testModel) instanceof DynamicFormControlModel).toBe(true);
        expect(service.findById("testSwitch", testModel) instanceof DynamicFormControlModel).toBe(true);
        expect(service.findById("testTextArea", testModel) instanceof DynamicFormControlModel).toBe(true);
    });


    it("should create a form array correctly", () => {

        let model = service.findById("testFormArray", testModel),
            formArray;

        expect(service.createFormArray).toBeDefined();

        formArray = service.createFormArray(model);

        expect(formArray instanceof FormArray).toBe(true);
        expect(formArray.length).toBe(model.initialCount);
    });


    it("should create a form array group correctly", () => {

        let model = service.findById("testFormArray", testModel);

        expect(service.createFormArrayGroup).toBeDefined();
        expect(service.createFormArrayGroup(model) instanceof FormGroup).toBe(true);
    });


    it("should add a form array group correctly", () => {

        let model = service.findById("testFormArray", testModel),
            formArray = service.createFormArray(model);

        expect(service.addFormArrayGroup).toBeDefined();

        service.addFormArrayGroup(formArray, model);

        expect(formArray.length).toBe(model.initialCount + 1);
    });


    it("should insert a form array group correctly", () => {

        let model = service.findById("testFormArray", testModel),
            formArray = service.createFormArray(model);

        expect(service.insertFormArrayGroup).toBeDefined();

        service.insertFormArrayGroup(0, formArray, model);

        expect(formArray.length).toBe(model.initialCount + 1);
    });


    it("should remove a form array group correctly", () => {

        let model = service.findById("testFormArray", testModel),
            formArray = service.createFormArray(model);

        expect(service.removeFormArrayGroup).toBeDefined();

        service.removeFormArrayGroup(0, formArray, model);

        expect(formArray.length).toBe(model.initialCount - 1);
    });


    it("should clear a form array correctly", () => {

        let model = service.findById("testFormArray", testModel),
            formArray = service.createFormArray(model);

        expect(service.clearFormArray).toBeDefined();

        service.clearFormArray(formArray, model);

        expect(formArray.length).toBe(0);
    });


    it("should resolve validators from config correctly", () => {

        let config = {required: null, maxLength: 7, minLength: 3},
            validators = service.getValidators(config);

        expect(validators.length).toBe(Object.keys(config).length);
    });

    it("should resolve custom validators from config correctly", () => {

        let config = {required: null, maxLength: 7, testValidator: null},
            validators = service.getValidators(config);

        expect(validators.length).toBe(Object.keys(config).length);
    });

    it("should resolve custom async validators from config correctly", () => {

        let config = {required: null, maxLength: 7, testAsyncValidator: null},
            validators = service.getValidators(config);

        expect(validators.length).toBe(Object.keys(config).length);
    });

    it("should throw when validator is not provided via NG_VALIDATORS or NG_ASYNC_VALIDATORS", () => {

        expect(() => service.getValidatorFn("test", null))
            .toThrow(new Error(`validator "test" is not provided via NG_VALIDATORS or NG_ASYNC_VALIDATORS`));
    });
});