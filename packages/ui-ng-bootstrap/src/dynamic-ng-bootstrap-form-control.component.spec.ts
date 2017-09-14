import { TestBed, async, inject, ComponentFixture } from "@angular/core/testing";
import { DebugElement, SimpleChange } from "@angular/core";
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
} from "@ng-dynamic-forms/core";
import {
    DynamicNGBootstrapFormControlComponent,
    NGBootstrapFormControlType
} from "./dynamic-ng-bootstrap-form-control.component";

describe("DynamicFormNGBootstrapComponent test suite", () => {

    let formModel = [
            new DynamicCheckboxModel({id: "checkbox"}),
            new DynamicCheckboxGroupModel({id: "checkboxGroup", group: []}),
            new DynamicDatePickerModel({id: "datepicker"}),
            new DynamicEditorModel({id: "editor"}),
            new DynamicFileUploadModel({id: "upload", url: ""}),
            new DynamicFormArrayModel({id: "formArray", groupFactory: () => []}),
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
        fixture: ComponentFixture<DynamicNGBootstrapFormControlComponent>,
        component: DynamicNGBootstrapFormControlComponent,
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
            declarations: [DynamicNGBootstrapFormControlComponent]

        }).compileComponents().then(() => {

            fixture = TestBed.createComponent(DynamicNGBootstrapFormControlComponent);

            component = fixture.componentInstance;
            debugElement = fixture.debugElement;
        });
    }));

    beforeEach(inject([DynamicFormService], (service: DynamicFormService) => {

        formGroup = service.createFormGroup(formModel);

        component.group = formGroup;
        component.model = testModel;

        component.ngOnChanges({

            group: new SimpleChange(null, component.group, true),
            model: new SimpleChange(null, component.model, true)
        });

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

        expect(component.type).toBe(NGBootstrapFormControlType.Input);
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

        component.control.setValue("test");

        expect(component.onControlValueChanges).toHaveBeenCalled();
    });

    it("should update control value when model value changes", () => {

        spyOn(component, "onModelValueUpdates");

        testModel.valueUpdates.next("test");

        expect(component.onModelValueUpdates).toHaveBeenCalled();
    });

    it("should update control activation when model disabled property changes", () => {

        spyOn(component, "onModelDisabledUpdates");

        testModel.disabledUpdates.next(true);

        expect(component.onModelDisabledUpdates).toHaveBeenCalled();
    });

    it("should determine correct form control type", () => {

        let testFn = DynamicNGBootstrapFormControlComponent.getFormControlType;

        expect(testFn(formModel[0])).toEqual(NGBootstrapFormControlType.Checkbox);

        expect(testFn(formModel[1])).toEqual(NGBootstrapFormControlType.CheckboxGroup);

        expect(testFn(formModel[2])).toEqual(NGBootstrapFormControlType.DatePicker);

        (formModel[2] as DynamicDatePickerModel).inline = true;
        expect(testFn(formModel[2])).toEqual(NGBootstrapFormControlType.Calendar);

        expect(testFn(formModel[3])).toBeNull();

        expect(testFn(formModel[4])).toBeNull();

        expect(testFn(formModel[5])).toEqual(NGBootstrapFormControlType.Array);

        expect(testFn(formModel[6])).toEqual(NGBootstrapFormControlType.Group);

        expect(testFn(formModel[7])).toEqual(NGBootstrapFormControlType.Input);

        expect(testFn(formModel[8])).toEqual(NGBootstrapFormControlType.RadioGroup);

        expect(testFn(formModel[9])).toEqual(NGBootstrapFormControlType.Select);

        expect(testFn(formModel[10])).toBeNull();

        expect(testFn(formModel[11])).toBeNull();

        expect(testFn(formModel[12])).toEqual(NGBootstrapFormControlType.TextArea);

        expect(testFn(formModel[13])).toEqual(NGBootstrapFormControlType.TimePicker);
    });
});