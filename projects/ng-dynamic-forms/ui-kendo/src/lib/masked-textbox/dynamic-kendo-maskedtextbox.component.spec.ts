import { TestBed, inject, ComponentFixture, waitForAsync } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { By } from "@angular/platform-browser";
import { MaskedTextBoxComponent, MaskedTextBoxModule } from "@progress/kendo-angular-inputs";
import { DynamicFormsCoreModule, DynamicFormService, DynamicInputModel } from "@ng-dynamic-forms/core";
import { DynamicKendoMaskedTextBoxComponent } from "./dynamic-kendo-maskedtextbox.component";

describe("DynamicKendoMaskedTextBoxComponent test suite", () => {
    const testModel = new DynamicInputModel({id: "input", mask: ""});
    const formModel = [testModel];

    let formGroup: FormGroup;
    let fixture: ComponentFixture<DynamicKendoMaskedTextBoxComponent>;
    let component: DynamicKendoMaskedTextBoxComponent;
    let debugElement: DebugElement;
    let testElement: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                NoopAnimationsModule,
                MaskedTextBoxModule,
                DynamicFormsCoreModule
            ],
            declarations: [DynamicKendoMaskedTextBoxComponent]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(DynamicKendoMaskedTextBoxComponent);

            component = fixture.componentInstance;
            debugElement = fixture.debugElement;
        });
    }));

    beforeEach(inject([DynamicFormService], (service: DynamicFormService) => {
        formGroup = service.createFormGroup(formModel);

        component.group = formGroup;
        component.model = testModel;

        fixture.detectChanges();

        testElement = debugElement.query(By.css(`kendo-maskedtextbox[id="${testModel.id}"]`));
    }));

    it("should initialize correctly", () => {
        expect(component.control instanceof FormControl).toBe(true);
        expect(component.group instanceof FormGroup).toBe(true);
        expect(component.model instanceof DynamicInputModel).toBe(true);
        expect(component.kendoMaskedTextBox instanceof MaskedTextBoxComponent).toBe(true);

        expect(component.blur).toBeDefined();
        expect(component.change).toBeDefined();
        expect(component.focus).toBeDefined();

        expect(component.onBlur).toBeDefined();
        expect(component.onChange).toBeDefined();
        expect(component.onFocus).toBeDefined();

        expect(component.hasFocus).toBe(false);
        expect(component.isValid).toBe(true);
        expect(component.isInvalid).toBe(false);
        expect(component.showErrorMessages).toBe(false);
    });

    it("should have an kendo-maskedtextbox element", () => {
        expect(testElement instanceof DebugElement).toBe(true);
    });

    it("should emit blur event", () => {
        spyOn(component.blur, "emit");

        component.onBlur(null);

        expect(component.blur.emit).toHaveBeenCalled();
    });

    it("should emit change event", () => {
        spyOn(component.change, "emit");

        component.onChange(null);

        expect(component.change.emit).toHaveBeenCalled();
    });

    it("should emit focus event", () => {
        spyOn(component.focus, "emit");

        component.onFocus(null);

        expect(component.focus.emit).toHaveBeenCalled();
    });
});
