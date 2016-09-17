import {TestBed, async, inject} from "@angular/core/testing";
import {ReactiveFormsModule, FormsModule, FormGroup, FormControl} from "@angular/forms";
import {MdCheckboxModule} from "@angular2-material/checkbox";
import {MdInputModule} from "@angular2-material/input";
import {MdRadioModule} from "@angular2-material/radio";
import {
    DynamicFormsCoreModule,
    DynamicFormService,
    DynamicInputModel,
    DynamicFormControlModel
} from "@ng2-dynamic-forms/core";
import {DynamicFormMaterialComponent, DYNAMIC_FORM_UI_MATERIAL} from "./dynamic-form-material.component";

describe("DynamicFormMaterialComponent test suite", () => {

    let formModel = [new DynamicInputModel({id: "test"})],
        formGroup,
        fixture,
        component;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule,
                DynamicFormsCoreModule.forRoot(),
                MdCheckboxModule.forRoot(),
                MdInputModule.forRoot(),
                MdRadioModule.forRoot()
            ],
            declarations: [DynamicFormMaterialComponent]
        });

        TestBed.compileComponents();
    }));

    beforeEach(inject([DynamicFormService], service => {

        formGroup = service.createFormGroup(formModel);

        fixture = TestBed.createComponent(DynamicFormMaterialComponent);
        component = fixture.componentInstance;

        component.controlGroup = formGroup;
        component.model = formModel[0];

        fixture.detectChanges();
    }));


    it("tests if component initializes correctly", () => {

        expect(component.type).toEqual(DYNAMIC_FORM_UI_MATERIAL);

        expect(component.control instanceof FormControl).toBe(true);
        expect(component.controlGroup instanceof FormGroup).toBe(true);
        expect(component.model instanceof DynamicFormControlModel).toBe(true);

        expect(component.enable).toBeDefined();
        expect(component.disable).toBeDefined();

        expect(component.onBlur).toBeDefined();
        expect(component.onChange).toBeDefined();
        expect(component.onFocus).toBeDefined();

        expect(component.isCheckbox).toBe(false);
        expect(component.isCheckboxGroup).toBe(false);
        expect(component.isRadioGroup).toBe(false);
        expect(component.isValid).toBe(true);
    });
});