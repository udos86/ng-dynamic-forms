import {TestBed, async, inject, ComponentFixture} from "@angular/core/testing";
import {Type} from "@angular/core";
import {ReactiveFormsModule, FormGroup, FormControl} from "@angular/forms";
import {
    DynamicFormsCoreModule,
    DynamicFormService,
    DynamicInputModel,
    DynamicFormControlModel
} from "@ng2-dynamic-forms/core";
import {DynamicFormBasicComponent, DYNAMIC_FORM_UI_BASIC} from "./dynamic-form-basic.component";

describe("DynamicFormBasicComponent test suite", () => {

    let formModel = [new DynamicInputModel({id: "test"})],
        formGroup: FormGroup,
        fixture: ComponentFixture<DynamicFormBasicComponent>,
        component: DynamicFormBasicComponent;

    beforeEach(async(() => {

        TestBed.configureTestingModule({

            imports: [
                ReactiveFormsModule,
                DynamicFormsCoreModule.forRoot()
            ],
            declarations: [DynamicFormBasicComponent]

        }).compileComponents().then(() => {

            fixture = TestBed.createComponent(DynamicFormBasicComponent as Type<DynamicFormBasicComponent>);
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

        expect(component.type).toEqual(DYNAMIC_FORM_UI_BASIC);

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
        expect(component.isValid).toBe(true);
        expect(component.isInvalid).toBe(false);
    });
});