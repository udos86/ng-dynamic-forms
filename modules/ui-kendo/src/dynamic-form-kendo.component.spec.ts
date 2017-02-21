import { TestBed, async, inject, ComponentFixture } from "@angular/core/testing";
import { Type, DebugElement } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { UploadModule } from "@progress/kendo-angular-upload";
import {
    DynamicFormsCoreModule,
    DynamicFormService,
    DynamicFormControlModel,
    DynamicSelectModel
} from "@ng2-dynamic-forms/core";
import { DynamicFormKendoComponent } from "./dynamic-form-kendo.component";
import { DYNAMIC_FORM_UI_KENDO, KendoFormControlType } from "./dynamic-form-kendo.const";

describe("DynamicFormKendoComponent test suite", () => {

    let selectModel = new DynamicSelectModel({id: "test", options:[{value: "One"}, {value: "Two"}], value: "One"}),
        formModel = [selectModel],
        formGroup: FormGroup,
        fixture: ComponentFixture<DynamicFormKendoComponent>,
        component: DynamicFormKendoComponent,
        debugElement: DebugElement,
        selectElement: DebugElement;

    beforeEach(async(() => {

        TestBed.configureTestingModule({

            imports: [
                ReactiveFormsModule,
                DateInputsModule,
                DropDownsModule,
                InputsModule,
                UploadModule,
                DynamicFormsCoreModule.forRoot()
            ],
            declarations: [DynamicFormKendoComponent]

        }).compileComponents().then(() => {

            fixture = TestBed.createComponent(DynamicFormKendoComponent as Type<DynamicFormKendoComponent>);

            component = fixture.componentInstance;
            debugElement = fixture.debugElement;
        });
    }));

    beforeEach(inject([DynamicFormService], (service: DynamicFormService) => {

        formGroup = service.createFormGroup(formModel);

        component.controlGroup = formGroup;
        component.model = formModel[0];

        fixture.detectChanges();

        selectElement = debugElement.query(By.css(`kendo-dropdownlist`));
    }));

    it("should initialize correctly", () => {

        expect(component.type).toEqual(DYNAMIC_FORM_UI_KENDO);

        expect(component.control instanceof FormControl).toBe(true);
        expect(component.controlGroup instanceof FormGroup).toBe(true);
        expect(component.model instanceof DynamicFormControlModel).toBe(true);
        expect(component.hasErrorMessaging).toBe(false);

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

        expect(component.formControlType).toBe(KendoFormControlType.DropDownList);
    });

    it("should have correct view child", () => {

        expect(component.kendoDropDownList).toBeDefined();
    });

    it("should listen to native focus and blur events", () => {

        spyOn(component, "onFocusChange");

        selectElement.triggerEventHandler("focus", null);
        selectElement.triggerEventHandler("blur", null);

        expect(component.onFocusChange).toHaveBeenCalledTimes(2);
    });

    it("should listen to native change event", () => {

        spyOn(component, "onValueChange");

        selectElement.triggerEventHandler("valueChange", null);

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

        selectModel.valueUpdates.next("Two");

        expect(component.onModelValueUpdates).toHaveBeenCalled();
    });

    it("should update control activation when model disabled property changes", () => {

        spyOn(component, "onModelDisabledUpdates");

        component.ngOnInit();

        selectModel.disabledUpdates.next(true);

        expect(component.onModelDisabledUpdates).toHaveBeenCalled();
    });
});