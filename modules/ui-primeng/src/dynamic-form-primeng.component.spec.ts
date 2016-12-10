import {Type, DebugElement} from "@angular/core";
import {TestBed, async, inject, ComponentFixture} from "@angular/core/testing";
import {ReactiveFormsModule, FormGroup, FormControl} from "@angular/forms";
import {By} from "@angular/platform-browser";
import {
    DynamicFormsCoreModule,
    DynamicFormService,
    DynamicInputModel,
    DynamicFormControlModel
} from "@ng2-dynamic-forms/core";
import {CheckboxModule} from "primeng/components/checkbox/checkbox";
import {DropdownModule} from "primeng/components/dropdown/dropdown";
import {InputSwitchModule} from "primeng/components/inputswitch/inputswitch";
import {InputTextModule} from "primeng/components/inputtext/inputtext";
import {InputTextareaModule} from "primeng/components/inputtextarea/inputtextarea";
import {MultiSelectModule} from "primeng/components/multiselect/multiselect";
import {RadioButtonModule} from "primeng/components/radiobutton/radiobutton";
import {SliderModule} from "primeng/components/slider/slider";
import {SpinnerModule} from "primeng/components/spinner/spinner";
import {DynamicFormPrimeNGComponent, DYNAMIC_FORM_UI_PRIME_NG} from "./dynamic-form-primeng.component";

describe("DynamicFormPrimeNGComponent test suite", () => {

    let inputModel = new DynamicInputModel({id: "test"}),
        formModel = [inputModel],
        formGroup: FormGroup,
        fixture: ComponentFixture<DynamicFormPrimeNGComponent>,
        component: DynamicFormPrimeNGComponent,
        debugElement: DebugElement,
        inputElement: DebugElement;

    beforeEach(async(() => {

        TestBed.configureTestingModule({

            imports: [
                ReactiveFormsModule,
                DynamicFormsCoreModule.forRoot(),
                CheckboxModule,
                DropdownModule,
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

    beforeEach(inject([DynamicFormService], service => {

        formGroup = service.createFormGroup(formModel);

        component.controlGroup = formGroup;
        component.model = formModel[0];

        fixture.detectChanges();

        inputElement = debugElement.query(By.css(`input[id='${formModel[0].id}']`));
    }));

    it("should initialize correctly", () => {

        expect(component.type).toEqual(DYNAMIC_FORM_UI_PRIME_NG);

        expect(component.control instanceof FormControl).toBe(true);
        expect(component.controlGroup instanceof FormGroup).toBe(true);
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
    });

    it("should have an input element", () => {

        expect(inputElement instanceof DebugElement).toBe(true);
    });

    it("should listen to native focus and blur events", () => {

        spyOn(component, "onFocusChange");

        inputElement.triggerEventHandler("focus", null);
        inputElement.triggerEventHandler("blur", null);

        expect(component.onFocusChange).toHaveBeenCalledTimes(2);
    });

    it("should listen to native change event", () => {

        spyOn(component, "onValueChange");

        inputElement.triggerEventHandler("change", null);

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

        inputModel.valueUpdates.next("test");

        expect(component.onModelValueUpdates).toHaveBeenCalled();
    });

    it("should update control activation when model disabled property changes", () => {

        spyOn(component, "onModelDisabledUpdates");

        component.ngOnInit();

        inputModel.disabledUpdates.next(true);

        expect(component.onModelDisabledUpdates).toHaveBeenCalled();
    });
});