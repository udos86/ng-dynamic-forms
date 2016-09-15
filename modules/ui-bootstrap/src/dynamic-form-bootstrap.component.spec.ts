import {TestBed, async, inject} from "@angular/core/testing";
import {ReactiveFormsModule, FormsModule, FormGroup} from "@angular/forms";
import {
    DynamicFormsCoreModule,
    DynamicFormService,
    DynamicInputModel,
    DynamicFormControlModel
} from "@ng2-dynamic-forms/core";
import {DynamicFormBootstrapComponent, DYNAMIC_FORM_UI_BOOTSTRAP} from "./dynamic-form-bootstrap.component";

describe("DynamicFormBootstrapComponent test suite", () => {

    let formModel = [new DynamicInputModel({id: "test"})],
        formGroup,
        fixture,
        component;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, DynamicFormsCoreModule.forRoot()],
            declarations: [DynamicFormBootstrapComponent]
        });

        TestBed.compileComponents();
    }));

    beforeEach(inject([DynamicFormService], service => {

        formGroup = service.createFormGroup(formModel);

        fixture = TestBed.createComponent(DynamicFormBootstrapComponent);
        component = fixture.componentInstance;

        component.controlGroup = formGroup;
        component.model = formModel[0];

        fixture.detectChanges();
    }));


    it("tests if component initializes correctly", () => {

        expect(component.type).toEqual(DYNAMIC_FORM_UI_BOOTSTRAP);
        expect(component.controlGroup instanceof FormGroup).toBe(true);
        expect(component.model instanceof DynamicFormControlModel).toBe(true);
    });
});