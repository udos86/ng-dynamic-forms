import {TestBed, async, inject} from "@angular/core/testing";
import {ReactiveFormsModule, FormsModule, FormGroup} from "@angular/forms";
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
        formGroup,
        fixture,
        component;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [
                FormsModule,
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
        });

        TestBed.compileComponents();
    }));

    beforeEach(inject([DynamicFormService], service => {

        formGroup = service.createFormGroup(formModel);

        fixture = TestBed.createComponent(DynamicFormPrimeNGComponent);
        component = fixture.componentInstance;

        component.controlGroup = formGroup;
        component.model = formModel[0];

        fixture.detectChanges();
    }));


    it("tests if component initializes correctly", () => {

        expect(component.type).toEqual(DYNAMIC_FORM_UI_PRIME_NG);
        expect(component.controlGroup instanceof FormGroup).toBe(true);
        expect(component.model instanceof DynamicFormControlModel).toBe(true);
    });
});