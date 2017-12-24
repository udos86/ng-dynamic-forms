import { TestBed, async, inject, ComponentFixture } from "@angular/core/testing";
import { DebugElement, SimpleChange } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { TimepickerModule } from "ngx-bootstrap/timepicker";
import { TextMaskModule } from "angular2-text-mask";
import {
    DynamicFormsCoreModule,
    DynamicFormService,
    DynamicCheckboxModel,
    DynamicCheckboxGroupModel,
    DynamicColorPickerModel,
    DynamicDatePickerModel,
    DynamicEditorModel,
    DynamicFileUploadModel,
    DynamicFormArrayModel,
    DynamicFormControlModel,
    DynamicFormGroupModel,
    DynamicInputModel,
    DynamicRadioGroupModel,
    DynamicRatingModel,
    DynamicSelectModel,
    DynamicSliderModel,
    DynamicSwitchModel,
    DynamicTextAreaModel,
    DynamicTimePickerModel
} from "@ng-dynamic-forms/core";
import {
    BootstrapFormControlType,
    DynamicBootstrapFormControlComponent
} from "./dynamic-bootstrap-form-control.component";

describe("DynamicFormBootstrapComponent test suite", () => {

    let formModel = [
            new DynamicCheckboxModel({id: "checkbox"}),
            new DynamicCheckboxGroupModel({id: "checkboxGroup", group: []}),
            new DynamicColorPickerModel({id: "colorpicker"}),
            new DynamicDatePickerModel({id: "datepicker"}),
            new DynamicEditorModel({id: "editor"}),
            new DynamicFileUploadModel({id: "upload", url: ""}),
            new DynamicFormArrayModel({id: "formArray", groupFactory: () => []}),
            new DynamicFormGroupModel({id: "formGroup", group: []}),
            new DynamicInputModel({id: "input", maxLength: 51}),
            new DynamicRadioGroupModel({id: "radioGroup"}),
            new DynamicRatingModel({id: "rating"}),
            new DynamicSelectModel({id: "select", options: [{value: "One"}, {value: "Two"}], value: "One"}),
            new DynamicSliderModel({id: "slider"}),
            new DynamicSwitchModel({id: "switch"}),
            new DynamicTextAreaModel({id: "textarea"}),
            new DynamicTimePickerModel({id: "timepicker"})
        ],
        testModel = formModel[8],
        formGroup: FormGroup,
        fixture: ComponentFixture<DynamicBootstrapFormControlComponent>,
        component: DynamicBootstrapFormControlComponent,
        debugElement: DebugElement,
        testElement: DebugElement;

    beforeEach(async(() => {

        TestBed.configureTestingModule({

            imports: [
                ReactiveFormsModule,
                DynamicFormsCoreModule.forRoot(),
                TextMaskModule,
                BsDatepickerModule.forRoot(),
                TimepickerModule.forRoot()
            ],
            declarations: [DynamicBootstrapFormControlComponent]

        }).compileComponents().then(() => {

            fixture = TestBed.createComponent(DynamicBootstrapFormControlComponent);

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
        expect(component.onBlur).toBeDefined();
        expect(component.onFocus).toBeDefined();

        expect(component.isValid).toBe(true);
        expect(component.isInvalid).toBe(false);
        expect(component.showErrorMessages).toBe(false);

        expect(component.type).toEqual(BootstrapFormControlType.Input);
    });

    it("should have an input element", () => {

        expect(testElement instanceof DebugElement).toBe(true);
    });

    it("should listen to native blur events", () => {

        spyOn(component, "onBlur");

        testElement.triggerEventHandler("blur", null);

        expect(component.onBlur).toHaveBeenCalled();
    });

    it("should listen to native focus events", () => {

        spyOn(component, "onFocus");

        testElement.triggerEventHandler("focus", null);

        expect(component.onFocus).toHaveBeenCalled();
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

        (testModel as DynamicInputModel).valueUpdates.next("test");

        expect(component.onModelValueUpdates).toHaveBeenCalled();
    });

    it("should update control activation when model disabled property changes", () => {

        spyOn(component, "onModelDisabledUpdates");

        testModel.disabledUpdates.next(true);

        expect(component.onModelDisabledUpdates).toHaveBeenCalled();
    });

    it("should determine correct form control type", () => {

        let testFn = DynamicBootstrapFormControlComponent.getFormControlType;

        expect(testFn(formModel[0])).toEqual(BootstrapFormControlType.Checkbox);

        expect(testFn(formModel[1])).toEqual(BootstrapFormControlType.Group);

        expect(testFn(formModel[2])).toBeNull();

        expect(testFn(formModel[3])).toEqual(BootstrapFormControlType.DatePicker);

        expect(testFn(formModel[4])).toBeNull();

        expect(testFn(formModel[5])).toBeNull();

        expect(testFn(formModel[6])).toEqual(BootstrapFormControlType.Array);

        expect(testFn(formModel[7])).toEqual(BootstrapFormControlType.Group);

        expect(testFn(formModel[8])).toEqual(BootstrapFormControlType.Input);

        expect(testFn(formModel[9])).toEqual(BootstrapFormControlType.RadioGroup);

        expect(testFn(formModel[10])).toBeNull();

        expect(testFn(formModel[11])).toEqual(BootstrapFormControlType.Select);

        expect(testFn(formModel[12])).toBeNull();

        expect(testFn(formModel[13])).toBeNull();

        expect(testFn(formModel[14])).toEqual(BootstrapFormControlType.TextArea);

        expect(testFn(formModel[15])).toEqual(BootstrapFormControlType.TimePicker);
    });
});