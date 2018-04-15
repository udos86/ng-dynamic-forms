import { TestBed, async, inject, ComponentFixture } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { By } from "@angular/platform-browser";
import { MatAutocomplete, MatAutocompleteModule, MatInput, MatInputModule } from "@angular/material";
import { TextMaskModule } from "angular2-text-mask";
import { DynamicFormsCoreModule, DynamicFormService, DynamicInputModel } from "@ng-dynamic-forms/core";
import { DynamicMaterialInputComponent } from "./dynamic-material-input.component";

describe("DynamicMaterialInputComponent test suite", () => {

    let testModel = new DynamicInputModel({id: "input", maxLength: 51}),
        formModel = [testModel],
        formGroup: FormGroup,
        fixture: ComponentFixture<DynamicMaterialInputComponent>,
        component: DynamicMaterialInputComponent,
        debugElement: DebugElement,
        testElement: DebugElement;

    beforeEach(async(() => {

        TestBed.configureTestingModule({

            imports: [
                ReactiveFormsModule,
                NoopAnimationsModule,
                MatAutocompleteModule,
                MatInputModule,
                TextMaskModule,
                DynamicFormsCoreModule.forRoot()
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

        expect(component.bindId).toBe(true);
        expect(component.control instanceof FormControl).toBe(true);
        expect(component.group instanceof FormGroup).toBe(true);
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