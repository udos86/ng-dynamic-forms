import { TestBed, inject, ComponentFixture, waitForAsync } from "@angular/core/testing";
import { DebugElement, SimpleChange } from "@angular/core";
import { UntypedFormGroup, UntypedFormControl } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { TimepickerModule } from "ngx-bootstrap/timepicker";
import { provideNgxMask } from "ngx-mask";
import {
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
    DynamicBootstrapFormArrayComponent,
    DynamicBootstrapFormControlContainerComponent,
    DynamicBootstrapFormGroupComponent
} from "./dynamic-bootstrap-form-control-container.component";
import { DynamicBootstrapCheckboxComponent } from "./checkbox/dynamic-bootstrap-checkbox.component";
import { DynamicBootstrapDatePickerComponent } from "./datepicker/dynamic-bootstrap-datepicker.component";
import { DynamicBootstrapInputComponent } from "./input/dynamic-bootstrap-input.component";
import { DynamicBootstrapRadioGroupComponent } from "./radio-group/dynamic-bootstrap-radio-group.component";
import { DynamicBootstrapRatingComponent } from "./rating/dynamic-bootstrap-rating.component";
import { DynamicBootstrapSelectComponent } from "./select/dynamic-bootstrap-select.component";
import { DynamicBootstrapTextAreaComponent } from "./textarea/dynamic-bootstrap-textarea.component";
import { DynamicBootstrapTimePickerComponent } from "./timepicker/dynamic-bootstrap-timepicker.component";

describe("DynamicFormBootstrapComponent test suite", () => {
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

    let formGroup: UntypedFormGroup;
    let fixture: ComponentFixture<DynamicBootstrapFormControlContainerComponent>;
    let component: DynamicBootstrapFormControlContainerComponent;
    let debugElement: DebugElement;
    let testElement: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                BsDatepickerModule.forRoot(),
                TimepickerModule.forRoot(),
                DynamicBootstrapFormControlContainerComponent,
                DynamicBootstrapInputComponent
            ],
            providers: [provideNgxMask()]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(DynamicBootstrapFormControlContainerComponent);

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
        expect(component.control instanceof UntypedFormControl).toBe(true);
        expect(component.group instanceof UntypedFormGroup).toBe(true);
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

        inputModel.value = "test";

        expect(component.onModelValueUpdates).toHaveBeenCalled();
    });

    it("should update control activation when model disabled property changes", () => {
        spyOn(component, "onModelDisabledUpdates");

        inputModel.disabled = true;

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
        expect(bootstrapUIFormControlMapFn(formModel[10])).toBe(DynamicBootstrapRatingComponent);
        expect(bootstrapUIFormControlMapFn(formModel[11])).toBe(DynamicBootstrapSelectComponent);
        expect(bootstrapUIFormControlMapFn(formModel[12])).toBeNull();
        expect(bootstrapUIFormControlMapFn(formModel[13])).toBeNull();
        expect(bootstrapUIFormControlMapFn(formModel[14])).toBe(DynamicBootstrapTextAreaComponent);
        expect(bootstrapUIFormControlMapFn(formModel[15])).toBe(DynamicBootstrapTimePickerComponent);
    });
});
