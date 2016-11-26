import {TestBed, async, inject, ComponentFixture} from "@angular/core/testing";
import {Type} from "@angular/core";
import {ReactiveFormsModule, FormGroup, FormControl} from "@angular/forms";
import {
    DynamicFormsCoreModule,
    DynamicFormService,
    DynamicInputModel,
    DynamicFormControlModel
} from "@ng2-dynamic-forms/core";
import {DynamicFormBootstrapComponent, DYNAMIC_FORM_UI_BOOTSTRAP} from "./dynamic-form-bootstrap.component";

describe("DynamicFormBootstrapComponent test suite", () => {

    let formModel = [new DynamicInputModel({id: "test"})],
        formGroup: FormGroup,
        fixture: ComponentFixture<DynamicFormBootstrapComponent>,
        component: DynamicFormBootstrapComponent;

    beforeEach(async(() => {

        TestBed.configureTestingModule({

            imports: [ReactiveFormsModule, DynamicFormsCoreModule.forRoot()],
            declarations: [DynamicFormBootstrapComponent]

        }).compileComponents().then(() => {

            fixture = TestBed.createComponent(DynamicFormBootstrapComponent as Type<DynamicFormBootstrapComponent>);
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

        expect(component.type).toEqual(DYNAMIC_FORM_UI_BOOTSTRAP);

        expect(component.control instanceof FormControl).toBe(true);
        expect(component.controlGroup instanceof FormGroup).toBe(true);
        expect(component.model instanceof DynamicFormControlModel).toBe(true);

        expect(component.hasErrorMessaging).toBe(false);
        expect(component.errorMessages).toEqual([]);

        expect(component.onControlValueChanges).toBeDefined();
        expect(component.onModelDisabledUpdates).toBeDefined();
        expect(component.onModelValueUpdates).toBeDefined();

        expect(component.blur).toBeDefined();
        expect(component.change).toBeDefined();
        expect(component.focus).toBeDefined();

        expect(component.onValueChange).toBeDefined();
        expect(component.onFocusChange).toBeDefined();

        expect(component.isCheckbox).toBe(false);
        expect(component.isRadioGroup).toBe(false);
        expect(component.isSwitch).toBe(false);
        expect(component.isValid).toBe(true);
        expect(component.isInvalid).toBe(false);
    });
});