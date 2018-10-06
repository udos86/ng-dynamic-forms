import { TestBed, async, inject, ComponentFixture } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { By } from "@angular/platform-browser";
import { MatSlideToggle, MatSlideToggleModule } from "@angular/material";
import { TextMaskModule } from "angular2-text-mask";
import { DynamicFormsCoreModule, DynamicFormService, DynamicSwitchModel } from "@ng-dynamic-forms/core";
import { DynamicMaterialSlideToggleComponent } from "./dynamic-material-slide-toggle.component";

describe("DynamicMaterialSlideToggleComponent test suite", () => {

    let testModel = new DynamicSwitchModel({id: "slideToggle"}),
        formModel = [testModel],
        formGroup: FormGroup,
        fixture: ComponentFixture<DynamicMaterialSlideToggleComponent>,
        component: DynamicMaterialSlideToggleComponent,
        debugElement: DebugElement,
        testElement: DebugElement;

    beforeEach(async(() => {

        TestBed.configureTestingModule({

            imports: [
                ReactiveFormsModule,
                NoopAnimationsModule,
                MatSlideToggleModule,
                TextMaskModule,
                DynamicFormsCoreModule
            ],
            declarations: [DynamicMaterialSlideToggleComponent]

        }).compileComponents().then(() => {

            fixture = TestBed.createComponent(DynamicMaterialSlideToggleComponent);

            component = fixture.componentInstance;
            debugElement = fixture.debugElement;
        });
    }));

    beforeEach(inject([DynamicFormService], (service: DynamicFormService) => {

        formGroup = service.createFormGroup(formModel);

        component.group = formGroup;
        component.model = testModel;

        fixture.detectChanges();

        testElement = debugElement.query(By.css(`mat-slide-toggle[id="${testModel.id}"]`));
    }));

    it("should initialize correctly", () => {

        expect(component.control instanceof FormControl).toBe(true);
        expect(component.group instanceof FormGroup).toBe(true);
        expect(component.model instanceof DynamicSwitchModel).toBe(true);
        expect(component.matSlideToggle instanceof MatSlideToggle).toBe(true);

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

    it("should have an mat-slide-toggle element", () => {

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