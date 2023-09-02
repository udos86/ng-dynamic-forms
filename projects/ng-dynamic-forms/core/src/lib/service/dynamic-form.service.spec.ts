import { TestBed, inject } from "@angular/core/testing";
import {
    ReactiveFormsModule,
    UntypedFormGroup,
    UntypedFormControl,
    UntypedFormArray,
    NG_VALIDATORS,
    NG_ASYNC_VALIDATORS
} from "@angular/forms";
import { DynamicFormService } from "./dynamic-form.service";
import { DynamicFormComponentService } from "./dynamic-form-component.service";
import { DynamicFormValidationService } from "./dynamic-form-validation.service";
import { DynamicFormModel } from "../model/dynamic-form.model";
import { DynamicCheckboxModel } from "../model/checkbox/dynamic-checkbox.model";
import { DynamicCheckboxGroupModel } from "../model/checkbox/dynamic-checkbox-group.model";
import { DynamicColorPickerModel } from "../model/colorpicker/dynamic-colorpicker.model";
import { DynamicDateControlModel } from "../model/dynamic-date-control.model";
import { DynamicDatePickerModel } from "../model/datepicker/dynamic-datepicker.model";
import { DynamicEditorModel } from "../model/editor/dynamic-editor.model";
import { DynamicFileUploadModel } from "../model/file-upload/dynamic-file-upload.model";
import { DynamicFormArrayModel } from "../model/form-array/dynamic-form-array.model";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { DynamicFormGroupModel } from "../model/form-group/dynamic-form-group.model";
import { DynamicInputModel } from "../model/input/dynamic-input.model";
import { DynamicRatingModel } from "../model/rating/dynamic-rating.model";
import { DynamicRadioGroupModel } from "../model/radio/dynamic-radio-group.model";
import { DynamicSelectModel } from "../model/select/dynamic-select.model";
import { DynamicSliderModel } from "../model/slider/dynamic-slider.model";
import { DynamicSwitchModel } from "../model/switch/dynamic-switch.model";
import { DynamicTextAreaModel } from "../model/textarea/dynamic-textarea.model";
import { DynamicTimePickerModel } from "../model/timepicker/dynamic-timepicker.model";
import { DynamicFormValueControlModel } from "../model/dynamic-form-value-control.model";

