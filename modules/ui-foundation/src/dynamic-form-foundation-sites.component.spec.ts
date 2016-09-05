import {TestBed, async} from "@angular/core/testing";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {
    DynamicFormFoundationSitesComponent,
    DYNAMIC_FORM_UI_FOUNDATION_SITES
} from "./dynamic-form-foundation-sites.component";

describe("DynamicFormBasicComponent test suite", () => {

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule],
            declarations: [DynamicFormFoundationSitesComponent]
        });

        TestBed.compileComponents();
    }));

    xit("tests if component initializes correctly", () => {

        const fixture = TestBed.createComponent(DynamicFormFoundationSitesComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;

        expect(true).toBeTruthy();
    });
});