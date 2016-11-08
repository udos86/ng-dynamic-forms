"use strict";
var testing_1 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var core_1 = require("@ng2-dynamic-forms/core");
var checkbox_1 = require("primeng/components/checkbox/checkbox");
var dropdown_1 = require("primeng/components/dropdown/dropdown");
var inputtext_1 = require("primeng/components/inputtext/inputtext");
var inputtextarea_1 = require("primeng/components/inputtextarea/inputtextarea");
var radiobutton_1 = require("primeng/components/radiobutton/radiobutton");
var spinner_1 = require("primeng/components/spinner/spinner");
var dynamic_form_primeng_component_1 = require("./dynamic-form-primeng.component");
describe("DynamicFormPrimeNGComponent test suite", function () {
    var formModel = [new core_1.DynamicInputModel({ id: "test" })], formGroup, fixture, component;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                forms_1.ReactiveFormsModule,
                core_1.DynamicFormsCoreModule.forRoot(),
                checkbox_1.CheckboxModule,
                dropdown_1.DropdownModule,
                inputtext_1.InputTextModule,
                inputtextarea_1.InputTextareaModule,
                radiobutton_1.RadioButtonModule,
                spinner_1.SpinnerModule
            ],
            declarations: [dynamic_form_primeng_component_1.DynamicFormPrimeNGComponent]
        });
        testing_1.TestBed.compileComponents();
    }));
    beforeEach(testing_1.inject([core_1.DynamicFormService], function (service) {
        formGroup = service.createFormGroup(formModel);
        fixture = testing_1.TestBed.createComponent(dynamic_form_primeng_component_1.DynamicFormPrimeNGComponent);
        component = fixture.componentInstance;
        component.controlGroup = formGroup;
        component.model = formModel[0];
        fixture.detectChanges();
    }));
    it("tests if component initializes correctly", function () {
        expect(component.type).toEqual(dynamic_form_primeng_component_1.DYNAMIC_FORM_UI_PRIME_NG);
        expect(component.control instanceof forms_1.FormControl).toBe(true);
        expect(component.controlGroup instanceof forms_1.FormGroup).toBe(true);
        expect(component.model instanceof core_1.DynamicFormControlModel).toBe(true);
        expect(component.hasErrorMessaging).toBe(false);
        expect(component.onControlValueChanges).toBeDefined();
        expect(component.onModelDisabledUpdates).toBeDefined();
        expect(component.onModelValueUpdates).toBeDefined();
        expect(component.blur).toBeDefined();
        expect(component.change).toBeDefined();
        expect(component.focus).toBeDefined();
        expect(component.onBlur).toBeDefined();
        expect(component.onChange).toBeDefined();
        expect(component.onFocus).toBeDefined();
        expect(component.isCheckbox).toBe(false);
        expect(component.isCheckboxGroup).toBe(false);
        expect(component.isRadioGroup).toBe(false);
        expect(component.isValid).toBe(true);
        expect(component.isInvalid).toBe(false);
    });
});

//# sourceMappingURL=dynamic-form-primeng.component.spec.js.map
