import {Component, Input, Output, EventEmitter, ContentChild, TemplateRef} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {DynamicFormControlComponent, DynamicFormControlModel} from "@ng2-dynamic-forms/core";

export const DYNAMIC_FORM_UI_SEMANTIC = "SEMANTIC";

@Component({

    moduleId: module.id,
    selector: "dynamic-form-semantic-control",
    templateUrl: "./dynamic-form-semantic.component.html"
})

export class DynamicFormSemanticComponent extends DynamicFormControlComponent {

    @Input() bindId: boolean = true;
    @Input() controlGroup: FormGroup;
    @Input() model: DynamicFormControlModel;

    @Output() blur: EventEmitter<any> = new EventEmitter<any>();
    @Output() focus: EventEmitter<any> = new EventEmitter<any>();

    @ContentChild(TemplateRef) customTemplate;

    readonly type: string = DYNAMIC_FORM_UI_SEMANTIC;

    constructor() {
        super();
    }
}