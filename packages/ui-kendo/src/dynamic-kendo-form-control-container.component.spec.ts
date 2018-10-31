import { TestBed, async, inject, ComponentFixture } from "@angular/core/testing";
import { DebugElement, SimpleChange } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { UploadModule } from "@progress/kendo-angular-upload";
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
    DynamicKendoFormControlContainerComponent,
    kendoUIFormControlMapFn
} from "./dynamic-kendo-form-control-container.component";
import { DynamicKendoCheckboxComponent } from "./checkbox/dynamic-kendo-checkbox.component";
import { DynamicKendoCheckboxGroupComponent } from "./checkbox-group/dynamic-kendo-checkbox-group.component";
import { DynamicKendoDatePickerComponent } from "./datepicker/dynamic-kendo-datepicker.component";
import { DynamicKendoDropdownListComponent } from "./dropdownlist/dynamic-kendo-dropdownlist.component";
import { DynamicKendoFormArrayComponent } from "./form-array/dynamic-kendo-form-array.component";
import { DynamicKendoFormGroupComponent } from "./form-group/dynamic-kendo-form-group.component";
import { DynamicKendoInputComponent } from "./input/dynamic-kendo-input.component";
import { DynamicKendoRadioGroupComponent } from "./radio-group/dynamic-kendo-radio-group.component";
import { DynamicKendoSliderComponent } from "./slider/dynamic-kendo-slider.component";
import { DynamicKendoSwitchComponent } from "./switch/dynamic-kendo-switch.component";
import { DynamicKendoTextAreaComponent } from "./textarea/dynamic-kendo-textarea.component";
import { DynamicKendoTimePickerComponent } from "./timepicker/dynamic-kendo-timepicker.component";
import { DynamicKendoUploadComponent } from "./upload/dynamic-kendo-upload.component";

describe("DynamicKendoFormControlContainerComponent test suite", () => {

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
        testModel = formModel[11],
        formGroup: FormGroup,
        fixture: ComponentFixture<DynamicKendoFormControlContainerComponent>,
        component: DynamicKendoFormControlContainerComponent,
        debugElement: DebugElement,
        testElement: DebugElement;

    beforeEach(async(() => {

        TestBed.overrideModule(BrowserDynamicTestingModule, {

            set: {
                entryComponents: [DynamicKendoDropdownListComponent]
            }
        });

        TestBed.configureTestingModule({

            imports: [
                ReactiveFormsModule,
                DateInputsModule,
                DropDownsModule,
                InputsModule,
                UploadModule,
                DynamicFormsCoreModule
            ],
            declarations: [DynamicKendoFormControlContainerComponent, DynamicKendoDropdownListComponent]

        }).compileComponents().then(() => {

            fixture = TestBed.createComponent(DynamicKendoFormControlContainerComponent);

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

        testElement = debugElement.query(By.css(`kendo-dropdownlist`));
    }));

    it("should initialize correctly", () => {

        expect(component.context).toBeNull();
        expect(component.control instanceof FormControl).toBe(true);
        expect(component.group instanceof FormGroup).toBe(true);
        expect(component.model instanceof DynamicFormControlModel).toBe(true);

        expect(component.blur).toBeDefined();
        expect(component.change).toBeDefined();
        expect(component.focus).toBeDefined();

        expect(component.componentType).toBe(DynamicKendoDropdownListComponent);
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

        testElement.triggerEventHandler("valueChange", null);

        expect(component.onChange).toHaveBeenCalled();
    });

    it("should update model value when control value changes", () => {

        spyOn(component, "onControlValueChanges");

        component.control.setValue("test");

        expect(component.onControlValueChanges).toHaveBeenCalled();
    });

    it("should update control value when model value changes", () => {

        spyOn(component, "onModelValueUpdates");

        (testModel as DynamicSelectModel<string>).valueUpdates.next("Two");

        expect(component.onModelValueUpdates).toHaveBeenCalled();
    });

    it("should update control activation when model disabled property changes", () => {

        spyOn(component, "onModelDisabledUpdates");

        testModel.disabledUpdates.next(true);

        expect(component.onModelDisabledUpdates).toHaveBeenCalled();
    });

    it("should map a form control model to a form control component", () => {

        expect(kendoUIFormControlMapFn(formModel[0])).toBe(DynamicKendoCheckboxComponent);
        expect(kendoUIFormControlMapFn(formModel[1])).toBe(DynamicKendoCheckboxGroupComponent);
        expect(kendoUIFormControlMapFn(formModel[2])).toBeNull();
        expect(kendoUIFormControlMapFn(formModel[3])).toBe(DynamicKendoDatePickerComponent);
        expect(kendoUIFormControlMapFn(formModel[4])).toBeNull();
        expect(kendoUIFormControlMapFn(formModel[5])).toBe(DynamicKendoUploadComponent);
        expect(kendoUIFormControlMapFn(formModel[6])).toBe(DynamicKendoFormArrayComponent);
        expect(kendoUIFormControlMapFn(formModel[7])).toBe(DynamicKendoFormGroupComponent);
        expect(kendoUIFormControlMapFn(formModel[8])).toBe(DynamicKendoInputComponent);
        expect(kendoUIFormControlMapFn(formModel[9])).toBe(DynamicKendoRadioGroupComponent);
        expect(kendoUIFormControlMapFn(formModel[10])).toBeNull();
        expect(kendoUIFormControlMapFn(formModel[11])).toBe(DynamicKendoDropdownListComponent);
        expect(kendoUIFormControlMapFn(formModel[12])).toBe(DynamicKendoSliderComponent);
        expect(kendoUIFormControlMapFn(formModel[13])).toBe(DynamicKendoSwitchComponent);
        expect(kendoUIFormControlMapFn(formModel[14])).toBe(DynamicKendoTextAreaComponent);
        expect(kendoUIFormControlMapFn(formModel[15])).toBe(DynamicKendoTimePickerComponent);
    });
});