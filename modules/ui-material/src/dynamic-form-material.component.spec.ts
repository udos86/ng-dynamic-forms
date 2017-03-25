import { TestBed, async, inject, ComponentFixture } from "@angular/core/testing";
import { Type, DebugElement } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { MaterialModule } from "@angular/material";
import {
    DynamicFormsCoreModule,
    DynamicFormService,
    DynamicInputModel,
    DynamicSwitchModel,
    DynamicFormControlModel
} from "@ng2-dynamic-forms/core";
import { DynamicFormMaterialComponent, MdFormControlType } from "./dynamic-form-material.component";

describe("DynamicFormMaterialComponent test suite", () => {

    let inputModel = new DynamicInputModel({id: "testInput", maxLength: 51}),
        formModel = [
            inputModel,
            new DynamicSwitchModel({id: "testSwitch"})
        ],
        formGroup: FormGroup,
        fixture: ComponentFixture<DynamicFormMaterialComponent>,
        component: DynamicFormMaterialComponent,
        debugElement: DebugElement,
        inputElement: DebugElement;

    beforeEach(async(() => {

        TestBed.configureTestingModule({

            imports: [ReactiveFormsModule, DynamicFormsCoreModule.forRoot(), MaterialModule.forRoot()],
            declarations: [DynamicFormMaterialComponent]

        }).compileComponents().then(() => {

            fixture = TestBed.createComponent(DynamicFormMaterialComponent as Type<DynamicFormMaterialComponent>);

            component = fixture.componentInstance;
            debugElement = fixture.debugElement;
        });
    }));

    beforeEach(inject([DynamicFormService], (service: DynamicFormService) => {

        formGroup = service.createFormGroup(formModel);

        component.group = formGroup;
        component.model = formModel[0];
        component.showCharacterHint = false;

        fixture.detectChanges();

        inputElement = debugElement.query(By.css(`input[id='${formModel[0].id}']`));
    }));

    it("should initialize correctly", () => {

        expect(component.control instanceof FormControl).toBe(true);
        expect(component.group instanceof FormGroup).toBe(true);
        expect(component.model instanceof DynamicFormControlModel).toBe(true);
        expect(component.hasErrorMessaging).toBe(false);
        expect(component.showCharacterHint).toBe(false);

        expect(component.characterCount).toBe(0);

        expect(component.onControlValueChanges).toBeDefined();
        expect(component.onModelDisabledUpdates).toBeDefined();
        expect(component.onModelValueUpdates).toBeDefined();

        expect(component.blur).toBeDefined();
        expect(component.change).toBeDefined();
        expect(component.focus).toBeDefined();

        expect(component.onValueChange).toBeDefined();
        expect(component.onFocusChange).toBeDefined();

        expect(component.isValid).toBe(true);
        expect(component.isInvalid).toBe(false);
        expect(component.showErrorMessages).toBe(false);

        expect(component.type).toBe(MdFormControlType.Input);
    });

    it("should have an input element", () => {

        expect(inputElement instanceof DebugElement).toBe(true);
    });

    xit("should listen to native focus and blur events", () => {

        spyOn(component, "onFocusChange");

        inputElement.triggerEventHandler("focus", null);
        inputElement.triggerEventHandler("blur", null);

        expect(component.onFocusChange).toHaveBeenCalledTimes(2);
    });

    it("should listen to native change event", () => {

        spyOn(component, "onValueChange");

        inputElement.triggerEventHandler("change", null);

        expect(component.onValueChange).toHaveBeenCalled();
    });

    it("should update model value when control value changes", () => {

        spyOn(component, "onControlValueChanges");

        component.ngOnInit();

        component.control.setValue("test");

        expect(component.onControlValueChanges).toHaveBeenCalled();
    });

    it("should update control value when model value changes", () => {

        spyOn(component, "onModelValueUpdates");

        component.ngOnInit();

        inputModel.valueUpdates.next("test");

        expect(component.onModelValueUpdates).toHaveBeenCalled();
    });

    it("should update control activation when model disabled property changes", () => {

        spyOn(component, "onModelDisabledUpdates");

        component.ngOnInit();

        inputModel.disabledUpdates.next(true);

        expect(component.onModelDisabledUpdates).toHaveBeenCalled();
    });
});