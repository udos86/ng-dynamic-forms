import { TestBed, async, inject, ComponentFixture } from "@angular/core/testing";
import { DebugElement, SimpleChange } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
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
    DynamicBasicFormControlContainerComponent,
    basicUIFormControlMapFn
} from "./dynamic-basic-form-control-container.component";
import { DynamicBasicCheckboxComponent } from "./checkbox/dynamic-basic-checkbox.component";
import { DynamicBasicFormArrayComponent } from "./form-array/dynamic-basic-form-array.component";
import { DynamicBasicFormGroupComponent } from "./form-group/dynamic-basic-form-group.component";
import { DynamicBasicInputComponent } from "./input/dynamic-basic-input.component";
import { DynamicBasicRadioGroupComponent } from "./radio-group/dynamic-basic-radio-group.component";
import { DynamicBasicSelectComponent } from "./select/dynamic-basic-select.component";
import { DynamicBasicTextAreaComponent } from "./textarea/dynamic-basic-textarea.component";

describe("DynamicBasicFormControlContainerComponent test suite", () => {

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
        fixture: ComponentFixture<DynamicBasicFormControlContainerComponent>,
        component: DynamicBasicFormControlContainerComponent,
        debugElement: DebugElement,
        testElement: DebugElement;

    beforeEach(async(() => {

        TestBed.overrideModule(BrowserDynamicTestingModule, {

            set: {
                entryComponents: [DynamicBasicInputComponent]
            }
        });

        TestBed.configureTestingModule({

            imports: [ReactiveFormsModule, TextMaskModule, DynamicFormsCoreModule],
            declarations: [DynamicBasicFormControlContainerComponent, DynamicBasicInputComponent]

        }).compileComponents().then(() => {

            fixture = TestBed.createComponent(DynamicBasicFormControlContainerComponent);

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

        expect(component.blur).toBeDefined();
        expect(component.change).toBeDefined();
        expect(component.focus).toBeDefined();

        expect(component.componentType).toBe(DynamicBasicInputComponent);
    });

    it("should have an input element", () => {

        expect(testElement instanceof DebugElement).toBe(true);
    });

    it("should listen to native blur events", () => {

        spyOn(component, "onBlur");

        testElement.triggerEventHandler("blur", null);

        expect(component.onBlur).toHaveBeenCalled();
    });

    it("should listen to native focus and blur events", () => {

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

        expect(basicUIFormControlMapFn(formModel[0])).toBe(DynamicBasicCheckboxComponent);
        expect(basicUIFormControlMapFn(formModel[1])).toBe(DynamicBasicFormGroupComponent);
        expect(basicUIFormControlMapFn(formModel[2])).toBeNull();
        expect(basicUIFormControlMapFn(formModel[3])).toBeNull();
        expect(basicUIFormControlMapFn(formModel[4])).toBeNull();
        expect(basicUIFormControlMapFn(formModel[5])).toBeNull();
        expect(basicUIFormControlMapFn(formModel[6])).toBe(DynamicBasicFormArrayComponent);
        expect(basicUIFormControlMapFn(formModel[7])).toBe(DynamicBasicFormGroupComponent);
        expect(basicUIFormControlMapFn(formModel[8])).toBe(DynamicBasicInputComponent);
        expect(basicUIFormControlMapFn(formModel[9])).toBe(DynamicBasicRadioGroupComponent);
        expect(basicUIFormControlMapFn(formModel[10])).toBeNull();
        expect(basicUIFormControlMapFn(formModel[11])).toBe(DynamicBasicSelectComponent);
        expect(basicUIFormControlMapFn(formModel[12])).toBeNull();
        expect(basicUIFormControlMapFn(formModel[13])).toBeNull();
        expect(basicUIFormControlMapFn(formModel[14])).toBe(DynamicBasicTextAreaComponent);
        expect(basicUIFormControlMapFn(formModel[15])).toBeNull();
    });
});