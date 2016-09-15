import {TestBed, async, inject} from "@angular/core/testing";
import {ReactiveFormsModule, FormsModule, FormGroup} from "@angular/forms";
import {
    DynamicFormsCoreModule,
    DynamicFormService,
    DynamicInputModel,
    DynamicFormControlModel
} from "@ng2-dynamic-forms/core";
import {
    DynamicFormFoundationSitesComponent,
    DYNAMIC_FORM_UI_FOUNDATION_SITES
} from "./dynamic-form-foundation-sites.component";

describe("DynamicFormFoundationSitesComponent test suite", () => {

    let formModel = [new DynamicInputModel({id: "test"})],
        formGroup,
        fixture,
        component;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, DynamicFormsCoreModule.forRoot()],
            declarations: [DynamicFormFoundationSitesComponent]
        });

        TestBed.compileComponents();
    }));

    beforeEach(inject([DynamicFormService], service => {

        formGroup = service.createFormGroup(formModel);

        fixture = TestBed.createComponent(DynamicFormFoundationSitesComponent);
        component = fixture.componentInstance;

        component.controlGroup = formGroup;
        component.model = formModel[0];

        fixture.detectChanges();
    }));


    it("tests if component initializes correctly", () => {

        expect(component.type).toEqual(DYNAMIC_FORM_UI_FOUNDATION_SITES);
        expect(component.controlGroup instanceof FormGroup).toBe(true);
        expect(component.model instanceof DynamicFormControlModel).toBe(true);
    });
});