import {Component} from "@angular/core";
import {Input} from "@angular/core";
import {REACTIVE_FORM_DIRECTIVES, FormGroup} from "@angular/forms";
import {
    DynamicFormControlComponent,
    DynamicFormControlModel,
    DYNAMIC_FORM_CONTROL_TYPE_RADIO,
} from "@ng2-dynamic-forms/core";

export const DYNAMIC_FORM_UI_BOOTSTRAP = "BOOTSTRAP";

@Component({

    directives: [REACTIVE_FORM_DIRECTIVES],
    moduleId: module.id,
    selector: "dynamic-form-bootstrap-control",
    templateUrl: "./dynamic-form-bootstrap.component.html"
})

export class DynamicFormBootstrapComponent extends DynamicFormControlComponent {

    @Input() model: DynamicFormControlModel<any>;
    @Input() form: FormGroup;

    incompatibilities: Array<string> = [DYNAMIC_FORM_CONTROL_TYPE_RADIO];
    type: string = DYNAMIC_FORM_UI_BOOTSTRAP;

    constructor() {
        super();
    }
}
