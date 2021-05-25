import { TestBed, inject, ComponentFixture, waitForAsync } from "@angular/core/testing";
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
    DynamicNGxBootstrapFormArrayComponent,
    DynamicNGxBootstrapFormControlContainerComponent,
    DynamicNGxBootstrapFormGroupComponent
} from "./dynamic-ngx-bootstrap-form-control-container.component";
import { DynamicNGxBootstrapCheckboxComponent } from "./checkbox/dynamic-ngx-bootstrap-checkbox.component";
import { DynamicNGxBootstrapCheckboxGroupComponent } from "./checkbox-group/dynamic-ngx-bootstrap-checkbox-group.component";
import { DynamicNGxBootstrapDatePickerComponent } from "./datepicker/dynamic-ngx-bootstrap-datepicker.component";
import { DynamicNGxBootstrapInputComponent } from "./input/dynamic-ngx-bootstrap-input.component";
import { DynamicNGxBootstrapRadioGroupComponent } from "./radio-group/dynamic-ngx-bootstrap-radio-group.component";
import { DynamicNGxBootstrapRatingComponent } from "./rating/dynamic-ngx-bootstrap-rating.component";
import { DynamicNGxBootstrapSelectComponent } from "./select/dynamic-ngx-bootstrap-select.component";
import { DynamicNGxBootstrapTextAreaComponent } from "./textarea/dynamic-ngx-bootstrap-textarea.component";
import { DynamicNGxBootstrapTimePickerComponent } from "./timepicker/dynamic-ngx-bootstrap-timepicker.component";
import { ButtonsModule } from "ngx-bootstrap/buttons";

describe("DynamicNGxFormBootstrapComponent test suite", () => {
    const inputModel = new DynamicInputModel({id: "input", maxLength: 51});
    const formModel = [
        new DynamicCheckboxModel({id: "checkbox"}),
        new DynamicCheckboxGroupModel({id: "checkboxGroup", group: []}),
        new DynamicColorPickerModel({id: "colorpicker"}),
        new DynamicDatePickerModel({id: "datepicker"}),
        new DynamicEditorModel({id: "editor"}),
        new DynamicFileUploadModel({id: "upload", url: ""}),
        new DynamicFormArrayModel({id: "formArray", groupFactory: () => []}),
        new DynamicFormGroupModel({id: "formGroup", group: []}),
        inputModel,
        new DynamicRadioGroupModel({id: "radioGroup"}),
        new DynamicRatingModel({id: "rating"}),
        new DynamicSelectModel({id: "select", options: [{value: "One"}, {value: "Two"}], value: "One"}),
        new DynamicSliderModel({id: "slider"}),
        new DynamicSwitchModel({id: "switch"}),
        new DynamicTextAreaModel({id: "textarea"}),
        new DynamicTimePickerModel({id: "timepicker"})
    ];

    let formGroup: FormGroup;
    let fixture: ComponentFixture<DynamicNGxBootstrapFormControlContainerComponent>;
    let component: DynamicNGxBootstrapFormControlContainerComponent;
    let debugElement: DebugElement;
    let testElement: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [DynamicNGxBootstrapInputComponent]
            }
        });

        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                DynamicFormsCoreModule,
                TextMaskModule,
                ButtonsModule,
                BsDatepickerModule.forRoot(),
                TimepickerModule.forRoot()
            ],
            declarations: [DynamicNGxBootstrapFormControlContainerComponent, DynamicNGxBootstrapInputComponent]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(DynamicNGxBootstrapFormControlContainerComponent);

            component = fixture.componentInstance;
            debugElement = fixture.debugElement;
        });
    }));

    beforeEach(inject([DynamicFormService], (service: DynamicFormService) => {
        formGroup = service.createFormGroup(formModel);

        component.group = formGroup;
        component.model = inputModel;

        component.ngOnChanges({
            group: new SimpleChange(null, component.group, true),
            model: new SimpleChange(null, component.model, true)
        });

        fixture.detectChanges();

        testElement = debugElement.query(By.css(`input[id='${inputModel.id}']`));
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

        expect(component.componentType).toBe(DynamicNGxBootstrapInputComponent);
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

        inputModel.value = "test";

        expect(component.onModelValueUpdates).toHaveBeenCalled();
    });

    it("should update control activation when model disabled property changes", () => {
        spyOn(component, "onModelDisabledUpdates");

        inputModel.disabled = true;

        expect(component.onModelDisabledUpdates).toHaveBeenCalled();
    });

    it("should map a form control model to a form control component", () => {
        expect(bootstrapUIFormControlMapFn(formModel[0])).toBe(DynamicNGxBootstrapCheckboxComponent);
        expect(bootstrapUIFormControlMapFn(formModel[1])).toBe(DynamicNGxBootstrapCheckboxGroupComponent);
        expect(bootstrapUIFormControlMapFn(formModel[2])).toBeNull();
        expect(bootstrapUIFormControlMapFn(formModel[3])).toBe(DynamicNGxBootstrapDatePickerComponent);
        expect(bootstrapUIFormControlMapFn(formModel[4])).toBeNull();
        expect(bootstrapUIFormControlMapFn(formModel[5])).toBeNull();
        expect(bootstrapUIFormControlMapFn(formModel[6])).toBe(DynamicNGxBootstrapFormArrayComponent);
        expect(bootstrapUIFormControlMapFn(formModel[7])).toBe(DynamicNGxBootstrapFormGroupComponent);
        expect(bootstrapUIFormControlMapFn(formModel[8])).toBe(DynamicNGxBootstrapInputComponent);
        expect(bootstrapUIFormControlMapFn(formModel[9])).toBe(DynamicNGxBootstrapRadioGroupComponent);
        expect(bootstrapUIFormControlMapFn(formModel[10])).toBe(DynamicNGxBootstrapRatingComponent);
        expect(bootstrapUIFormControlMapFn(formModel[11])).toBe(DynamicNGxBootstrapSelectComponent);
        expect(bootstrapUIFormControlMapFn(formModel[12])).toBeNull();
        expect(bootstrapUIFormControlMapFn(formModel[13])).toBeNull();
        expect(bootstrapUIFormControlMapFn(formModel[14])).toBe(DynamicNGxBootstrapTextAreaComponent);
        expect(bootstrapUIFormControlMapFn(formModel[15])).toBe(DynamicNGxBootstrapTimePickerComponent);
    });
});
