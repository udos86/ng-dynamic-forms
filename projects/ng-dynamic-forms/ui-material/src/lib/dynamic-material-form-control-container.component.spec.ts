import { TestBed, inject, ComponentFixture, waitForAsync } from "@angular/core/testing";
import { DebugElement, SimpleChange } from "@angular/core";
import { ReactiveFormsModule, UntypedFormGroup, UntypedFormControl } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { By } from "@angular/platform-browser";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from "@angular/material/legacy-autocomplete";
import { MatLegacyCheckboxModule as MatCheckboxModule } from "@angular/material/legacy-checkbox";
import { MatLegacyChipsModule as MatChipsModule } from "@angular/material/legacy-chips";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatIconModule } from "@angular/material/icon";
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";
import { MatLegacyRadioModule as MatRadioModule } from "@angular/material/legacy-radio";
import { MatLegacySelectModule as MatSelectModule } from "@angular/material/legacy-select";
import { MatLegacySlideToggleModule as MatSlideToggleModule } from "@angular/material/legacy-slide-toggle";
import { MatLegacySliderModule as MatSliderModule } from "@angular/material/legacy-slider";
import {
    DynamicFormsCoreModule,
    DynamicFormService,
    DynamicCheckboxModel,
    DynamicCheckboxGroupModel,
    DynamicColorPickerModel,
    DynamicDatePickerModel,
    DynamicEditorModel,
    DynamicFileUploadModel,
    DynamicFormArrayModel,
    DynamicFormControlModel,
    DynamicFormGroupModel,
    DynamicInputModel,
    DynamicRadioGroupModel,
    DynamicRatingModel,
    DynamicSelectModel,
    DynamicSliderModel,
    DynamicSwitchModel,
    DynamicTextAreaModel,
    DynamicTimePickerModel
} from "@ng-dynamic-forms/core";
import {
    DynamicMaterialFormArrayComponent,
    DynamicMaterialFormControlContainerComponent,
    DynamicMaterialFormGroupComponent,
    materialUIFormControlMapFn
} from "./dynamic-material-form-control-container.component";
import { DynamicMaterialCheckboxComponent } from "./checkbox/dynamic-material-checkbox.component";
import { DynamicMaterialDatePickerComponent } from "./datepicker/dynamic-material-datepicker.component";
import { DynamicMaterialInputComponent } from "./input/dynamic-material-input.component";
import { DynamicMaterialRadioGroupComponent } from "./radio-group/dynamic-material-radio-group.component";
import { DynamicMaterialSelectComponent } from "./select/dynamic-material-select.component";
import { DynamicMaterialSliderComponent } from "./slider/dynamic-material-slider.component";
import { DynamicMaterialSlideToggleComponent } from "./slide-toggle/dynamic-material-slide-toggle.component";
import { DynamicMaterialTextAreaComponent } from "./textarea/dynamic-material-textarea.component";

