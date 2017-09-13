import { DebugElement, SimpleChange } from "@angular/core";
import { TestBed, async, inject, ComponentFixture } from "@angular/core/testing";
import { ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import {
    AutoCompleteModule,
    CalendarModule,
    CheckboxModule,
    ChipsModule,
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
    DynamicRatingModel,
    DynamicSelectModel,
    DynamicSliderModel,
    DynamicSwitchModel,
    DynamicTextAreaModel,
    DynamicTimePickerModel
} from "@ng2-dynamic-forms/core";
import { DynamicPrimeNGFormControlComponent } from "./dynamic-primeng-form-control.component";
import {
    PRIME_NG_AUTOCOMPLETE_TEMPLATE_DIRECTIVES,
    PRIME_NG_CHIPS_TEMPLATE_DIRECTIVES,
    PRIME_NG_DROPDOWN_LIST_TEMPLATE_DIRECTIVES,
    PrimeNGFormControlType
} from "./dynamic-primeng-form.const";

describe("DynamicFormPrimeNGComponent test suite", () => {

    let formModel = [
            new DynamicCheckboxModel({id: "checkbox"}),
            new DynamicCheckboxGroupModel({id: "checkboxGroup", group: []}),
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
        testModel = formModel[7] as DynamicInputModel,
        formGroup: FormGroup,
        fixture: ComponentFixture<DynamicPrimeNGFormControlComponent>,
        component: DynamicPrimeNGFormControlComponent,
        debugElement: DebugElement,
        testElement: DebugElement;

    beforeEach(async(() => {

        TestBed.configureTestingModule({

            imports: [
                ReactiveFormsModule,
                NoopAnimationsModule,
                DynamicFormsCoreModule.forRoot(),
                AutoCompleteModule,
                CalendarModule,
                CheckboxModule,
                ChipsModule,
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
            declarations: [DynamicPrimeNGFormControlComponent]

        }).compileComponents().then(() => {

            fixture = TestBed.createComponent(DynamicPrimeNGFormControlComponent);

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

        expect(component.type).toEqual(PrimeNGFormControlType.Input);
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

        component.control.setValue("test");

        expect(component.onControlValueChanges).toHaveBeenCalled();
    });

    it("should update control value when model value changes", () => {

        spyOn(component, "onModelValueUpdates");

        testModel.valueUpdates.next("test");

        expect(component.onModelValueUpdates).toHaveBeenCalled();
    });

    it("should update control activation when model disabled property changes", () => {

        spyOn(component, "onModelDisabledUpdates");

        testModel.disabledUpdates.next(true);

        expect(component.onModelDisabledUpdates).toHaveBeenCalled();
    });

    it("should determine correct form control type", () => {

        let testFn = DynamicPrimeNGFormControlComponent.getFormControlType;

        expect(testFn(formModel[0])).toEqual(PrimeNGFormControlType.Checkbox);

        expect(testFn(formModel[1])).toEqual(PrimeNGFormControlType.Group);

        expect(testFn(formModel[2])).toEqual(PrimeNGFormControlType.Calendar);

        expect(testFn(formModel[3])).toEqual(PrimeNGFormControlType.Editor);

        expect(testFn(formModel[4])).toBeNull();

        expect(testFn(formModel[5])).toEqual(PrimeNGFormControlType.Array);

        expect(testFn(formModel[6])).toEqual(PrimeNGFormControlType.Group);

        expect(testFn(formModel[7])).toEqual(PrimeNGFormControlType.Input);

        (formModel[7] as DynamicInputModel).multiple = true;
        expect(testFn(formModel[7])).toEqual(PrimeNGFormControlType.Chips);

        (formModel[7] as DynamicInputModel).list = ["test1", "test2", "test3"];
        expect(testFn(formModel[7])).toEqual(PrimeNGFormControlType.AutoComplete);

        (formModel[7] as DynamicInputModel).mask = "+(99) 999-9999";
        expect(testFn(formModel[7])).toEqual(PrimeNGFormControlType.InputMask);

        (formModel[7] as DynamicInputModel).inputType = "number";
        expect(testFn(formModel[7])).toEqual(PrimeNGFormControlType.Spinner);

        expect(testFn(formModel[8])).toEqual(PrimeNGFormControlType.RadioGroup);

        expect(testFn(formModel[9])).toEqual(PrimeNGFormControlType.Rating);

        expect(testFn(formModel[10])).toEqual(PrimeNGFormControlType.Dropdown);

        (formModel[10] as DynamicSelectModel<string>).multiple = true;
        expect(testFn(formModel[10])).toEqual(PrimeNGFormControlType.MultiSelect);

        expect(testFn(formModel[11])).toEqual(PrimeNGFormControlType.Slider);

        expect(testFn(formModel[12])).toEqual(PrimeNGFormControlType.InputSwitch);

        expect(testFn(formModel[13])).toEqual(PrimeNGFormControlType.TextArea);

        expect(testFn(formModel[14])).toEqual(PrimeNGFormControlType.Calendar);
    });

    xit("should determine correct template directives", async(() => {

        let testFn = DynamicPrimeNGFormControlComponent.getTemplateDirectives;

        let fixture1: ComponentFixture<DynamicPrimeNGFormControlComponent> = TestBed.createComponent(DynamicPrimeNGFormControlComponent),
            component1: DynamicPrimeNGFormControlComponent = fixture1.componentInstance;

        (formModel[7] as DynamicInputModel).list = ["test1", "test2", "test3"];

        component1.group = formGroup;
        component1.model = formModel[7];

        fixture1.detectChanges();

        //expect(testFn(component1.pViewChild)).toEqual(PRIME_NG_AUTOCOMPLETE_TEMPLATE_DIRECTIVES);
    }));
});