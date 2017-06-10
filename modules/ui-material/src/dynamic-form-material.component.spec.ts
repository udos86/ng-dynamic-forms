import { TestBed, async, inject, ComponentFixture } from "@angular/core/testing";
import { Type, DebugElement } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { By } from "@angular/platform-browser";
import {
    MdAutocompleteModule,
    MdCheckboxModule,
    MdDatepickerModule,
    MdInputModule,
    MdRadioModule,
    MdSelectModule,
    MdSliderModule,
    MdSlideToggleModule
} from "@angular/material";
import {
    DynamicFormsCoreModule,
    DynamicFormService,
    DynamicCheckboxModel,
    DynamicCheckboxGroupModel,
    DynamicDatePickerModel,
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
import { DynamicFormMaterialComponent, MdFormControlType } from "./dynamic-form-material.component";

describe("DynamicFormMaterialComponent test suite", () => {

    let formModel = [
            new DynamicInputModel({id: "input", maxLength: 51}),
            new DynamicCheckboxModel({id: "checkbox"}),
            new DynamicCheckboxGroupModel({id: "checkboxGroup", group: []}),
            new DynamicDatePickerModel({id: "datepicker"}),
            new DynamicFormArrayModel({id: "formArray", createGroup: () => []}),
            new DynamicFormGroupModel({id: "formGroup", group: []}),
            new DynamicRadioGroupModel({id: "radioGroup"}),
            new DynamicSelectModel({id: "select"}),
            new DynamicSliderModel({id: "slider"}),
            new DynamicSwitchModel({id: "switch"}),
            new DynamicTextAreaModel({id: "textarea"}),
            new DynamicTimePickerModel({id: "timepicker"})
        ],
        testModel = formModel[0] as DynamicInputModel,
        formGroup: FormGroup,
        fixture: ComponentFixture<DynamicFormMaterialComponent>,
        component: DynamicFormMaterialComponent,
        debugElement: DebugElement,
        testElement: DebugElement;

    beforeEach(async(() => {

        TestBed.configureTestingModule({

            imports: [
                ReactiveFormsModule,
                NoopAnimationsModule,
                MdAutocompleteModule,
                MdCheckboxModule,
                MdDatepickerModule,
                MdInputModule,
                MdRadioModule,
                MdSelectModule,
                MdSliderModule,
                MdSlideToggleModule,
                DynamicFormsCoreModule.forRoot()
            ],
            declarations: [DynamicFormMaterialComponent]

        }).compileComponents().then(() => {

            fixture = TestBed.createComponent(DynamicFormMaterialComponent as Type<DynamicFormMaterialComponent>);

            component = fixture.componentInstance;
            debugElement = fixture.debugElement;
        });
    }));

    beforeEach(inject([DynamicFormService], (service: DynamicFormService) => {

        formGroup = service.createFormGroup(formModel);

        component.group = formGroup;
        component.model = formModel[0];
        component.showCharacterHint = false;

        fixture.detectChanges();

        testElement = debugElement.query(By.css(`input[id='${formModel[0].id}']`));
    }));

    it("should initialize correctly", () => {

        expect(component.context).toBeNull();
        expect(component.control instanceof FormControl).toBe(true);
        expect(component.group instanceof FormGroup).toBe(true);
        expect(component.model instanceof DynamicFormControlModel).toBe(true);
        expect(component.hasErrorMessaging).toBe(false);
        expect(component.showCharacterHint).toBe(false);

        expect(component.characterCount).toBe(0);

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

        expect(component.type).toBe(MdFormControlType.Input);
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

        component.model = formModel[1];
        expect(component["getFormControlType"]()).toBe(MdFormControlType.Checkbox);

        component.model = formModel[2];
        expect(component["getFormControlType"]()).toBe(MdFormControlType.Group);

        component.model = formModel[3];
        expect(component["getFormControlType"]()).toBe(MdFormControlType.DatePicker);

        component.model = formModel[4];
        expect(component["getFormControlType"]()).toBe(MdFormControlType.Array);

        component.model = formModel[5];
        expect(component["getFormControlType"]()).toBe(MdFormControlType.Group);

        component.model = formModel[6];
        expect(component["getFormControlType"]()).toBe(MdFormControlType.RadioGroup);

        component.model = formModel[7];
        expect(component["getFormControlType"]()).toBe(MdFormControlType.Select);

        component.model = formModel[8];
        expect(component["getFormControlType"]()).toBe(MdFormControlType.Slider);

        component.model = formModel[9];
        expect(component["getFormControlType"]()).toBe(MdFormControlType.SlideToggle);

        component.model = formModel[10];
        expect(component["getFormControlType"]()).toBe(MdFormControlType.TextArea);
    });
});