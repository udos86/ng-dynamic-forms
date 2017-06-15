import { TestBed, async, inject, ComponentFixture } from "@angular/core/testing";
import { Type, DebugElement } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { NgbDatepickerModule, NgbButtonsModule, NgbTimepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { TextMaskModule } from "angular2-text-mask";
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
import { DynamicFormNGBootstrapComponent, NGBootstrapFormControlType } from "./dynamic-form-ng-bootstrap.component";

describe("DynamicFormNGBootstrapComponent test suite", () => {

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
        testModel = formModel[7] as DynamicInputModel,
        formGroup: FormGroup,
        fixture: ComponentFixture<DynamicFormNGBootstrapComponent>,
        component: DynamicFormNGBootstrapComponent,
        debugElement: DebugElement,
        testElement: DebugElement;

    beforeEach(async(() => {

        TestBed.configureTestingModule({

            imports: [
                ReactiveFormsModule,
                NgbButtonsModule,
                NgbDatepickerModule.forRoot(),
                NgbTimepickerModule.forRoot(),
                TextMaskModule,
                DynamicFormsCoreModule.forRoot()
            ],
            declarations: [DynamicFormNGBootstrapComponent]

        }).compileComponents().then(() => {

            fixture = TestBed.createComponent(DynamicFormNGBootstrapComponent as Type<DynamicFormNGBootstrapComponent>);

            component = fixture.componentInstance;
            debugElement = fixture.debugElement;
        });
    }));

    beforeEach(inject([DynamicFormService], (service: DynamicFormService) => {

        formGroup = service.createFormGroup(formModel);

        component.group = formGroup;
        component.model = testModel;

        fixture.detectChanges();

        testElement = debugElement.query(By.css(`input[id='${testModel.id}']`));
    }));

    it("should initialize correctly", () => {

        expect(component.context).toBeNull();
        expect(component.control instanceof FormControl).toBe(true);
        expect(component.group instanceof FormGroup).toBe(true);
        expect(component.model instanceof DynamicFormControlModel).toBe(true);
        expect(component.hasErrorMessaging).toBe(false);
        expect(component.asBootstrapFormGroup).toBe(true);

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
        expect(component.showErrorMessages).toBe(false);

        expect(component.type).toBe(NGBootstrapFormControlType.Input as string);
    });

    it("should have an input element", () => {

        expect(testElement instanceof DebugElement).toBe(true);
    });

    it("should listen to native focus and blur events", () => {

        spyOn(component, "onFocusChange");

        testElement.triggerEventHandler("focus", null);
        testElement.triggerEventHandler("blur", null);

        expect(component.onFocusChange).toHaveBeenCalledTimes(2);
    });

    it("should listen to native change event", () => {

        spyOn(component, "onValueChange");

        testElement.triggerEventHandler("change", null);

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

        testModel.valueUpdates.next("test");

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
        expect(component["getFormControlType"]()).toEqual(NGBootstrapFormControlType.Checkbox);

        component.model = formModel[1];
        expect(component["getFormControlType"]()).toEqual(NGBootstrapFormControlType.Group);

        component.model = formModel[2];
        expect(component["getFormControlType"]()).toEqual(NGBootstrapFormControlType.DatePicker);

        (formModel[2] as DynamicDatePickerModel).inline = true;
        expect(component["getFormControlType"]()).toEqual(NGBootstrapFormControlType.Calendar);

        component.model = formModel[3];
        expect(component["getFormControlType"]()).toBeNull();

        component.model = formModel[4];
        expect(component["getFormControlType"]()).toBeNull();

        component.model = formModel[5];
        expect(component["getFormControlType"]()).toEqual(NGBootstrapFormControlType.Array);

        component.model = formModel[6];
        expect(component["getFormControlType"]()).toEqual(NGBootstrapFormControlType.Group);

        component.model = formModel[7];
        expect(component["getFormControlType"]()).toEqual(NGBootstrapFormControlType.Input);

        component.model = formModel[8];
        expect(component["getFormControlType"]()).toEqual(NGBootstrapFormControlType.RadioGroup);

        component.model = formModel[9];
        expect(component["getFormControlType"]()).toEqual(NGBootstrapFormControlType.Select);

        component.model = formModel[10];
        expect(component["getFormControlType"]()).toBeNull();

        component.model = formModel[11];
        expect(component["getFormControlType"]()).toBeNull();

        component.model = formModel[12];
        expect(component["getFormControlType"]()).toEqual(NGBootstrapFormControlType.TextArea);

        component.model = formModel[13];
        expect(component["getFormControlType"]()).toEqual(NGBootstrapFormControlType.TimePicker);
    });
});