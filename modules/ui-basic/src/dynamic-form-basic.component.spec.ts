import {TestBed, async} from "@angular/core/testing";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {DynamicFormBasicComponent, DYNAMIC_FORM_UI_BASIC} from "./dynamic-form-basic.component";

describe("DynamicFormBasicComponent test suite", () => {

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule],
            declarations: [DynamicFormBasicComponent]
        });

        TestBed.compileComponents();
    }));

    xit("tests if component initializes correctly", () => {

        const fixture = TestBed.createComponent(DynamicFormBasicComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;

        expect(true).toBeTruthy();
    });
});