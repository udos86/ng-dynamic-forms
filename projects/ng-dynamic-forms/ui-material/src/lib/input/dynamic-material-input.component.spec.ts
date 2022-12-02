import { TestBed, inject, ComponentFixture, waitForAsync } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { ReactiveFormsModule, UntypedFormGroup, UntypedFormControl } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { By } from "@angular/platform-browser";
import { MatLegacyAutocomplete as MatAutocomplete, MatLegacyAutocompleteModule as MatAutocompleteModule } from "@angular/material/legacy-autocomplete";
import { MatLegacyInput as MatInput, MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";
import { DynamicFormsCoreModule, DynamicFormService, DynamicInputModel } from "@ng-dynamic-forms/core";
import { DynamicMaterialInputComponent } from "./dynamic-material-input.component";

describe("DynamicMaterialInputComponent test suite", () => {
    const testModel = new DynamicInputModel({id: "input", maxLength: 51});
    const formModel = [testModel];

    let formGroup: UntypedFormGroup;
    let fixture: ComponentFixture<DynamicMaterialInputComponent>;
    let component: DynamicMaterialInputComponent;
    let debugElement: DebugElement;
    let testElement: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                NoopAnimationsModule,
                MatAutocompleteModule,
                MatInputModule,
                DynamicFormsCoreModule
            ],
            declarations: [DynamicMaterialInputComponent]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(DynamicMaterialInputComponent);

            component = fixture.componentInstance;
            debugElement = fixture.debugElement;
        });
    }));

    beforeEach(inject([DynamicFormService], (service: DynamicFormService) => {
        formGroup = service.createFormGroup(formModel);

        component.group = formGroup;
        component.model = testModel;

        fixture.detectChanges();

        testElement = debugElement.query(By.css(`input[id="${testModel.id}"]`));
    }));

    it("should initialize correctly", () => {
        expect(component.control instanceof UntypedFormControl).toBe(true);
        expect(component.group instanceof UntypedFormGroup).toBe(true);
        expect(component.model instanceof DynamicInputModel).toBe(true);
        expect(component.matAutocomplete instanceof MatAutocomplete).toBe(true);
        expect(component.matInput instanceof MatInput).toBe(true);

        expect(component.blur).toBeDefined();
        expect(component.change).toBeDefined();
        expect(component.customEvent).toBeDefined();
        expect(component.focus).toBeDefined();

        expect(component.onBlur).toBeDefined();
        expect(component.onChange).toBeDefined();
        expect(component.onFocus).toBeDefined();

        expect(component.hasFocus).toBe(false);
        expect(component.isValid).toBe(true);
        expect(component.isInvalid).toBe(false);
        expect(component.showErrorMessages).toBe(false);

        expect(component.characterCount).toBe(0);
        expect(component.characterHint).toEqual(`${component.characterCount} / ${testModel.maxLength}`);
        expect(component.showCharacterHint).toBe(false);
    });

    it("should have an input element", () => {
        expect(testElement instanceof DebugElement).toBe(true);
    });

    it("should emit blur event", () => {
        spyOn(component.blur, "emit");

        component.onBlur(null);

        expect(component.blur.emit).toHaveBeenCalled();
    });

    it("should listen to native blur events", () => {
        spyOn(component, "onBlur");

        testElement.triggerEventHandler("blur", null);

        expect(component.onBlur).toHaveBeenCalled();
    });

    it("should emit change event", () => {
        spyOn(component.change, "emit");

        component.onChange(null);

        expect(component.change.emit).toHaveBeenCalled();
    });

    it("should listen to native change event", () => {
        spyOn(component, "onChange");

        testElement.triggerEventHandler("change", null);

        expect(component.onChange).toHaveBeenCalled();
    });

    it("should emit focus event", () => {
        spyOn(component.focus, "emit");

        component.onFocus(null);

        expect(component.focus.emit).toHaveBeenCalled();
    });

    it("should listen to native focus events", () => {
        spyOn(component, "onFocus");

        testElement.triggerEventHandler("focus", null);

        expect(component.onFocus).toHaveBeenCalled();
    });

    it("should emit custom event", () => {
        spyOn(component.customEvent, "emit");

        component.onCustomEvent(null, "eventType");

        expect(component.customEvent.emit).toHaveBeenCalled();
    });
});
