import {Component, forwardRef, ContentChild, TemplateRef} from "@angular/core";
import {Input} from "@angular/core";
import {REACTIVE_FORM_DIRECTIVES, FormGroup} from "@angular/forms";
import {DynamicFormControlModel, DynamicFormControlComponent} from "@ng2-dynamic-forms/core";

export const DYNAMIC_FORM_UI_BASIC = "BASIC";

@Component({

    directives: [REACTIVE_FORM_DIRECTIVES, forwardRef(() => DynamicFormBasicComponent)],
    moduleId: module.id,
    selector: "dynamic-form-basic-control",
    templateUrl: "./dynamic-form-basic.component.html"
})

export class DynamicFormBasicComponent extends DynamicFormControlComponent {

    @Input() controlGroup: FormGroup;
    @Input() model: DynamicFormControlModel<any>;

    @ContentChild(TemplateRef) contentTemplate;

    type: string = DYNAMIC_FORM_UI_BASIC;

    constructor() {
        super();
    }
}
