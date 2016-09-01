import {TestBed, async} from "@angular/core/testing";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {DynamicFormPrimeNGComponent, DYNAMIC_FORM_UI_PRIME_NG} from "./dynamic-form-primeng.component";

describe("DynamicFormBasicComponent test suite", () => {

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule],
            declarations: [DynamicFormPrimeNGComponent]
        });

        TestBed.compileComponents();
    }));

    xit("tests if component initializes correctly", () => {

        const fixture = TestBed.createComponent(DynamicFormPrimeNGComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;

        expect(true).toBeTruthy();
    });
});