import { Type, DebugElement } from "@angular/core";
import { TestBed, async, inject, ComponentFixture } from "@angular/core/testing";
import { ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";
import { By } from "@angular/platform-browser";
import {
    AutoCompleteModule,
    CalendarModule,
    CheckboxModule,
    ChipsModule,
    DropdownModule,
    EditorModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    MultiSelectModule,
    RadioButtonModule,
    SliderModule,
    SpinnerModule
} from "primeng/primeng";
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
} from "@ng2-dynamic-forms/core";
import { DynamicFormPrimeNGComponent } from "./dynamic-form-primeng.component";
import { PFormControlType } from "./dynamic-form-primeng.const";

describe("DynamicFormPrimeNGComponent test suite", () => {

    let formModel = [
            new DynamicCheckboxModel({id: "checkbox"}),
            new DynamicCheckboxGroupModel({id: "checkboxGroup", group: []}),
            new DynamicDatePickerModel({id: "datepicker"}),
            new DynamicEditorModel({id: "editor"}),
            new DynamicFileUploadModel({id: "upload", url: ""}),
            new DynamicFormArrayModel({id: "formArray", createGroup: () => []}),
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
        fixture: ComponentFixture<DynamicFormPrimeNGComponent>,
        component: DynamicFormPrimeNGComponent,
        debugElement: DebugElement,
        testElement: DebugElement;

    beforeEach(async(() => {

        TestBed.configureTestingModule({

            imports: [
                ReactiveFormsModule,
                DynamicFormsCoreModule.forRoot(),
                AutoCompleteModule,
                CalendarModule,
                CheckboxModule,
                ChipsModule,
                DropdownModule,
                EditorModule,
                InputSwitchModule,
                InputTextModule,
                InputTextareaModule,
                MultiSelectModule,
                RadioButtonModule,
                SliderModule,
                SpinnerModule
            ],
            declarations: [DynamicFormPrimeNGComponent]

        }).compileComponents().then(() => {

            fixture = TestBed.createComponent(DynamicFormPrimeNGComponent as Type<DynamicFormPrimeNGComponent>);

            component = fixture.componentInstance;
            debugElement = fixture.debugElement;
        });
    }));

    beforeEach(inject([DynamicFormService], (service: DynamicFormService) => {

        formGroup = service.createFormGroup(formModel);

        component.group = formGroup;
        component.model = testModel;

        fixture.detectChanges();

        testElement = debugElement.query(By.css(`input[id='${testModel.id}']`));
    }));

    it("should initialize correctly", () => {

        expect(component.context).toBeNull();
        expect(component.control instanceof FormControl).toBe(true);
        expect(component.group instanceof FormGroup).toBe(true);
        expect(component.model instanceof DynamicFormControlModel).toBe(true);
        expect(component.hasErrorMessaging).toBe(false);

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

        expect(component.type).toEqual(PFormControlType.Input as string);
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

        let testFn = DynamicFormPrimeNGComponent.getFormControlType;

        expect(testFn(formModel[0])).toEqual(PFormControlType.Checkbox);

        expect(testFn(formModel[1])).toEqual(PFormControlType.Group);

        expect(testFn(formModel[2])).toEqual(PFormControlType.Calendar);

        expect(testFn(formModel[3])).toEqual(PFormControlType.Editor);

        expect(testFn(formModel[4])).toBeNull();

        expect(testFn(formModel[5])).toEqual(PFormControlType.Array);

        expect(testFn(formModel[6])).toEqual(PFormControlType.Group);

        expect(testFn(formModel[7])).toEqual(PFormControlType.Input);

        (formModel[7] as DynamicInputModel).multiple = true;
        expect(testFn(formModel[7])).toEqual(PFormControlType.Chips);

        (formModel[7] as DynamicInputModel).list = ["test1", "test2", "test3"];
        expect(testFn(formModel[7])).toEqual(PFormControlType.AutoComplete);

        expect(testFn(formModel[8])).toEqual(PFormControlType.RadioGroup);

        expect(testFn(formModel[9])).toEqual(PFormControlType.DropDown);

        (formModel[9] as DynamicSelectModel<string>).multiple = true;
        expect(testFn(formModel[9])).toEqual(PFormControlType.MultiSelect);

        expect(testFn(formModel[10])).toEqual(PFormControlType.Slider);

        expect(testFn(formModel[11])).toEqual(PFormControlType.InputSwitch);

        expect(testFn(formModel[12])).toEqual(PFormControlType.TextArea);

        expect(testFn(formModel[13])).toEqual(PFormControlType.Calendar);
    });
});