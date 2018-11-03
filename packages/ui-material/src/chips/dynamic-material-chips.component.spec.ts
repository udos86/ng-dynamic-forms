import { TestBed, async, inject, ComponentFixture } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { By } from "@angular/platform-browser";
import {
    MatAutocomplete,
    MatAutocompleteModule,
    MatAutocompleteSelectedEvent,
    MatChipInputEvent,
    MatChipList,
    MatChipsModule,
    MatIconModule,
    MatInput,
    MatInputModule,
    MatOption
} from "@angular/material";
import { TextMaskModule } from "angular2-text-mask";
import { DynamicFormsCoreModule, DynamicFormService, DynamicInputModel } from "@ng-dynamic-forms/core";
import { DynamicMaterialChipsComponent } from "./dynamic-material-chips.component";

describe("DynamicMaterialChipsComponent test suite", () => {

    let testModel = new DynamicInputModel({
            id: "input",
            multiple: true,
            list: ["Four", "Five", "Six"],
            value: ["One", "Two", "Three"]
        }),
        formModel = [testModel],
        formGroup: FormGroup,
        fixture: ComponentFixture<DynamicMaterialChipsComponent>,
        component: DynamicMaterialChipsComponent,
        debugElement: DebugElement,
        testElement: DebugElement;

    beforeEach(async(() => {

        TestBed.configureTestingModule({

            imports: [
                ReactiveFormsModule,
                NoopAnimationsModule,
                MatAutocompleteModule,
                MatChipsModule,
                MatIconModule,
                MatInputModule,
                TextMaskModule,
                DynamicFormsCoreModule
            ],
            declarations: [DynamicMaterialChipsComponent]

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

        testElement = debugElement.query(By.css(`mat-chip-list`));
    }));

    it("should initialize correctly", () => {

        expect(component.control instanceof FormControl).toBe(true);
        expect(component.group instanceof FormGroup).toBe(true);
        expect(component.model instanceof DynamicInputModel).toBe(true);
        expect(component.matAutocomplete instanceof MatAutocomplete).toBe(true);
        expect(component.matChipList instanceof MatChipList).toBe(true);
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

        let value = "Test",
            length = component.chips.length,
            $event = {input: document.createElement("input"), value};

        component.onChipInputTokenEnd($event as MatChipInputEvent);

        expect(component.control.value.length).toBe(length + 1);
        expect(component.control.value[component.control.value.length - 1]).toEqual(value);
    });

    it("should add a chip to chip list on chip selected from autocomplete panel", () => {

        let value = "Test",
            length = component.chips.length,
            $event = new MatAutocompleteSelectedEvent(component.matAutocomplete, {value} as MatOption);

        component.onChipSelected($event);

        expect(component.control.value.length).toBe(length + 1);
        expect(component.control.value[component.control.value.length - 1]).toEqual(value);
    });


    it("should remove a chip from chip list", () => {

        let length = component.chips.length;

        component.onChipRemoved("One", 0);

        expect(component.chips.length).toBe(length - 1);
    });
});
