import {Type} from "@angular/core";
import {TestBed, async, inject, ComponentFixture} from "@angular/core/testing";
import {ReactiveFormsModule, FormGroup, FormControl} from "@angular/forms";
import {DynamicFormsCoreModule, DynamicFormService, DynamicInputModel, DynamicFormControlModel} from "@ng2-dynamic-forms/core";
import {CheckboxModule} from "primeng/components/checkbox/checkbox";
import {DropdownModule} from "primeng/components/dropdown/dropdown";
import {InputTextModule} from "primeng/components/inputtext/inputtext";
import {InputTextareaModule} from "primeng/components/inputtextarea/inputtextarea";
import {RadioButtonModule} from "primeng/components/radiobutton/radiobutton";
import {SpinnerModule} from "primeng/components/spinner/spinner";
import {DynamicFormPrimeNGComponent, DYNAMIC_FORM_UI_PRIME_NG} from "./dynamic-form-primeng.component";

describe("DynamicFormPrimeNGComponent test suite", () => {

    let formModel = [new DynamicInputModel({id: "test"})],
        formGroup: FormGroup,
        fixture: ComponentFixture<DynamicFormPrimeNGComponent>,
        component: DynamicFormPrimeNGComponent;

    beforeEach(async(() => {

        TestBed.configureTestingModule({

            imports: [
                ReactiveFormsModule,
                DynamicFormsCoreModule.forRoot(),
                CheckboxModule,
                DropdownModule,
                InputTextModule,
                InputTextareaModule,
                RadioButtonModule,
                SpinnerModule
            ],
            declarations: [DynamicFormPrimeNGComponent]

        }).compileComponents().then(() => {

            fixture = TestBed.createComponent(DynamicFormPrimeNGComponent as Type<DynamicFormPrimeNGComponent>);
            component = fixture.componentInstance;
        });

    }));

    beforeEach(inject([DynamicFormService], service => {

        formGroup = service.createFormGroup(formModel);

        component.controlGroup = formGroup;
        component.model = formModel[0];

        fixture.detectChanges();
    }));


    it("tests if component initializes correctly", () => {

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

        expect(component.onBlur).toBeDefined();
        expect(component.onChange).toBeDefined();
        expect(component.onFocus).toBeDefined();

        expect(component.isCheckbox).toBe(false);
        expect(component.isCheckboxGroup).toBe(false);
        expect(component.isRadioGroup).toBe(false);
        expect(component.isSwitch).toBe(false);
        expect(component.isValid).toBe(true);
        expect(component.isInvalid).toBe(false);
    });
});