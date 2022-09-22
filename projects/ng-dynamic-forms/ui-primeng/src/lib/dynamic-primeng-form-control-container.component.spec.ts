import { DebugElement, SimpleChange } from "@angular/core";
import { TestBed, inject, ComponentFixture, waitForAsync } from "@angular/core/testing";
import { ReactiveFormsModule, UntypedFormGroup, UntypedFormControl } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
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
    DynamicPrimeNGFormArrayComponent,
    DynamicPrimeNGFormControlContainerComponent,
    DynamicPrimeNGFormGroupComponent,
    primeNGUIFormControlMapFn
} from "./dynamic-primeng-form-control-container.component";
import { DynamicPrimeNGCalendarComponent } from "./calendar/dynamic-primeng-calendar.component";
import { DynamicPrimeNGCheckboxComponent } from "./checkbox/dynamic-primeng-checkbox.component";
import { DynamicPrimeNGColorPickerComponent } from "./colorpicker/dynamic-primeng-colorpicker.component";
import { DynamicPrimeNGDropdownComponent } from "./dropdown/dynamic-primeng-dropdown.component";
import { DynamicPrimeNGEditorComponent } from "./editor/dynamic-primeng-editor.component";
import { DynamicPrimeNGInputComponent } from "./input/dynamic-primeng-input.component";
import { DynamicPrimeNGInputSwitchComponent } from "./input-switch/dynamic-primeng-input-switch.component";
import { DynamicPrimeNGRadioGroupComponent } from "./radio-group/dynamic-primeng-radio-group.component";
import { DynamicPrimeNGRatingComponent } from "./rating/dynamic-primeng-rating.component";
import { DynamicPrimeNGSliderComponent } from "./slider/dynamic-primeng-slider.component";
import { DynamicPrimeNGTextAreaComponent } from "./textarea/dynamic-primeng-textarea.component";
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { CheckboxModule } from "primeng/checkbox";
import { ChipsModule } from "primeng/chips";
import { ColorPickerModule } from "primeng/colorpicker";
import { DropdownModule } from "primeng/dropdown";
import { EditorModule } from "primeng/editor";
import { InputMaskModule } from "primeng/inputmask";
import { InputSwitchModule } from "primeng/inputswitch";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { MultiSelectModule } from "primeng/multiselect";
import { RadioButtonModule } from "primeng/radiobutton";
import { RatingModule } from "primeng/rating";
import { SliderModule } from "primeng/slider";
import { SpinnerModule } from "primeng/spinner";

describe("DynamicPrimeNGFormControlContainerComponent test suite", () => {
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
    let fixture: ComponentFixture<DynamicPrimeNGFormControlContainerComponent>;
    let component: DynamicPrimeNGFormControlContainerComponent;
    let debugElement: DebugElement;
    let testElement: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [DynamicPrimeNGInputComponent]
            }
        });

        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                NoopAnimationsModule,
                DynamicFormsCoreModule,
                AutoCompleteModule,
                CalendarModule,
                CheckboxModule,
                ChipsModule,
                ColorPickerModule,
                DropdownModule,
                EditorModule,
                InputMaskModule,
                InputSwitchModule,
                InputTextModule,
                InputTextareaModule,
                MultiSelectModule,
                RadioButtonModule,
                RatingModule,
                SliderModule,
                SpinnerModule
            ],
            declarations: [DynamicPrimeNGFormControlContainerComponent, DynamicPrimeNGInputComponent]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(DynamicPrimeNGFormControlContainerComponent);

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
        expect(component.context).toBeNull();
        expect(component.control instanceof UntypedFormControl).toBe(true);
        expect(component.group instanceof UntypedFormGroup).toBe(true);
        expect(component.model instanceof DynamicFormControlModel).toBe(true);

        expect(component.blur).toBeDefined();
        expect(component.change).toBeDefined();
        expect(component.focus).toBeDefined();

        expect(component.componentType).toBe(DynamicPrimeNGInputComponent);
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
        expect(primeNGUIFormControlMapFn(formModel[0])).toBe(DynamicPrimeNGCheckboxComponent);
        expect(primeNGUIFormControlMapFn(formModel[1])).toBe(DynamicPrimeNGFormGroupComponent);
        expect(primeNGUIFormControlMapFn(formModel[2])).toBe(DynamicPrimeNGColorPickerComponent);
        expect(primeNGUIFormControlMapFn(formModel[3])).toBe(DynamicPrimeNGCalendarComponent);
        expect(primeNGUIFormControlMapFn(formModel[4])).toBe(DynamicPrimeNGEditorComponent);
        expect(primeNGUIFormControlMapFn(formModel[5])).toBeNull();
        expect(primeNGUIFormControlMapFn(formModel[6])).toBe(DynamicPrimeNGFormArrayComponent);
        expect(primeNGUIFormControlMapFn(formModel[7])).toBe(DynamicPrimeNGFormGroupComponent);
        expect(primeNGUIFormControlMapFn(formModel[8])).toBe(DynamicPrimeNGInputComponent);
        expect(primeNGUIFormControlMapFn(formModel[9])).toBe(DynamicPrimeNGRadioGroupComponent);
        expect(primeNGUIFormControlMapFn(formModel[10])).toBe(DynamicPrimeNGRatingComponent);
        expect(primeNGUIFormControlMapFn(formModel[11])).toBe(DynamicPrimeNGDropdownComponent);
        expect(primeNGUIFormControlMapFn(formModel[12])).toBe(DynamicPrimeNGSliderComponent);
        expect(primeNGUIFormControlMapFn(formModel[13])).toBe(DynamicPrimeNGInputSwitchComponent);
        expect(primeNGUIFormControlMapFn(formModel[14])).toBe(DynamicPrimeNGTextAreaComponent);
        expect(primeNGUIFormControlMapFn(formModel[15])).toBe(DynamicPrimeNGCalendarComponent);
    });
});