describe("DynamicFormService test suite", () => {
    let testModel: DynamicFormModel;
    let service: DynamicFormService;

    function testValidator() {
        return {testValidator: {valid: true}};
    }

    function testAsyncValidator() {
        return new Promise<boolean>(resolve => setTimeout(() => resolve(true), 0));
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            providers: [
                DynamicFormService,
                DynamicFormComponentService,
                DynamicFormValidationService,
                {provide: NG_VALIDATORS, useValue: testValidator, multi: true},
                {provide: NG_ASYNC_VALIDATORS, useValue: testAsyncValidator, multi: true}
            ]
        });

        testModel = [
            new DynamicSelectModel<string>(
                {
                    id: "testSelect",
                    options: [
                        {label: "Option 1", value: "option-1"},
                        {label: "Option 2", value: "option-2"}
                    ],
                    value: "option-3"
                }
            ),
            new DynamicInputModel(
                {
                    id: "testInput",
                    mask: "00/00/00"
                }
            ),
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
                        {label: "Option 1", value: "option-1"},
                        {label: "Option 2", value: "option-2"}
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
                    groupFactory: () => {
                        return [
                            new DynamicInputModel({id: "testFormArrayGroupInput"}),
                            new DynamicFormArrayModel({
                                id: "testNestedFormArray",
                                initialCount: 3,
                                groupFactory: () => [
                                    new DynamicInputModel({id: "testNestedFormArrayGroupInput"})
                                ]
                            })
                        ];
                    }
                }
            ),
            new DynamicFormGroupModel(
                {
                    id: "testFormGroup",
                    group: [
                        new DynamicInputModel({id: "nestedTestInput"}),
                        new DynamicTextAreaModel({id: "nestedTestTextArea"})
                    ]
                }
            ),
            new DynamicSliderModel({id: "testSlider"}),
            new DynamicSwitchModel({id: "testSwitch"}),
            new DynamicDatePickerModel({id: "testDatepicker", value: new Date()}),
            new DynamicFileUploadModel({id: "testFileUpload"}),
            new DynamicEditorModel({id: "testEditor"}),
            new DynamicTimePickerModel({id: "testTimePicker"}),
            new DynamicRatingModel({id: "testRating"}),
            new DynamicColorPickerModel({id: "testColorPicker"})
        ];
    });


    beforeEach(inject([DynamicFormService], (formService: DynamicFormService) => service = formService));


    it("should create create a form group", () => {
        const formGroup = service.createFormGroup(testModel);

        expect(formGroup instanceof UntypedFormGroup).toBe(true);

        expect(formGroup.get("testCheckbox") instanceof UntypedFormControl).toBe(true);
        expect(formGroup.get("testCheckboxGroup") instanceof UntypedFormGroup).toBe(true);
        expect(formGroup.get("testDatepicker") instanceof UntypedFormControl).toBe(true);
        expect(formGroup.get("testFormArray") instanceof UntypedFormArray).toBe(true);
        expect(formGroup.get("testInput") instanceof UntypedFormControl).toBe(true);
        expect(formGroup.get("testRadioGroup") instanceof UntypedFormControl).toBe(true);
        expect(formGroup.get("testSelect") instanceof UntypedFormControl).toBe(true);
        expect(formGroup.get("testTextArea") instanceof UntypedFormControl).toBe(true);
        expect(formGroup.get("testFileUpload") instanceof UntypedFormControl).toBe(true);
        expect(formGroup.get("testEditor") instanceof UntypedFormControl).toBe(true);
        expect(formGroup.get("testTimePicker") instanceof UntypedFormControl).toBe(true);
        expect(formGroup.get("testRating") instanceof UntypedFormControl).toBe(true);
        expect(formGroup.get("testColorPicker") instanceof UntypedFormControl).toBe(true);
    });


    it("should parse dynamic form JSON", () => {
        const json = JSON.stringify(testModel);
        const formModel = service.fromJSON(json);

        expect(Array.isArray(formModel) as boolean).toBe(true);

        expect(formModel[0] instanceof DynamicSelectModel).toBe(true);
        expect(formModel[1] instanceof DynamicInputModel).toBe(true);
        expect(formModel[2] instanceof DynamicCheckboxGroupModel).toBe(true);
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
        expect(formModel[12] instanceof DynamicEditorModel).toBe(true);
        expect(formModel[13] instanceof DynamicTimePickerModel).toBe(true);
        expect(formModel[14] instanceof DynamicRatingModel).toBe(true);
        expect(formModel[15] instanceof DynamicColorPickerModel).toBe(true);
    });


    it("should throw when unknown DynamicFormControlModel id is specified in JSON", () => {
        expect(() => service.fromJSON([{id: "test"}]))
            .toThrow(new Error(`unknown form control model type defined on JSON object with id "test"`));
    });


    it("should find a dynamic form control model by id", () => {
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
        expect(service.findById("testEditor", testModel) instanceof DynamicEditorModel).toBe(true);
        expect(service.findById("testTimePicker", testModel) instanceof DynamicTimePickerModel).toBe(true);
        expect(service.findById("testRating", testModel) instanceof DynamicRatingModel).toBe(true);
        expect(service.findById("testColorPicker", testModel) instanceof DynamicColorPickerModel).toBe(true);
    });


    it("should find a nested dynamic form control model by id", () => {
        expect(service.findById("testCheckboxGroup1", testModel) instanceof DynamicFormControlModel).toBe(true);
        expect(service.findById("testCheckboxGroup2", testModel) instanceof DynamicFormControlModel).toBe(true);
        expect(service.findById("nestedTestInput", testModel) instanceof DynamicFormControlModel).toBe(true);
    });

    it("should find a dynamic form control model by path", () => {
      expect(service.findByPath("testCheckbox", testModel) instanceof DynamicFormControlModel).toBe(true);
      expect(service.findByPath("testCheckboxGroup", testModel) instanceof DynamicFormControlModel).toBe(true);
      expect(service.findByPath("testDatepicker", testModel) instanceof DynamicFormControlModel).toBe(true);
      expect(service.findByPath("testFormArray", testModel) instanceof DynamicFormControlModel).toBe(true);
      expect(service.findByPath("testInput", testModel) instanceof DynamicFormControlModel).toBe(true);
      expect(service.findByPath("testRadioGroup", testModel) instanceof DynamicFormControlModel).toBe(true);
      expect(service.findByPath("testSelect", testModel) instanceof DynamicFormControlModel).toBe(true);
      expect(service.findByPath("testSlider", testModel) instanceof DynamicFormControlModel).toBe(true);
      expect(service.findByPath("testSwitch", testModel) instanceof DynamicFormControlModel).toBe(true);
      expect(service.findByPath("testTextArea", testModel) instanceof DynamicFormControlModel).toBe(true);
      expect(service.findByPath("testFileUpload", testModel) instanceof DynamicFormControlModel).toBe(true);
      expect(service.findByPath("testEditor", testModel) instanceof DynamicEditorModel).toBe(true);
      expect(service.findById("testTimePicker", testModel) instanceof DynamicTimePickerModel).toBe(true);
      expect(service.findByPath("testRating", testModel) instanceof DynamicRatingModel ).toBe(true);
      expect(service.findByPath("testColorPicker", testModel) instanceof DynamicColorPickerModel).toBe(true);
      expect(service.findByPath("testFormGroup.nestedTestInput", testModel) instanceof DynamicInputModel).toBe(true);
      expect(service.findByPath("testFormGroup.nestedTestTextArea",testModel) instanceof DynamicTextAreaModel).toBe(true);
      expect(service.findByPath("testFormArray.0.testFormArrayGroupInput",testModel) instanceof DynamicInputModel).toBe(true);
      expect(service.findByPath("testFormArray.1.testFormArrayGroupInput",testModel) instanceof DynamicInputModel).toBe(true);
      expect(service.findByPath("testFormArray.0.testNestedFormArray.0.testNestedFormArrayGroupInput",testModel) instanceof DynamicInputModel).toBe(true);
      expect(service.findByPath("testFormArray.1.testNestedFormArray.1.testNestedFormArrayGroupInput",testModel) instanceof DynamicInputModel).toBe(true);
    });


    it("should resolve array group path", () => {
        service.createFormGroup(testModel);

        const model = service.findById("testFormArray", testModel) as DynamicFormArrayModel;
        const nestedModel = (model.get(0).get(1) as DynamicFormArrayModel).get(0);

        expect(service.getPath(model)).toEqual(["testFormArray"]);
        expect(service.getPath(nestedModel)).toEqual(["testFormArray", "0", "testNestedFormArray", "0"]);
    });


    it("should add a form control to an existing form group", () => {
        const formGroup = service.createFormGroup(testModel);
        const nestedFormGroup = formGroup.controls["testFormGroup"] as UntypedFormGroup;
        const nestedFormGroupModel = testModel[7] as DynamicFormGroupModel;
        const newModel1 = new DynamicInputModel({id: "newInput1"});
        const newModel2 = new DynamicInputModel({id: "newInput2"});

        service.addFormGroupControl(formGroup, testModel, newModel1);
        service.addFormGroupControl(nestedFormGroup, nestedFormGroupModel, newModel2);

        expect(formGroup.controls[newModel1.id]).toBeTruthy();
        expect(testModel[testModel.length - 1] === newModel1).toBe(true);

        expect((formGroup.controls["testFormGroup"] as UntypedFormGroup).controls[newModel2.id]).toBeTruthy();
        expect(nestedFormGroupModel.get(nestedFormGroupModel.group.length - 1) === newModel2).toBe(true);
    });


    it("should insert a form control to an existing form group", () => {
        const formGroup = service.createFormGroup(testModel);
        const nestedFormGroup = formGroup.controls["testFormGroup"] as UntypedFormGroup;
        const nestedFormGroupModel = testModel[7] as DynamicFormGroupModel;
        const newModel1 = new DynamicInputModel({id: "newInput1"});
        const newModel2 = new DynamicInputModel({id: "newInput2"});

        service.insertFormGroupControl(4, formGroup, testModel, newModel1);
        service.insertFormGroupControl(0, nestedFormGroup, nestedFormGroupModel, newModel2);

        expect(formGroup.controls[newModel1.id]).toBeTruthy();
        expect(testModel[4] === newModel1).toBe(true);
        expect(service.getPath(testModel[4])).toEqual(["newInput1"]);

        expect((formGroup.controls["testFormGroup"] as UntypedFormGroup).controls[newModel2.id]).toBeTruthy();
        expect(nestedFormGroupModel.get(0) === newModel2).toBe(true);
        expect(service.getPath(nestedFormGroupModel.get(0))).toEqual(["testFormGroup", "newInput2"]);
    });


    it("should move an existing form control to a different group position", () => {
        const formGroup = service.createFormGroup(testModel);
        const nestedFormGroupModel = testModel[7] as DynamicFormGroupModel;
        const model1 = testModel[0];
        const model2 = nestedFormGroupModel.get(0);

        service.moveFormGroupControl(0, 2, testModel);

        expect(formGroup.controls[model1.id]).toBeTruthy();
        expect(testModel[2] === model1).toBe(true);

        service.moveFormGroupControl(0, 1, nestedFormGroupModel);

        expect((formGroup.controls["testFormGroup"] as UntypedFormGroup).controls[model2.id]).toBeTruthy();
        expect(nestedFormGroupModel.get(1) === model2).toBe(true);
    });


    it("should remove a form control from an existing form group", () => {
        const formGroup = service.createFormGroup(testModel);
        const nestedFormGroup = formGroup.controls["testFormGroup"] as UntypedFormGroup;
        const nestedFormGroupModel = testModel[7] as DynamicFormGroupModel;
        const length = testModel.length;
        const size = nestedFormGroupModel.size();
        const index = 1;
        const id1 = testModel[index].id;
        const id2 = nestedFormGroupModel.get(index).id;

        service.removeFormGroupControl(index, formGroup, testModel);

        expect(Object.keys(formGroup.controls).length).toBe(length - 1);
        expect(formGroup.controls[id1]).toBeUndefined();

        expect(testModel.length).toBe(length - 1);
        expect(service.findById(id1, testModel)).toBeNull();

        service.removeFormGroupControl(index, nestedFormGroup, nestedFormGroupModel);

        expect(Object.keys(nestedFormGroup.controls).length).toBe(size - 1);
        expect(nestedFormGroup.controls[id2]).toBeUndefined();

        expect(nestedFormGroupModel.size()).toBe(size - 1);
        expect(service.findById(id2, testModel)).toBeNull();
    });


    it("should create a form array", () => {
        const model = service.findById("testFormArray", testModel) as DynamicFormArrayModel;
        let formArray;

        expect(service.createFormArray).toBeTruthy();

        formArray = service.createFormArray(model);

        expect(formArray instanceof UntypedFormArray).toBe(true);
        expect(formArray.length).toBe(model.initialCount);
    });


    it("should add a form array group", () => {
        const model = service.findById("testFormArray", testModel) as DynamicFormArrayModel;
        const formArray = service.createFormArray(model);

        service.addFormArrayGroup(formArray, model);

        expect(formArray.length).toBe(model.initialCount + 1);
    });


    it("should insert a form array group", () => {
        const model = service.findById("testFormArray", testModel) as DynamicFormArrayModel;
        const formArray = service.createFormArray(model);

        service.insertFormArrayGroup(0, formArray, model);

        expect(formArray.length).toBe(model.initialCount + 1);
    });


    it("should move up a form array group", () => {
        const model = service.findById("testFormArray", testModel) as DynamicFormArrayModel;
        const formArray = service.createFormArray(model);
        const index = 3;
        const step = 1;

        (formArray.at(index) as UntypedFormGroup).controls["testFormArrayGroupInput"].setValue("next test value 1");
        (formArray.at(index + step) as UntypedFormGroup).controls["testFormArrayGroupInput"].setValue("next test value 2");

        (model.get(index).get(0) as DynamicFormValueControlModel<any>).value = "next test value 1";
        (model.get(index + step).get(0) as DynamicFormValueControlModel<any>).value = "next test value 2";

        service.moveFormArrayGroup(index, step, formArray, model);

        expect(formArray.length).toBe(model.initialCount);

        expect((formArray.at(index) as UntypedFormGroup).controls["testFormArrayGroupInput"].value).toEqual("next test value 2");
        expect((formArray.at(index + step) as UntypedFormGroup).controls["testFormArrayGroupInput"].value).toEqual("next test value 1");

        expect((model.get(index).get(0) as DynamicFormValueControlModel<any>).value).toEqual("next test value 2");
        expect((model.get(index + step).get(0) as DynamicFormValueControlModel<any>).value).toEqual("next test value 1");
    });


    it("should move down a form array group", () => {
        const model = service.findById("testFormArray", testModel) as DynamicFormArrayModel;
        const formArray = service.createFormArray(model);
        const index = 3;
        const step = -1;

        (formArray.at(index) as UntypedFormGroup).controls["testFormArrayGroupInput"].setValue("next test value 1");
        (formArray.at(index + step) as UntypedFormGroup).controls["testFormArrayGroupInput"].setValue("next test value 2");

        (model.get(index).get(0) as DynamicFormValueControlModel<any>).value = "next test value 1";
        (model.get(index + step).get(0) as DynamicFormValueControlModel<any>).value = "next test value 2";

        service.moveFormArrayGroup(index, step, formArray, model);

        expect(formArray.length).toBe(model.initialCount);

        expect((formArray.at(index) as UntypedFormGroup).controls["testFormArrayGroupInput"].value).toEqual("next test value 2");
        expect((formArray.at(index + step) as UntypedFormGroup).controls["testFormArrayGroupInput"].value).toEqual("next test value 1");

        expect((model.get(index).get(0) as DynamicFormValueControlModel<any>).value).toEqual("next test value 2");
        expect((model.get(index + step).get(0) as DynamicFormValueControlModel<any>).value).toEqual("next test value 1");
    });


    it("should throw when form array group is to be moved out of bounds", () => {
        const model = service.findById("testFormArray", testModel) as DynamicFormArrayModel;
        const formArray = service.createFormArray(model);

        expect(() => service.moveFormArrayGroup(2, -5, formArray, model))
            .toThrow(new Error(`form array group cannot be moved due to index or new index being out of bounds`));
    });


    it("should remove a form array group", () => {
        const model = service.findById("testFormArray", testModel) as DynamicFormArrayModel;
        const formArray = service.createFormArray(model);

        service.removeFormArrayGroup(0, formArray, model);

        const newCount = model.initialCount - 1;

        expect(model.size).toBe(newCount);
        expect(formArray.length).toBe(newCount);
    });


    it("should clear a form array", () => {
        const model = service.findById("testFormArray", testModel) as DynamicFormArrayModel;
        const formArray = service.createFormArray(model);

        service.clearFormArray(formArray, model);

        expect(model.size === 0).toBe(true);
        expect(formArray.length === 0).toBe(true);
    });
});
