import { TestBed, async, inject, ComponentFixture } from "@angular/core/testing";
import { Type, DebugElement } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { UploadModule } from "@progress/kendo-angular-upload";
import {
    DynamicFormsCoreModule,
    DynamicFormService,
    DynamicCheckboxModel,
    DynamicCheckboxGroupModel,
    DynamicDatePickerModel,
    DynamicEditorModel,
    DynamicFileUploadModel,
    DynamicFormArrayModel,
    DynamicFormControlModel,
    DynamicFormGroupModel,
    DynamicInputModel,
    DynamicRadioGroupModel,
    DynamicSelectModel,
    DynamicSliderModel,
    DynamicSwitchModel,
    DynamicTextAreaModel,
    DynamicTimePickerModel
} from "@ng2-dynamic-forms/core";
import { DynamicFormKendoComponent } from "./dynamic-form-kendo.component";
import { KendoFormControlType } from "./dynamic-form-kendo.const";

describe("DynamicFormKendoComponent test suite", () => {

    let formModel = [
            new DynamicCheckboxModel({id: "checkbox"}),
            new DynamicCheckboxGroupModel({id: "checkboxGroup", group: []}),
            new DynamicDatePickerModel({id: "datepicker"}),
            new DynamicEditorModel({id: "editor"}),
            new DynamicFileUploadModel({id: "upload", url: ""}),
            new DynamicFormArrayModel({id: "formArray", createGroup: () => []}),
            new DynamicFormGroupModel({id: "formGroup", group: []}),
            new DynamicInputModel({id: "input", maxLength: 51}),
            new DynamicRadioGroupModel({id: "radioGroup"}),
            new DynamicSelectModel({id: "select", options: [{value: "One"}, {value: "Two"}], value: "One"}),
            new DynamicSliderModel({id: "slider"}),
            new DynamicSwitchModel({id: "switch"}),
            new DynamicTextAreaModel({id: "textarea"}),
            new DynamicTimePickerModel({id: "timepicker"})
        ],
        testModel = formModel[9] as DynamicSelectModel<string>,
        formGroup: FormGroup,
        fixture: ComponentFixture<DynamicFormKendoComponent>,
        component: DynamicFormKendoComponent,
        debugElement: DebugElement,
        testElement: DebugElement;

    beforeEach(async(() => {

        TestBed.configureTestingModule({

            imports: [
                ReactiveFormsModule,
                DateInputsModule,
                DropDownsModule,
                InputsModule,
                UploadModule,
                DynamicFormsCoreModule.forRoot()
            ],
            declarations: [DynamicFormKendoComponent]

        }).compileComponents().then(() => {

            fixture = TestBed.createComponent(DynamicFormKendoComponent as Type<DynamicFormKendoComponent>);

            component = fixture.componentInstance;
            debugElement = fixture.debugElement;
        });
    }));

    beforeEach(inject([DynamicFormService], (service: DynamicFormService) => {

        formGroup = service.createFormGroup(formModel);

        component.group = formGroup;
        component.model = formModel[9];

        fixture.detectChanges();

        testElement = debugElement.query(By.css(`kendo-dropdownlist`));
    }));

    it("should initialize correctly", () => {

        expect(component.context).toBeNull();
        expect(component.control instanceof FormControl).toBe(true);
        expect(component.group instanceof FormGroup).toBe(true);
        expect(component.model instanceof DynamicFormControlModel).toBe(true);
        expect(component.hasErrorMessaging).toBe(false);

        expect(component.onControlValueChanges).toBeDefined();
        expect(component.onModelDisabledUpdates).toBeDefined();
        expect(component.onModelValueUpdates).toBeDefined();

        expect(component.blur).toBeDefined();
        expect(component.change).toBeDefined();
        expect(component.focus).toBeDefined();

        expect(component.onValueChange).toBeDefined();
        expect(component.onFocusChange).toBeDefined();

        expect(component.isValid).toBe(true);
        expect(component.isInvalid).toBe(false);

        expect(component.type).toBe(KendoFormControlType.DropDownList);
    });

    it("should have correct view child", () => {

        expect(component.kendoDropDownList).toBeDefined();
    });

    it("should listen to focus events", () => {

        spyOn(component, "onFocus");

        testElement.triggerEventHandler("focus", null);

        expect(component.onFocus).toHaveBeenCalled();
    });

    it("should listen to blur events", () => {

        spyOn(component, "onBlur");

        testElement.triggerEventHandler("blur", null);

        expect(component.onBlur).toHaveBeenCalled();
    });

    it("should listen to native change event", () => {

        spyOn(component, "onValueChange");

        testElement.triggerEventHandler("valueChange", null);

        expect(component.onValueChange).toHaveBeenCalled();
    });

    it("should update model value when control value changes", () => {

        spyOn(component, "onControlValueChanges");

        component.ngOnInit();

        component.control.setValue("test");

        expect(component.onControlValueChanges).toHaveBeenCalled();
    });

    it("should update control value when model value changes", () => {

        spyOn(component, "onModelValueUpdates");

        component.ngOnInit();

        testModel.valueUpdates.next("Two");

        expect(component.onModelValueUpdates).toHaveBeenCalled();
    });

    it("should update control activation when model disabled property changes", () => {

        spyOn(component, "onModelDisabledUpdates");

        component.ngOnInit();

        testModel.disabledUpdates.next(true);

        expect(component.onModelDisabledUpdates).toHaveBeenCalled();
    });

    it("should set correct form control type", () => {

        component.model = formModel[0];
        expect(component["getFormControlType"]()).toBe(KendoFormControlType.Checkbox);

        component.model = formModel[1];
        expect(component["getFormControlType"]()).toBe(KendoFormControlType.CheckboxGroup);

        component.model = formModel[2];
        expect(component["getFormControlType"]()).toBe(KendoFormControlType.DatePicker);

        (formModel[2] as DynamicDatePickerModel).inline = true;
        expect(component["getFormControlType"]()).toBe(KendoFormControlType.Calendar);

        component.model = formModel[3];
        expect(component["getFormControlType"]()).toBeNull();

        component.model = formModel[4];
        expect(component["getFormControlType"]()).toBe(KendoFormControlType.Upload);

        component.model = formModel[5];
        expect(component["getFormControlType"]()).toBe(KendoFormControlType.Array);

        component.model = formModel[6];
        expect(component["getFormControlType"]()).toBe(KendoFormControlType.Group);

        component.model = formModel[7];
        expect(component["getFormControlType"]()).toBe(KendoFormControlType.Input);

        (formModel[7] as DynamicInputModel).list = ["one", "two", "three"];
        expect(component["getFormControlType"]()).toBe(KendoFormControlType.AutoComplete);

        (formModel[7] as DynamicInputModel).mask = "0000-0000-0000-0000";
        expect(component["getFormControlType"]()).toBe(KendoFormControlType.MaskedTextBox);

        (formModel[7] as DynamicInputModel).inputType = "date";
        expect(component["getFormControlType"]()).toBe(KendoFormControlType.DateInput);

        (formModel[7] as DynamicInputModel).inputType = "number";
        (formModel[7] as DynamicInputModel).mask = null;
        expect(component["getFormControlType"]()).toBe(KendoFormControlType.NumericTextBox);

        component.model = formModel[8];
        expect(component["getFormControlType"]()).toBe(KendoFormControlType.RadioGroup);

        component.model = formModel[9];
        expect(component["getFormControlType"]()).toBe(KendoFormControlType.DropDownList);

        (formModel[9] as DynamicSelectModel<string>).multiple = true;
        expect(component["getFormControlType"]()).toBe(KendoFormControlType.MultiSelect);

        component.model = formModel[10];
        expect(component["getFormControlType"]()).toBe(KendoFormControlType.Slider);

        component.model = formModel[11];
        expect(component["getFormControlType"]()).toBe(KendoFormControlType.Switch);

        component.model = formModel[12];
        expect(component["getFormControlType"]()).toBe(KendoFormControlType.TextArea);

        component.model = formModel[13];
        expect(component["getFormControlType"]()).toBe(KendoFormControlType.TimePicker);
    });
});