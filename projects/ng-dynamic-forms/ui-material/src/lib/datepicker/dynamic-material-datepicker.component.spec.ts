import { TestBed, async, inject, ComponentFixture } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { By } from "@angular/platform-browser";
import { MatDatepicker, MatDatepickerModule, MatInput, MatInputModule, MatNativeDateModule } from "@angular/material";
import { TextMaskModule } from "angular2-text-mask";
import { DynamicDatePickerModel, DynamicFormsCoreModule, DynamicFormService } from "@ng-dynamic-forms/core";
import { DynamicMaterialDatePickerComponent } from "./dynamic-material-datepicker.component";

describe("DynamicMaterialDatePickerComponent test suite", () => {

    let testModel = new DynamicDatePickerModel({id: "datepicker"}),
        formModel = [testModel],
        formGroup: FormGroup,
        fixture: ComponentFixture<DynamicMaterialDatePickerComponent>,
        component: DynamicMaterialDatePickerComponent,
        debugElement: DebugElement,
        testElement: DebugElement;

    beforeEach(async(() => {

        TestBed.configureTestingModule({

            imports: [
                ReactiveFormsModule,
                NoopAnimationsModule,
                MatDatepickerModule,
                MatInputModule,
                MatNativeDateModule,
                TextMaskModule,
                DynamicFormsCoreModule
            ],
            declarations: [DynamicMaterialDatePickerComponent]

        }).compileComponents().then(() => {

            fixture = TestBed.createComponent(DynamicMaterialDatePickerComponent);

            component = fixture.componentInstance;
            debugElement = fixture.debugElement;
        });
    }));

    beforeEach(inject([DynamicFormService], (service: DynamicFormService) => {

        formGroup = service.createFormGroup(formModel);

        component.group = formGroup;
        component.model = testModel;

        fixture.detectChanges();

        testElement = debugElement.query(By.css(`mat-datepicker`));
    }));

    it("should initialize correctly", () => {

        expect(component.control instanceof FormControl).toBe(true);
        expect(component.group instanceof FormGroup).toBe(true);
        expect(component.model instanceof DynamicDatePickerModel).toBe(true);
        expect(component.matDatePicker instanceof MatDatepicker).toBe(true);
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

    it("should have an mat-datepicker element", () => {

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
});