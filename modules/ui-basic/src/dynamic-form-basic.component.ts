import {Component, Input, Output, EventEmitter, ContentChild, TemplateRef} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {DynamicFormControlModel, DynamicFormControlComponent} from "@ng2-dynamic-forms/core";

export const DYNAMIC_FORM_UI_BASIC = "BASIC";

@Component({

    moduleId: module.id,
    selector: "dynamic-form-basic-control",
    templateUrl: "./dynamic-form-basic.component.html"
})

export class DynamicFormBasicComponent extends DynamicFormControlComponent {

    @Input() bindId: boolean = true;
    @Input() controlGroup: FormGroup;
    @Input() model: DynamicFormControlModel;
    @Input() nestedTemplate: TemplateRef<any>;

    @Output() blur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
    @Output() focus: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

    @ContentChild(TemplateRef) customTemplate;

    readonly type: string = DYNAMIC_FORM_UI_BASIC;

    constructor() {
        super();
    }
}