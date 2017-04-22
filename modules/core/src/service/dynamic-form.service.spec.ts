import { TestBed, inject } from "@angular/core/testing";
import {
    ReactiveFormsModule,
    FormGroup,
    FormControl,
    FormArray,
    NG_VALIDATORS,
    NG_ASYNC_VALIDATORS
} from "@angular/forms";
import { DynamicFormService } from "./dynamic-form.service";
import { DynamicCheckboxModel } from "../model/checkbox/dynamic-checkbox.model";
import { DynamicCheckboxGroupModel } from "../model/checkbox/dynamic-checkbox-group.model";
import { DynamicDateControlModel } from "../model/dynamic-date-control.model";
import { DynamicDatePickerModel } from "../model/datepicker/dynamic-datepicker.model";
import { DynamicFileUploadModel } from "../model/file-upload/dynamic-file-upload.model";
import { DynamicFormArrayModel } from "../model/form-array/dynamic-form-array.model";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { DynamicFormGroupModel } from "../model/form-group/dynamic-form-group.model";
import { DynamicInputModel } from "../model/input/dynamic-input.model";
import { DynamicRadioGroupModel } from "../model/radio/dynamic-radio-group.model";
import { DynamicSelectModel } from "../model/select/dynamic-select.model";
import { DynamicSliderModel } from "../model/slider/dynamic-slider.model";
import { DynamicSwitchModel } from "../model/switch/dynamic-switch.model";
import { DynamicTextAreaModel } from "../model/textarea/dynamic-textarea.model";
import { DynamicFormValueControlModel, DynamicFormControlValue } from "../model/dynamic-form-value-control.model";

