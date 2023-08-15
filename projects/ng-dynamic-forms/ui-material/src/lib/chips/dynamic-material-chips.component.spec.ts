import { TestBed, inject, ComponentFixture, waitForAsync } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { UntypedFormGroup, UntypedFormControl } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { By } from "@angular/platform-browser";
import { MatAutocomplete, MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatChipInputEvent, MatChipGrid } from "@angular/material/chips";
import { MatOption } from "@angular/material/core";
import { MatInput } from "@angular/material/input";
import { DynamicFormService, DynamicInputModel } from "@ng-dynamic-forms/core";
import { DynamicMaterialChipsComponent } from "./dynamic-material-chips.component";

describe("DynamicMaterialChipsComponent test suite", () => {
    const testModel = new DynamicInputModel({
        id: "input",
        multiple: true,
        list: ["Four", "Five", "Six"],
        value: ["One", "Two", "Three"]
    });
    const formModel = [testModel];

    let formGroup: UntypedFormGroup;
    let fixture: ComponentFixture<DynamicMaterialChipsComponent>;
    let component: DynamicMaterialChipsComponent;
    let debugElement: DebugElement;
    let testElement: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, DynamicMaterialChipsComponent]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(DynamicMaterialChipsComponent);
            component = fixture.componentInstance;
            debugElement = fixture.debugElement;
        });
    }));

    beforeEach(inject([DynamicFormService], (service: DynamicFormService) => {
        formGroup = service.createFormGroup(formModel);

        component.group = formGroup;
        component.model = testModel;

        fixture.detectChanges();

        testElement = debugElement.query(By.css(`mat-chip-grid`));
    }));

    it("should initialize correctly", () => {
        expect(component.control instanceof UntypedFormControl).toBe(true);
        expect(component.group instanceof UntypedFormGroup).toBe(true);
        expect(component.model instanceof DynamicInputModel).toBe(true);
        expect(component.matAutocomplete instanceof MatAutocomplete).toBe(true);
        expect(component.matChipGrid instanceof MatChipGrid).toBe(true);
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
    });

    it("should have an mat-chip-list element", () => {
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

    it("should emit custom event", () => {
        spyOn(component.customEvent, "emit");

        component.onCustomEvent(null, "eventType");

        expect(component.customEvent.emit).toHaveBeenCalled();
    });

    it("should add a chip to chip list on input token end", () => {
        const value = "Test";
        const length = component.chips.length;
        const $event = {input: document.createElement("input"), value};

        component.onChipInputTokenEnd($event as MatChipInputEvent);

        expect(component.control.value.length).toBe(length + 1);
        expect(component.control.value[component.control.value.length - 1]).toEqual(value);
    });

    it("should add a chip to chip list on chip selected from autocomplete panel", () => {
        const value = "Test";
        const length = component.chips.length;
        const $event = new MatAutocompleteSelectedEvent(component.matAutocomplete, {value} as MatOption);

        component.onChipSelected($event);

        expect(component.control.value.length).toBe(length + 1);
        expect(component.control.value[component.control.value.length - 1]).toEqual(value);
    });


    it("should remove a chip from chip list", () => {
        const length = component.chips.length;

        component.onChipRemoved("One", 0);

        expect(component.chips.length).toBe(length - 1);
    });
});
