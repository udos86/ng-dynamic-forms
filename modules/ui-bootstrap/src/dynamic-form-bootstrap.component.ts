import {Component, Input, ContentChild, TemplateRef} from "@angular/core";
import {REACTIVE_FORM_DIRECTIVES, FormGroup} from "@angular/forms";
import {DynamicFormControlComponent, DynamicFormControlModel} from "@ng2-dynamic-forms/core";

export const DYNAMIC_FORM_UI_BOOTSTRAP = "BOOTSTRAP";

@Component({

    directives: [REACTIVE_FORM_DIRECTIVES],
    moduleId: module.id,
    selector: "dynamic-form-bootstrap-control",
    templateUrl: "./dynamic-form-bootstrap.component.html"
})

export class DynamicFormBootstrapComponent extends DynamicFormControlComponent {

    @Input() controlGroup: FormGroup;
    @Input() model: DynamicFormControlModel;

    @ContentChild(TemplateRef) customTemplate;
    
    type: string = DYNAMIC_FORM_UI_BOOTSTRAP;

    constructor() {
        super();
    }
}
