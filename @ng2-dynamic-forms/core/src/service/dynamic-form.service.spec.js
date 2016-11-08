"use strict";
var testing_1 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var dynamic_form_service_1 = require("./dynamic-form.service");
var dynamic_checkbox_model_1 = require("../model/checkbox/dynamic-checkbox.model");
var dynamic_checkbox_group_model_1 = require("../model/checkbox/dynamic-checkbox-group.model");
var dynamic_form_array_model_1 = require("../model/form-array/dynamic-form-array.model");
var dynamic_form_control_model_1 = require("../model/dynamic-form-control.model");
var dynamic_input_model_1 = require("../model/input/dynamic-input.model");
var dynamic_radio_group_model_1 = require("../model/radio/dynamic-radio-group.model");
var dynamic_select_model_1 = require("../model/select/dynamic-select.model");
var dynamic_textarea_model_1 = require("../model/textarea/dynamic-textarea.model");
describe("DynamicFormService test suite", function () {
    var testModel;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [forms_1.ReactiveFormsModule],
            providers: [dynamic_form_service_1.DynamicFormService]
        });
        testModel = [
            new dynamic_select_model_1.DynamicSelectModel({
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
            }),
            new dynamic_input_model_1.DynamicInputModel({ id: "testInput", }),
            new dynamic_checkbox_group_model_1.DynamicCheckboxGroupModel({
                id: "testCheckboxGroup",
                group: [
                    new dynamic_checkbox_model_1.DynamicCheckboxModel({
                        id: "testCheckboxGroup1",
                        value: true
                    }),
                    new dynamic_checkbox_model_1.DynamicCheckboxModel({
                        id: "testCheckboxGroup2",
                        value: true
                    })
                ]
            }),
            new dynamic_radio_group_model_1.DynamicRadioGroupModel({
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
            }),
            new dynamic_textarea_model_1.DynamicTextAreaModel({ id: "testTextArea" }),
            new dynamic_checkbox_model_1.DynamicCheckboxModel({ id: "testCheckbox" }),
            new dynamic_form_array_model_1.DynamicFormArrayModel({
                id: "testFormArray",
                initialCount: 5,
                createGroup: function () {
                    return [
                        new dynamic_input_model_1.DynamicInputModel({ id: "basicArrayGroupInput" })
                    ];
                }
            })
        ];
    });
    it("tests if service is initialized correctly", testing_1.inject([dynamic_form_service_1.DynamicFormService], function (service) {
        expect(service).toBeDefined();
    }));
    it("tests if createFormGroup works correctly", testing_1.inject([dynamic_form_service_1.DynamicFormService], function (service) {
        expect(service.createFormGroup).toBeDefined();
        var result = service.createFormGroup(testModel);
        expect(result instanceof forms_1.FormGroup).toBe(true);
        expect(result.get("testCheckbox") instanceof forms_1.FormControl).toBe(true);
        expect(result.get("testCheckboxGroup") instanceof forms_1.FormGroup).toBe(true);
        expect(result.get("testFormArray") instanceof forms_1.FormArray).toBe(true);
        expect(result.get("testInput") instanceof forms_1.FormControl).toBe(true);
        expect(result.get("testRadioGroup") instanceof forms_1.FormControl).toBe(true);
        expect(result.get("testSelect") instanceof forms_1.FormControl).toBe(true);
        expect(result.get("testTextArea") instanceof forms_1.FormControl).toBe(true);
    }));
    it("tests if fromJSON works correctly", testing_1.inject([dynamic_form_service_1.DynamicFormService], function (service) {
        var json = JSON.parse(JSON.stringify(testModel)), formModel;
        expect(service.fromJSON).toBeDefined();
        formModel = service.fromJSON(json);
        expect(Array.isArray(formModel)).toBe(true);
        expect(formModel[0] instanceof dynamic_select_model_1.DynamicSelectModel).toBe(true);
        expect(formModel[1] instanceof dynamic_input_model_1.DynamicInputModel).toBe(true);
        expect(formModel[2] instanceof dynamic_checkbox_group_model_1.DynamicCheckboxGroupModel).toBe(true);
        expect(formModel[2]["group"].length).toBe(testModel[2].group.length);
        expect(formModel[3] instanceof dynamic_radio_group_model_1.DynamicRadioGroupModel).toBe(true);
        expect(formModel[4] instanceof dynamic_textarea_model_1.DynamicTextAreaModel).toBe(true);
        expect(formModel[5] instanceof dynamic_checkbox_model_1.DynamicCheckboxModel).toBe(true);
        expect(formModel[6] instanceof dynamic_form_array_model_1.DynamicFormArrayModel).toBe(true);
    }));
    it("tests if findById works correctly", testing_1.inject([dynamic_form_service_1.DynamicFormService], function (service) {
        expect(service.findById).toBeDefined();
        expect(service.findById("testCheckbox", testModel) instanceof dynamic_form_control_model_1.DynamicFormControlModel).toBe(true);
        expect(service.findById("testCheckboxGroup", testModel) instanceof dynamic_form_control_model_1.DynamicFormControlModel).toBe(true);
        expect(service.findById("testFormArray", testModel) instanceof dynamic_form_control_model_1.DynamicFormControlModel).toBe(true);
        expect(service.findById("testInput", testModel) instanceof dynamic_form_control_model_1.DynamicFormControlModel).toBe(true);
        expect(service.findById("testRadioGroup", testModel) instanceof dynamic_form_control_model_1.DynamicFormControlModel).toBe(true);
        expect(service.findById("testSelect", testModel) instanceof dynamic_form_control_model_1.DynamicFormControlModel).toBe(true);
        expect(service.findById("testTextArea", testModel) instanceof dynamic_form_control_model_1.DynamicFormControlModel).toBe(true);
    }));
    it("tests if createFormArray works correctly", testing_1.inject([dynamic_form_service_1.DynamicFormService], function (service) {
        var model = service.findById("testFormArray", testModel), formArray;
        expect(service.createFormArray).toBeDefined();
        formArray = service.createFormArray(model);
        expect(formArray instanceof forms_1.FormArray).toBe(true);
        expect(formArray.length).toBe(model.initialCount);
    }));
    it("tests if createFormArrayGroup works correctly", testing_1.inject([dynamic_form_service_1.DynamicFormService], function (service) {
        var model = service.findById("testFormArray", testModel);
        expect(service.createFormArrayGroup).toBeDefined();
        expect(service.createFormArrayGroup(model) instanceof forms_1.FormGroup).toBe(true);
    }));
    it("tests if addFormArrayGroup works correctly", testing_1.inject([dynamic_form_service_1.DynamicFormService], function (service) {
        var model = service.findById("testFormArray", testModel), formArray = service.createFormArray(model);
        expect(service.addFormArrayGroup).toBeDefined();
        service.addFormArrayGroup(formArray, model);
        expect(formArray.length).toBe(model.initialCount + 1);
    }));
    it("tests if insertFormArrayGroup work correctly", testing_1.inject([dynamic_form_service_1.DynamicFormService], function (service) {
        var model = service.findById("testFormArray", testModel), formArray = service.createFormArray(model);
        expect(service.insertFormArrayGroup).toBeDefined();
        service.insertFormArrayGroup(0, formArray, model);
        expect(formArray.length).toBe(model.initialCount + 1);
    }));
    it("tests if removeFormArrayGroup work correctly", testing_1.inject([dynamic_form_service_1.DynamicFormService], function (service) {
        var model = service.findById("testFormArray", testModel), formArray = service.createFormArray(model);
        expect(service.removeFormArrayGroup).toBeDefined();
        service.removeFormArrayGroup(0, formArray, model);
        expect(formArray.length).toBe(model.initialCount - 1);
    }));
    it("tests if clearFormArray work correctly", testing_1.inject([dynamic_form_service_1.DynamicFormService], function (service) {
        var model = service.findById("testFormArray", testModel), formArray = service.createFormArray(model);
        expect(service.clearFormArray).toBeDefined();
        service.clearFormArray(formArray, model);
        expect(formArray.length).toBe(0);
    }));
});

//# sourceMappingURL=dynamic-form.service.spec.js.map
