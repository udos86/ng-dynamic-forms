import {Component} from "@angular/core";
import {Input} from "@angular/core";
import {ControlGroup} from "@angular/common";
import {DynamicFormControlModel, DYNAMIC_FORM_CONTROL_TYPE_RADIO} from "@ng2-dynamic-forms/core";
import {DynamicFormControlComponent} from "@ng2-dynamic-forms/core";

export const DYNAMIC_FORM_UI_BASIC = "BASIC";

@Component({
    
    moduleId: module.id,
    selector: "dynamic-form-basic-control",
    templateUrl: "./dynamic-form-basic.component.html"
})

export class DynamicFormBasicComponent extends DynamicFormControlComponent {

    @Input() model: DynamicFormControlModel<any>;
    @Input() form: ControlGroup;

    incompatibilities: Array<string> = [DYNAMIC_FORM_CONTROL_TYPE_RADIO];
    type: string = DYNAMIC_FORM_UI_BASIC;

    constructor() {
        super();
    }
}
