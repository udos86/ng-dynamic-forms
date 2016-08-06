import {Component, Input, ContentChild, TemplateRef} from "@angular/core";
import {REACTIVE_FORM_DIRECTIVES, FormGroup} from "@angular/forms";
import {DynamicFormControlComponent, DynamicFormControlModel} from "@ng2-dynamic-forms/core";
import {Checkbox, Dropdown, InputText, InputTextarea, RadioButton, Spinner} from "primeng/primeng";

export const DYNAMIC_FORM_UI_PRIME_NG = "PRIME_NG";

@Component({

    directives: [REACTIVE_FORM_DIRECTIVES, Checkbox, Dropdown, InputText, InputTextarea, RadioButton, Spinner],
    moduleId: module.id,
    selector: "dynamic-form-primeng-control",
    templateUrl: "./dynamic-form-primeng.component.html"
})

export class DynamicFormPrimeNGComponent extends DynamicFormControlComponent {

    @Input() controlGroup: FormGroup;
    @Input() model: DynamicFormControlModel;

    @ContentChild(TemplateRef) customTemplate;

    type: string = DYNAMIC_FORM_UI_PRIME_NG;

    constructor() {
        super();
    }
}