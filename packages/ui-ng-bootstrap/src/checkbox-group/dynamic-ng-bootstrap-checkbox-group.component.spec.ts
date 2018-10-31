import { TestBed, async, inject, ComponentFixture } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { ReactiveFormsModule, FormGroup } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { By } from "@angular/platform-browser";
import { TextMaskModule } from "angular2-text-mask";
import { NgbButtonsModule } from "@ng-bootstrap/ng-bootstrap";
import { DynamicCheckboxGroupModel, DynamicFormsCoreModule, DynamicFormService } from "@ng-dynamic-forms/core";
import { DynamicNGBootstrapCheckboxGroupComponent } from "./dynamic-ng-bootstrap-checkbox-group.component";

describe("DynamicNGBootstrapCheckboxGroupComponent test suite", () => {

    let testModel = new DynamicCheckboxGroupModel({id: "checkboxGroup", group: []}),
        formModel = [testModel],
        formGroup: FormGroup,
        fixture: ComponentFixture<DynamicNGBootstrapCheckboxGroupComponent>,
        component: DynamicNGBootstrapCheckboxGroupComponent,
        debugElement: DebugElement,
        testElement: DebugElement;

    beforeEach(async(() => {

        TestBed.configureTestingModule({

            imports: [
                ReactiveFormsModule,
                NoopAnimationsModule,
                TextMaskModule,
                NgbButtonsModule,
                DynamicFormsCoreModule
            ],
            declarations: [DynamicNGBootstrapCheckboxGroupComponent]

        }).compileComponents().then(() => {

            fixture = TestBed.createComponent(DynamicNGBootstrapCheckboxGroupComponent);

            component = fixture.componentInstance;
            debugElement = fixture.debugElement;
        });
    }));

    beforeEach(inject([DynamicFormService], (service: DynamicFormService) => {

        formGroup = service.createFormGroup(formModel);

        component.group = formGroup;
        component.model = testModel;

        fixture.detectChanges();

        testElement = debugElement.query(By.css(`div.btn-group`));
    }));

    it("should initialize correctly", () => {

        expect(component.control instanceof FormGroup).toBe(true);
        expect(component.group instanceof FormGroup).toBe(true);
        expect(component.model instanceof DynamicCheckboxGroupModel).toBe(true);

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

    it("should have an div.btn-group element", () => {

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