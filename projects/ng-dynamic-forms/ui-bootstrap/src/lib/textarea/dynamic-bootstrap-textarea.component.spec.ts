import { TestBed, async, inject, ComponentFixture } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { By } from "@angular/platform-browser";
import { TextMaskModule } from "angular2-text-mask";
import { DynamicFormsCoreModule, DynamicFormService, DynamicTextAreaModel } from "@ng-dynamic-forms/core";
import { DynamicBootstrapTextAreaComponent } from "./dynamic-bootstrap-textarea.component";

describe("DynamicBootstrapTextAreaComponent test suite", () => {

    let testModel = new DynamicTextAreaModel({id: "textarea"}),
        formModel = [testModel],
        formGroup: FormGroup,
        fixture: ComponentFixture<DynamicBootstrapTextAreaComponent>,
        component: DynamicBootstrapTextAreaComponent,
        debugElement: DebugElement,
        testElement: DebugElement;

    beforeEach(async(() => {

        TestBed.configureTestingModule({

            imports: [
                ReactiveFormsModule,
                NoopAnimationsModule,
                TextMaskModule,
                DynamicFormsCoreModule
            ],
            declarations: [DynamicBootstrapTextAreaComponent]

        }).compileComponents().then(() => {

            fixture = TestBed.createComponent(DynamicBootstrapTextAreaComponent);

            component = fixture.componentInstance;
            debugElement = fixture.debugElement;
        });
    }));

    beforeEach(inject([DynamicFormService], (service: DynamicFormService) => {

        formGroup = service.createFormGroup(formModel);

        component.group = formGroup;
        component.model = testModel;

        fixture.detectChanges();

        testElement = debugElement.query(By.css(`textarea[id="${testModel.id}"]`));
    }));

    it("should initialize correctly", () => {

        expect(component.control instanceof FormControl).toBe(true);
        expect(component.group instanceof FormGroup).toBe(true);
        expect(component.model instanceof DynamicTextAreaModel).toBe(true);

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

    it("should have an textarea element", () => {

        expect(testElement instanceof DebugElement).toBe(true);
    });

    it("should listen to and emit blur event", () => {

        spyOn(component.blur, "emit");

        component.onBlur(null);
        testElement.triggerEventHandler("blur", null);

        expect(component.blur.emit).toHaveBeenCalledTimes(2);
    });

    it("should emit change event", () => {

        spyOn(component.change, "emit");

        component.onChange(null);
        testElement.triggerEventHandler("change", null);

        expect(component.change.emit).toHaveBeenCalled();
    });

    it("should listen to and emit focus event", () => {

        spyOn(component.focus, "emit");

        component.onFocus(null);
        testElement.triggerEventHandler("focus", null);

        expect(component.focus.emit).toHaveBeenCalledTimes(2);
    });
});