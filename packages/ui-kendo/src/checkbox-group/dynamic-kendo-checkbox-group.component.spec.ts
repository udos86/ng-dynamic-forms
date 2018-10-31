import { TestBed, async, inject, ComponentFixture } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { ReactiveFormsModule, FormGroup } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { By } from "@angular/platform-browser";
import { TextMaskModule } from "angular2-text-mask";
import { DynamicCheckboxGroupModel, DynamicFormsCoreModule, DynamicFormService } from "@ng-dynamic-forms/core";
import { DynamicKendoCheckboxGroupComponent } from "./dynamic-kendo-checkbox-group.component";

describe("DynamicKendoCheckboxGroupComponent test suite", () => {

    let testModel = new DynamicCheckboxGroupModel({id: "checkboxGroup", group: []}),
        formModel = [testModel],
        formGroup: FormGroup,
        fixture: ComponentFixture<DynamicKendoCheckboxGroupComponent>,
        component: DynamicKendoCheckboxGroupComponent,
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
            declarations: [DynamicKendoCheckboxGroupComponent]

        }).compileComponents().then(() => {

            fixture = TestBed.createComponent(DynamicKendoCheckboxGroupComponent);

            component = fixture.componentInstance;
            debugElement = fixture.debugElement;
        });
    }));

    beforeEach(inject([DynamicFormService], (service: DynamicFormService) => {

        formGroup = service.createFormGroup(formModel);

        component.group = formGroup;
        component.model = testModel;

        fixture.detectChanges();

        testElement = debugElement.query(By.css(`fieldset[id="${testModel.id}"]`));
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

    it("should have an fieldset element", () => {

        expect(testElement instanceof DebugElement).toBe(true);
    });
});