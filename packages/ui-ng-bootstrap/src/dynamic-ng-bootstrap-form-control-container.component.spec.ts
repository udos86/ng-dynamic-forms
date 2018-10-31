import { TestBed, async, inject, ComponentFixture } from "@angular/core/testing";
import { DebugElement, SimpleChange } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import {
    NgbDatepickerModule,
    NgbButtonsModule,
    NgbTimepickerModule,
    NgbRatingModule
} from "@ng-bootstrap/ng-bootstrap";
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
    DynamicNGBootstrapFormControlContainerComponent,
    ngBootstrapUIFormControlMapFn
} from "./dynamic-ng-bootstrap-form-control-container.component";
import { DynamicNGBootstrapCheckboxComponent } from "./checkbox/dynamic-ng-bootstrap-checkbox.component";
import { DynamicNGBootstrapCheckboxGroupComponent } from "./checkbox-group/dynamic-ng-bootstrap-checkbox-group.component";
import { DynamicNGBootstrapDatePickerComponent } from "./datepicker/dynamic-ng-bootstrap-datepicker.component";
import { DynamicNGBootstrapFormArrayComponent } from "./form-array/dynamic-ng-bootstrap-form-array.component";
import { DynamicNGBootstrapFormGroupComponent } from "./form-group/dynamic-ng-bootstrap-form-group.component";
import { DynamicNGBootstrapInputComponent } from "./input/dynamic-ng-bootstrap-input.component";
import { DynamicNGBootstrapRadioGroupComponent } from "./radio-group/dynamic-ng-bootstrap-radio-group.component";
import { DynamicNGBootstrapRatingComponent } from "./rating/dynamic-ng-bootstrap-rating.component";
import { DynamicNGBootstrapSelectComponent } from "./select/dynamic-ng-bootstrap-select.component";
import { DynamicNGBootstrapTextAreaComponent } from "./textarea/dynamic-ng-bootstrap-textarea.component";
import { DynamicNGBootstrapTimePickerComponent } from "./timepicker/dynamic-ng-bootstrap-timepicker.component";

describe("DynamicNGBootstrapFormControlContainerComponent test suite", () => {

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
        fixture: ComponentFixture<DynamicNGBootstrapFormControlContainerComponent>,
        component: DynamicNGBootstrapFormControlContainerComponent,
        debugElement: DebugElement,
        testElement: DebugElement;

    beforeEach(async(() => {

        TestBed.overrideModule(BrowserDynamicTestingModule, {

            set: {
                entryComponents: [DynamicNGBootstrapInputComponent]
            }
        });

        TestBed.configureTestingModule({

            imports: [
                ReactiveFormsModule,
                NgbButtonsModule,
                NgbDatepickerModule,
                NgbRatingModule,
                NgbTimepickerModule,
                TextMaskModule,
                DynamicFormsCoreModule
            ],
            declarations: [DynamicNGBootstrapFormControlContainerComponent, DynamicNGBootstrapInputComponent]

        }).compileComponents().then(() => {

            fixture = TestBed.createComponent(DynamicNGBootstrapFormControlContainerComponent);

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

        expect(component.componentType).toBe(DynamicNGBootstrapInputComponent);
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

        expect(ngBootstrapUIFormControlMapFn(formModel[0])).toBe(DynamicNGBootstrapCheckboxComponent);
        expect(ngBootstrapUIFormControlMapFn(formModel[1])).toBe(DynamicNGBootstrapCheckboxGroupComponent);
        expect(ngBootstrapUIFormControlMapFn(formModel[2])).toBeNull();
        expect(ngBootstrapUIFormControlMapFn(formModel[3])).toBe(DynamicNGBootstrapDatePickerComponent);
        expect(ngBootstrapUIFormControlMapFn(formModel[4])).toBeNull();
        expect(ngBootstrapUIFormControlMapFn(formModel[5])).toBeNull();
        expect(ngBootstrapUIFormControlMapFn(formModel[6])).toBe(DynamicNGBootstrapFormArrayComponent);
        expect(ngBootstrapUIFormControlMapFn(formModel[7])).toBe(DynamicNGBootstrapFormGroupComponent);
        expect(ngBootstrapUIFormControlMapFn(formModel[8])).toBe(DynamicNGBootstrapInputComponent);
        expect(ngBootstrapUIFormControlMapFn(formModel[9])).toBe(DynamicNGBootstrapRadioGroupComponent);
        expect(ngBootstrapUIFormControlMapFn(formModel[10])).toBe(DynamicNGBootstrapRatingComponent);
        expect(ngBootstrapUIFormControlMapFn(formModel[11])).toBe(DynamicNGBootstrapSelectComponent);
        expect(ngBootstrapUIFormControlMapFn(formModel[12])).toBeNull();
        expect(ngBootstrapUIFormControlMapFn(formModel[13])).toBeNull();
        expect(ngBootstrapUIFormControlMapFn(formModel[14])).toBe(DynamicNGBootstrapTextAreaComponent);
        expect(ngBootstrapUIFormControlMapFn(formModel[15])).toBe(DynamicNGBootstrapTimePickerComponent);
    });
});