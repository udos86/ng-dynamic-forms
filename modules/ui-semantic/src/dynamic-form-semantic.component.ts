import {Component, forwardRef, Input, ContentChild, TemplateRef} from "@angular/core";
import {REACTIVE_FORM_DIRECTIVES, FormGroup} from "@angular/forms";
import {DynamicFormControlComponent, DynamicFormControlModel} from "@ng2-dynamic-forms/core";

export const DYNAMIC_FORM_UI_SEMANTIC = "SEMANTIC";

@Component({

    directives: [REACTIVE_FORM_DIRECTIVES],
    moduleId: module.id,
    selector: "dynamic-form-semantic-control",
    templateUrl: "./dynamic-form-semantic.component.html"
})

export class DynamicFormSemanticComponent extends DynamicFormControlComponent {

    @Input() controlGroup: FormGroup;
    @Input() model: DynamicFormControlModel;

    @ContentChild(TemplateRef) customTemplate;

    type: string = DYNAMIC_FORM_UI_SEMANTIC;

    constructor() {
        super();
    }
}