import {TestBed, inject} from "@angular/core/testing";
import {ReactiveFormsModule, FormGroup, FormControl, FormArray} from "@angular/forms";
import {DynamicFormService} from "./dynamic-form.service";
import {DynamicCheckboxModel} from "../model/checkbox/dynamic-checkbox.model";
import {DynamicCheckboxGroupModel} from "../model/checkbox/dynamic-checkbox-group.model";
import {DynamicFormArrayModel} from "../model/form-array/dynamic-form-array.model";
import {DynamicFormControlModel} from "../model/dynamic-form-control.model";
import {DynamicInputModel} from "../model/input/dynamic-input.model";
import {DynamicRadioGroupModel} from "../model/radio/dynamic-radio-group.model";
import {DynamicSelectModel} from "../model/select/dynamic-select.model";
import {DynamicTextAreaModel} from "../model/textarea/dynamic-textarea.model";
import {DynamicFormGroupModel} from "../model/form-group/dynamic-form-group.model";
import {group} from "@angular/core";

describe("DynamicFormService test suite", () => {

    let testModel,
        service;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            providers: [DynamicFormService]
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

            new DynamicFormGroupModel({id: "testFormGroup", group: []})
        ];
    });

    beforeEach(inject([DynamicFormService], dynamicFormService => service = dynamicFormService));


    it("tests if service is initialized correctly", () => {

        expect(service).toBeDefined();
    });


    it("tests if createFormGroup works correctly", () => {

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


    it("tests if fromJSON works correctly", () => {

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
    });


    it("should throw when unknown DynamicFormControlModel id is specified in JSON", () => {

        expect(function () {
            service.fromJSON([{}]);
        }).toThrow(new Error(`unknown form control type defined on JSON object`));
    });


    it("tests if findById works correctly", () => {

        expect(service.findById).toBeDefined();
        expect(service.findById("testCheckbox", testModel) instanceof DynamicFormControlModel).toBe(true);
        expect(service.findById("testCheckboxGroup", testModel) instanceof DynamicFormControlModel).toBe(true);
        expect(service.findById("testFormArray", testModel) instanceof DynamicFormControlModel).toBe(true);
        expect(service.findById("testInput", testModel) instanceof DynamicFormControlModel).toBe(true);
        expect(service.findById("testRadioGroup", testModel) instanceof DynamicFormControlModel).toBe(true);
        expect(service.findById("testSelect", testModel) instanceof DynamicFormControlModel).toBe(true);
        expect(service.findById("testTextArea", testModel) instanceof DynamicFormControlModel).toBe(true);
    });


    it("tests if createFormArray works correctly", () => {

        let model = service.findById("testFormArray", testModel),
            formArray;

        expect(service.createFormArray).toBeDefined();

        formArray = service.createFormArray(model);

        expect(formArray instanceof FormArray).toBe(true);
        expect(formArray.length).toBe(model.initialCount);
    });


    it("tests if createFormArrayGroup works correctly", () => {

        let model = service.findById("testFormArray", testModel);

        expect(service.createFormArrayGroup).toBeDefined();
        expect(service.createFormArrayGroup(model) instanceof FormGroup).toBe(true);
    });


    it("tests if addFormArrayGroup works correctly", () => {

        let model = service.findById("testFormArray", testModel),
            formArray = service.createFormArray(model);

        expect(service.addFormArrayGroup).toBeDefined();

        service.addFormArrayGroup(formArray, model);

        expect(formArray.length).toBe(model.initialCount + 1);
    });


    it("tests if insertFormArrayGroup work correctly", () => {

        let model = service.findById("testFormArray", testModel),
            formArray = service.createFormArray(model);

        expect(service.insertFormArrayGroup).toBeDefined();

        service.insertFormArrayGroup(0, formArray, model);

        expect(formArray.length).toBe(model.initialCount + 1);
    });


    it("tests if removeFormArrayGroup work correctly", () => {

        let model = service.findById("testFormArray", testModel),
            formArray = service.createFormArray(model);

        expect(service.removeFormArrayGroup).toBeDefined();

        service.removeFormArrayGroup(0, formArray, model);

        expect(formArray.length).toBe(model.initialCount - 1);
    });

    it("tests if clearFormArray work correctly", () => {

        let model = service.findById("testFormArray", testModel),
            formArray = service.createFormArray(model);

        expect(service.clearFormArray).toBeDefined();

        service.clearFormArray(formArray, model);

        expect(formArray.length).toBe(0);
    });

});