describe("DynamicFormService test suite", () => {

    let testModel: DynamicFormControlModel[],
        service: DynamicFormService;

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
                            value: "option-1"
                        },
                        {
                            label: "Option 2",
                            value: "option-2"
                        }
                    ],
                    value: "option-3"
                }
            ),

            new DynamicInputModel({id: "testInput"}),

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
                            value: "option-1"
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

            new DynamicFormGroupModel({id: "testFormGroup", group: [new DynamicInputModel({id: "nestedTestInput"})]}),

            new DynamicSliderModel({id: "testSlider"}),

            new DynamicSwitchModel({id: "testSwitch"}),

            new DynamicDatePickerModel({id: "testDatepicker", value: new Date()}),

            new DynamicFileUploadModel({id: "testFileUpload"})
        ];
    });

    beforeEach(inject([DynamicFormService], (formService: DynamicFormService) => service = formService));


    it("should be defined", () => {

        expect(service).toBeDefined();
    });


    it("should create create a form group correctly", () => {

        expect(service.createFormGroup).toBeDefined();

        let formGroup = service.createFormGroup(testModel);

        expect(formGroup instanceof FormGroup).toBe(true);

        expect(formGroup.get("testCheckbox") instanceof FormControl).toBe(true);
        expect(formGroup.get("testCheckboxGroup") instanceof FormGroup).toBe(true);
        expect(formGroup.get("testDatepicker") instanceof FormControl).toBe(true);
        expect(formGroup.get("testFormArray") instanceof FormArray).toBe(true);
        expect(formGroup.get("testInput") instanceof FormControl).toBe(true);
        expect(formGroup.get("testRadioGroup") instanceof FormControl).toBe(true);
        expect(formGroup.get("testSelect") instanceof FormControl).toBe(true);
        expect(formGroup.get("testTextArea") instanceof FormControl).toBe(true);
        expect(formGroup.get("testFileUpload") instanceof FormControl).toBe(true);
    });


    it("should parse dynamic form JSON correctly", () => {

        let json = JSON.stringify(testModel),
            formModel;

        expect(service.fromJSON).toBeDefined();

        formModel = service.fromJSON(json);

        expect(Array.isArray(formModel)).toBe(true);

        expect(formModel[0] instanceof DynamicSelectModel).toBe(true);
        expect(formModel[1] instanceof DynamicInputModel).toBe(true);
        expect(formModel[2] instanceof DynamicCheckboxGroupModel).toBe(true);
        expect((formModel[2] as DynamicCheckboxGroupModel).group.length).toBe((testModel[2] as DynamicCheckboxGroupModel).group.length);
        expect(formModel[3] instanceof DynamicRadioGroupModel).toBe(true);
        expect(formModel[4] instanceof DynamicTextAreaModel).toBe(true);
        expect(formModel[5] instanceof DynamicCheckboxModel).toBe(true);
        expect(formModel[6] instanceof DynamicFormArrayModel).toBe(true);
        expect(formModel[7] instanceof DynamicFormGroupModel).toBe(true);
        expect(formModel[8] instanceof DynamicSliderModel).toBe(true);
        expect(formModel[9] instanceof DynamicSwitchModel).toBe(true);
        expect(formModel[10] instanceof DynamicDatePickerModel).toBe(true);
        expect((formModel[10] as DynamicDateControlModel).value instanceof Date).toBe(true);
        expect(formModel[11] instanceof DynamicFileUploadModel).toBe(true);
    });


    it("should throw when unknown DynamicFormControlModel id is specified in JSON", () => {

        expect(() => service.fromJSON([{id: "test"}]))
            .toThrow(new Error(`unknown form control model type defined on JSON object with id "test"`));
    });


    it("should find a dynamic form control model by id correctly", () => {

        expect(service.findById).toBeDefined();
        expect(service.findById("testCheckbox", testModel) instanceof DynamicFormControlModel).toBe(true);
        expect(service.findById("testCheckboxGroup", testModel) instanceof DynamicFormControlModel).toBe(true);
        expect(service.findById("testDatepicker", testModel) instanceof DynamicFormControlModel).toBe(true);
        expect(service.findById("testFormArray", testModel) instanceof DynamicFormControlModel).toBe(true);
        expect(service.findById("testInput", testModel) instanceof DynamicFormControlModel).toBe(true);
        expect(service.findById("testRadioGroup", testModel) instanceof DynamicFormControlModel).toBe(true);
        expect(service.findById("testSelect", testModel) instanceof DynamicFormControlModel).toBe(true);
        expect(service.findById("testSlider", testModel) instanceof DynamicFormControlModel).toBe(true);
        expect(service.findById("testSwitch", testModel) instanceof DynamicFormControlModel).toBe(true);
        expect(service.findById("testTextArea", testModel) instanceof DynamicFormControlModel).toBe(true);
        expect(service.findById("testFileUpload", testModel) instanceof DynamicFormControlModel).toBe(true);
    });


    it("should find a nested dynamic form control model by id correctly", () => {

        expect(service.findById("testCheckboxGroup1", testModel) instanceof DynamicFormControlModel).toBe(true);
        expect(service.findById("testCheckboxGroup2", testModel) instanceof DynamicFormControlModel).toBe(true);
        expect(service.findById("nestedTestInput", testModel) instanceof DynamicFormControlModel).toBe(true);
    });


    it("should add a form control to an existing form group", () => {

        let formGroup = service.createFormGroup(testModel),
            nestedFormGroup = formGroup.controls["testFormGroup"] as FormGroup,
            nestedFormGroupModel = testModel[7] as DynamicFormGroupModel,
            newModel1 = new DynamicInputModel({id: "newInput1"}),
            newModel2 = new DynamicInputModel({id: "newInput2"});

        service.addFormGroupControl(formGroup, testModel, newModel1);
        service.addFormGroupControl(nestedFormGroup, nestedFormGroupModel, newModel2);

        expect(formGroup.controls[newModel1.id]).toBeDefined();
        expect(testModel[testModel.length - 1] === newModel1).toBe(true);

        expect((formGroup.controls["testFormGroup"] as FormGroup).controls[newModel2.id]).toBeDefined();
        expect(nestedFormGroupModel.get(nestedFormGroupModel.group.length - 1) === newModel2).toBe(true);
    });


    it("should remove a form control from an existing form group", () => {

        let formGroup = service.createFormGroup(testModel),
            length = testModel.length,
            index = 1,
            id = testModel[index].id;

        service.removeFormGroupControl(index, formGroup, testModel);

        expect(Object.keys(formGroup.controls).length).toBe(length - 1);
        expect(formGroup.controls[id]).toBeUndefined();

        expect(testModel.length).toBe(length - 1);
        expect(service.findById(id, testModel)).toBeNull();
    });


    it("should create a form array correctly", () => {

        let model = service.findById("testFormArray", testModel) as DynamicFormArrayModel,
            formArray;

        expect(service.createFormArray).toBeDefined();

        formArray = service.createFormArray(model);

        expect(formArray instanceof FormArray).toBe(true);
        expect(formArray.length).toBe(model.initialCount);
    });


    it("should add a form array group correctly", () => {

        let model = service.findById("testFormArray", testModel) as DynamicFormArrayModel,
            formArray = service.createFormArray(model);

        expect(service.addFormArrayGroup).toBeDefined();

        service.addFormArrayGroup(formArray, model);

        expect(formArray.length).toBe(model.initialCount + 1);
    });


    it("should insert a form array group correctly", () => {

        let model = service.findById("testFormArray", testModel) as DynamicFormArrayModel,
            formArray = service.createFormArray(model);

        expect(service.insertFormArrayGroup).toBeDefined();

        service.insertFormArrayGroup(0, formArray, model);

        expect(formArray.length).toBe(model.initialCount + 1);
    });


    it("should move a form array group correctly", () => {

        let model = service.findById("testFormArray", testModel) as DynamicFormArrayModel,
            formArray = service.createFormArray(model),
            index = 3,
            step = -2;

        expect(service.moveFormArrayGroup).toBeDefined();

        (formArray.at(index) as FormGroup).controls["basicArrayGroupInput"].setValue("next test value 1");
        (formArray.at(index + step) as FormGroup).controls["basicArrayGroupInput"].setValue("next test value 2");

        (model.get(index).get(0) as DynamicFormValueControlModel<DynamicFormControlValue>).valueUpdates.next("next test value 1");
        (model.get(index + step).get(0) as DynamicFormValueControlModel<DynamicFormControlValue>).valueUpdates.next("next test value 2");

        service.moveFormArrayGroup(index, step, formArray, model);

        expect(formArray.length).toBe(model.initialCount);

        expect((formArray.at(index) as FormGroup).controls["basicArrayGroupInput"].value).toEqual("next test value 2");
        expect((formArray.at(index + step) as FormGroup).controls["basicArrayGroupInput"].value).toEqual("next test value 1");

        expect((model.get(index).get(0) as DynamicFormValueControlModel<DynamicFormControlValue>).value).toEqual("next test value 2");
        expect((model.get(index + step).get(0) as DynamicFormValueControlModel<DynamicFormControlValue>).value).toEqual("next test value 1");
    });


    it("should throw when form array group is to be moved out of bounds", () => {

        let model = service.findById("testFormArray", testModel) as DynamicFormArrayModel,
            formArray = service.createFormArray(model);

        expect(() => service.moveFormArrayGroup(2, -5, formArray, model))
            .toThrow(new Error(`form array group cannot be moved due to index or new index being out of bounds`));
    });


    it("should remove a form array group correctly", () => {

        let model = service.findById("testFormArray", testModel) as DynamicFormArrayModel,
            formArray = service.createFormArray(model);

        expect(service.removeFormArrayGroup).toBeDefined();

        service.removeFormArrayGroup(0, formArray, model);

        expect(formArray.length).toBe(model.initialCount - 1);
    });


    it("should clear a form array correctly", () => {

        let model = service.findById("testFormArray", testModel) as DynamicFormArrayModel,
            formArray = service.createFormArray(model);

        expect(service.clearFormArray).toBeDefined();

        service.clearFormArray(formArray, model);

        expect(formArray.length).toBe(0);
    });


    it("should resolve validators from config correctly", () => {

        let config: any = {required: null, maxLength: 7, minLength: 3},
            validators = service.getValidators(config);

        expect(validators.length).toBe(Object.keys(config).length);
    });

    it("should resolve custom validators from config correctly", () => {

        let config: any = {required: null, maxLength: 7, testValidator: null},
            validators = service.getValidators(config);

        expect(validators.length).toBe(Object.keys(config).length);
    });

    it("should resolve custom async validators from config correctly", () => {

        let config: any = {required: null, maxLength: 7, testAsyncValidator: null},
            validators = service.getAsyncValidators(config);

        expect(validators.length).toBe(Object.keys(config).length);
    });

    it("should throw when validator is not provided via NG_VALIDATORS", () => {

        expect(() => service.getValidatorFn("test", null))
            .toThrow(new Error(`validator "test" is not provided via NG_VALIDATORS`));
    });

    it("should throw when validator is not provided via NG_ASYNC_VALIDATORS", () => {

        expect(() => service.getAsyncValidatorFn("test", null))
            .toThrow(new Error(`async validator "test" is not provided via NG_ASYNC_VALIDATORS`));
    });
});