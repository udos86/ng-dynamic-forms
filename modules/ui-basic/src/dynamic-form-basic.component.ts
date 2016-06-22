import {Component} from "@angular/core";
import {Input} from "@angular/core";
import {REACTIVE_FORM_DIRECTIVES, FormGroup} from "@angular/forms";
import {DynamicFormControlModel, DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP} from "@ng2-dynamic-forms/core";
import {DynamicFormControlComponent} from "@ng2-dynamic-forms/core";

export const DYNAMIC_FORM_UI_BASIC = "BASIC";

@Component({
    
    directives: [REACTIVE_FORM_DIRECTIVES],
    moduleId: module.id,
    selector: "dynamic-form-basic-control",
    templateUrl: "./dynamic-form-basic.component.html"
})

export class DynamicFormBasicComponent extends DynamicFormControlComponent {

    @Input() model: DynamicFormControlModel<any>;
    @Input() form: FormGroup;

    incompatibilities: Array<string> = [/*DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP*/];
    type: string = DYNAMIC_FORM_UI_BASIC;

    constructor() {
        super();
    }
}
