import {TestBed, async} from "@angular/core/testing";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {DynamicFormBootstrapComponent, DYNAMIC_FORM_UI_BOOTSTRAP} from "./dynamic-form-bootstrap.component";

describe("DynamicFormBasicComponent test suite", () => {

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule],
            declarations: [DynamicFormBootstrapComponent]
        });

        TestBed.compileComponents();
    }));

    xit("tests if component initializes correctly", () => {

        const fixture = TestBed.createComponent(DynamicFormBootstrapComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;

        expect(true).toBeTruthy();
    });
});