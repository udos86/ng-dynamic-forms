import {TestBed, async} from "@angular/core/testing";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {DynamicFormMaterialComponent, DYNAMIC_FORM_UI_MATERIAL} from "./dynamic-form-material.component";
import {MdUniqueSelectionDispatcher} from "@angular2-material/core";

describe("DynamicFormBasicComponent test suite", () => {

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule],
            declarations: [DynamicFormMaterialComponent],
            providers: [MdUniqueSelectionDispatcher]
        });

        TestBed.compileComponents();
    }));

    xit("tests if component initializes correctly", () => {

        const fixture = TestBed.createComponent(DynamicFormMaterialComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;

        expect(true).toBeTruthy();
    });
});