describe("DynamicMaterialFormControlContainerComponent test suite", () => {
    const inputModel = new DynamicInputModel({id: "input", maxLength: 51});
    const formModel = [
        new DynamicCheckboxModel({id: "checkbox"}),
        new DynamicCheckboxGroupModel({id: "checkboxGroup", group: []}),
        new DynamicColorPickerModel({id: "colorpicker"}),
        new DynamicDatePickerModel({id: "datepicker"}),
        new DynamicEditorModel({id: "editor"}),
        new DynamicFileUploadModel({id: "upload", url: ""}),
        new DynamicFormArrayModel({id: "formArray", groupFactory: () => []}),
        new DynamicFormGroupModel({id: "formGroup", group: []}),
        inputModel,
        new DynamicRadioGroupModel({id: "radioGroup"}),
        new DynamicRatingModel({id: "rating"}),
        new DynamicSelectModel({id: "select", options: [{value: "One"}, {value: "Two"}], value: "One"}),
        new DynamicSliderModel({id: "slider"}),
        new DynamicSwitchModel({id: "switch"}),
        new DynamicTextAreaModel({id: "textarea"}),
        new DynamicTimePickerModel({id: "timepicker"})
    ];

    let formGroup: UntypedFormGroup;
    let fixture: ComponentFixture<DynamicMaterialFormControlContainerComponent>;
    let component: DynamicMaterialFormControlContainerComponent;
    let debugElement: DebugElement;
    let testElement: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [DynamicMaterialInputComponent]
            }
        });

        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                NoopAnimationsModule,
                MatAutocompleteModule,
                MatCheckboxModule,
                MatChipsModule,
                MatDatepickerModule,
                MatIconModule,
                MatInputModule,
                MatRadioModule,
                MatSelectModule,
                MatSliderModule,
                MatSlideToggleModule,
                DynamicFormsCoreModule
            ],
            declarations: [DynamicMaterialFormControlContainerComponent, DynamicMaterialInputComponent]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(DynamicMaterialFormControlContainerComponent);

            component = fixture.componentInstance;
            debugElement = fixture.debugElement;
        });
    }));

    beforeEach(inject([DynamicFormService], (service: DynamicFormService) => {
        formGroup = service.createFormGroup(formModel);

        component.group = formGroup;
        component.model = inputModel;

        component.ngOnChanges({
            group: new SimpleChange(null, component.group, true),
            model: new SimpleChange(null, component.model, true)
        });

        fixture.detectChanges();

        testElement = debugElement.query(By.css(`input[id='${inputModel.id}']`));
    }));

    it("should initialize correctly", () => {
        expect(component.context).toBeNull();
        expect(component.control instanceof UntypedFormControl).toBe(true);
        expect(component.group instanceof UntypedFormGroup).toBe(true);
        expect(component.model instanceof DynamicFormControlModel).toBe(true);

        expect(component.blur).toBeDefined();
        expect(component.change).toBeDefined();
        expect(component.focus).toBeDefined();

        expect(component.componentType).toBe(DynamicMaterialInputComponent);
    });

    it("should have an input element", () => {
        expect(testElement instanceof DebugElement).toBe(true);
    });

    it("should detect material form fields", () => {
        expect(component.hasMatFormField).toBe(true);
    });

    it("should update model value when control value changes", () => {
        spyOn(component, "onControlValueChanges");

        component.control.setValue("test");

        expect(component.onControlValueChanges).toHaveBeenCalled();
    });

    it("should update control value when model value changes", () => {
        spyOn(component, "onModelValueUpdates");

        inputModel.value = "test";

        expect(component.onModelValueUpdates).toHaveBeenCalled();
    });

    it("should update control activation when model disabled property changes", () => {
        spyOn(component, "onModelDisabledUpdates");

        inputModel.disabled = true;

        expect(component.onModelDisabledUpdates).toHaveBeenCalled();
    });

    it("should map a form control model to a form control component", () => {
        expect(materialUIFormControlMapFn(formModel[0])).toBe(DynamicMaterialCheckboxComponent);
        expect(materialUIFormControlMapFn(formModel[1])).toBe(DynamicMaterialFormGroupComponent);
        expect(materialUIFormControlMapFn(formModel[2])).toBeNull();
        expect(materialUIFormControlMapFn(formModel[3])).toBe(DynamicMaterialDatePickerComponent);
        expect(materialUIFormControlMapFn(formModel[4])).toBeNull();
        expect(materialUIFormControlMapFn(formModel[5])).toBeNull();
        expect(materialUIFormControlMapFn(formModel[6])).toBe(DynamicMaterialFormArrayComponent);
        expect(materialUIFormControlMapFn(formModel[7])).toBe(DynamicMaterialFormGroupComponent);
        expect(materialUIFormControlMapFn(formModel[8])).toBe(DynamicMaterialInputComponent);
        expect(materialUIFormControlMapFn(formModel[9])).toBe(DynamicMaterialRadioGroupComponent);
        expect(materialUIFormControlMapFn(formModel[10])).toBeNull();
        expect(materialUIFormControlMapFn(formModel[11])).toBe(DynamicMaterialSelectComponent);
        expect(materialUIFormControlMapFn(formModel[12])).toBe(DynamicMaterialSliderComponent);
        expect(materialUIFormControlMapFn(formModel[13])).toBe(DynamicMaterialSlideToggleComponent);
        expect(materialUIFormControlMapFn(formModel[14])).toBe(DynamicMaterialTextAreaComponent);
        expect(materialUIFormControlMapFn(formModel[15])).toBeNull();
    });
});
