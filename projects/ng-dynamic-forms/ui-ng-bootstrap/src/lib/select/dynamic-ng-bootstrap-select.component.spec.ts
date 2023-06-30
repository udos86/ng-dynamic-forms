import { TestBed, inject, ComponentFixture, waitForAsync } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { ReactiveFormsModule, UntypedFormGroup, UntypedFormControl } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { By } from "@angular/platform-browser";
import { DynamicFormsCoreModule, DynamicFormService, DynamicSelectModel } from "@ng-dynamic-forms/core";
import { DynamicNGBootstrapSelectComponent } from "./dynamic-ng-bootstrap-select.component";

describe("DynamicNGBootstrapSelectComponent test suite", () => {
    const testModel = new DynamicSelectModel({id: "select", options: [{value: "One"}, {value: "Two"}], value: "One"});
    const formModel = [testModel];

    let formGroup: UntypedFormGroup;
    let fixture: ComponentFixture<DynamicNGBootstrapSelectComponent>;
    let component: DynamicNGBootstrapSelectComponent;
    let debugElement: DebugElement;
    let testElement: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        DynamicFormsCoreModule,
        DynamicNGBootstrapSelectComponent
    ]
}).compileComponents().then(() => {
            fixture = TestBed.createComponent(DynamicNGBootstrapSelectComponent);

            component = fixture.componentInstance;
            debugElement = fixture.debugElement;
        });
    }));

    beforeEach(inject([DynamicFormService], (service: DynamicFormService) => {
        formGroup = service.createFormGroup(formModel);

        component.group = formGroup;
        component.model = testModel;

        fixture.detectChanges();

        testElement = debugElement.query(By.css(`select[id="${testModel.id}"]`));
    }));

    it("should initialize correctly", () => {
        expect(component.control instanceof UntypedFormControl).toBe(true);
        expect(component.group instanceof UntypedFormGroup).toBe(true);
        expect(component.model instanceof DynamicSelectModel).toBe(true);

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

    it("should have an select element", () => {
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

        expect(component.change.emit).toHaveBeenCalled();
    });

    it("should listen to and emit focus event", () => {
        spyOn(component.focus, "emit");

        component.onFocus(null);
        testElement.triggerEventHandler("focus", null);

        expect(component.focus.emit).toHaveBeenCalledTimes(2);
    });
});
