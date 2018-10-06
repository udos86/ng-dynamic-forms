import { TestBed, async, inject, ComponentFixture } from "@angular/core/testing";
import { DebugElement, SimpleChange } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
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
    bootstrapUIFormControlMapFn,
    DynamicBootstrapFormControlContainerComponent
} from "./dynamic-bootstrap-form-control-container.component";
import { DynamicBootstrapCheckboxComponent } from "./checkbox/dynamic-bootstrap-checkbox.component";
import { DynamicBootstrapDatePickerComponent } from "./datepicker/dynamic-bootstrap-datepicker.component";
import { DynamicBootstrapFormArrayComponent } from "./form-array/dynamic-bootstrap-form-array.component";
import { DynamicBootstrapFormGroupComponent } from "./form-group/dynamic-bootstrap-form-group.component";
import { DynamicBootstrapInputComponent } from "./input/dynamic-bootstrap-input.component";
import { DynamicBootstrapRadioGroupComponent } from "./radio-group/dynamic-bootstrap-radio-group.component";
import { DynamicBootstrapSelectComponent } from "./select/dynamic-bootstrap-select.component";
import { DynamicBootstrapTextAreaComponent } from "./textarea/dynamic-bootstrap-textarea.component";
import { DynamicBootstrapTimePickerComponent } from "./timepicker/dynamic-bootstrap-timepicker.component";

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
        fixture: ComponentFixture<DynamicBootstrapFormControlContainerComponent>,
        component: DynamicBootstrapFormControlContainerComponent,
        debugElement: DebugElement,
        testElement: DebugElement;

    beforeEach(async(() => {

        TestBed.overrideModule(BrowserDynamicTestingModule, {

            set: {
                entryComponents: [DynamicBootstrapInputComponent]
            }
        });

        TestBed.configureTestingModule({

            imports: [
                ReactiveFormsModule,
                DynamicFormsCoreModule,
                TextMaskModule,
                BsDatepickerModule.forRoot(),
                TimepickerModule.forRoot()
            ],
            declarations: [DynamicBootstrapFormControlContainerComponent, DynamicBootstrapInputComponent]

        }).compileComponents().then(() => {

            fixture = TestBed.createComponent(DynamicBootstrapFormControlContainerComponent);

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

        expect(component.asBootstrapFormGroup).toBe(true);
        expect(component.context).toBeNull();
        expect(component.control instanceof FormControl).toBe(true);
        expect(component.group instanceof FormGroup).toBe(true);
        expect(component.model instanceof DynamicFormControlModel).toBe(true);

        expect(component.blur).toBeDefined();
        expect(component.change).toBeDefined();
        expect(component.focus).toBeDefined();

        expect(component.componentType).toBe(DynamicBootstrapInputComponent);
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

        spyOn(component, "onChange");

        testElement.triggerEventHandler("change", null);

        expect(component.onChange).toHaveBeenCalled();
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

    it("should map a form control model to a form control component", () => {

        expect(bootstrapUIFormControlMapFn(formModel[0])).toBe(DynamicBootstrapCheckboxComponent);
        expect(bootstrapUIFormControlMapFn(formModel[1])).toBe(DynamicBootstrapFormGroupComponent);
        expect(bootstrapUIFormControlMapFn(formModel[2])).toBeNull();
        expect(bootstrapUIFormControlMapFn(formModel[3])).toBe(DynamicBootstrapDatePickerComponent);
        expect(bootstrapUIFormControlMapFn(formModel[4])).toBeNull();
        expect(bootstrapUIFormControlMapFn(formModel[5])).toBeNull();
        expect(bootstrapUIFormControlMapFn(formModel[6])).toBe(DynamicBootstrapFormArrayComponent);
        expect(bootstrapUIFormControlMapFn(formModel[7])).toBe(DynamicBootstrapFormGroupComponent);
        expect(bootstrapUIFormControlMapFn(formModel[8])).toBe(DynamicBootstrapInputComponent);
        expect(bootstrapUIFormControlMapFn(formModel[9])).toBe(DynamicBootstrapRadioGroupComponent);
        expect(bootstrapUIFormControlMapFn(formModel[10])).toBeNull();
        expect(bootstrapUIFormControlMapFn(formModel[11])).toBe(DynamicBootstrapSelectComponent);
        expect(bootstrapUIFormControlMapFn(formModel[12])).toBeNull();
        expect(bootstrapUIFormControlMapFn(formModel[13])).toBeNull();
        expect(bootstrapUIFormControlMapFn(formModel[14])).toBe(DynamicBootstrapTextAreaComponent);
        expect(bootstrapUIFormControlMapFn(formModel[15])).toBe(DynamicBootstrapTimePickerComponent);
    });
});