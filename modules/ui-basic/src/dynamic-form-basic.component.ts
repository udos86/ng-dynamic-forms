import {Component, Input, Output, EventEmitter, ContentChild, TemplateRef} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {
    DynamicFormControlModel,
    DynamicFormControlComponent,
    DynamicFormControlEvent,
    DynamicFormRelationService
} from "@ng2-dynamic-forms/core";

export const DYNAMIC_FORM_UI_BASIC = "BASIC";

@Component({

    moduleId: module.id,
    selector: "dynamic-form-basic-control",
    templateUrl: "./dynamic-form-basic.component.html"
})

export class DynamicFormBasicComponent extends DynamicFormControlComponent {

    @Input() bindId: boolean = true;
    @Input() controlGroup: FormGroup;
    @Input() hasErrorMessaging: boolean = false;
    @Input() model: DynamicFormControlModel;
    @Input() nestedTemplate: TemplateRef<any>;

    @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ContentChild(TemplateRef) customTemplate;

    readonly type: string = DYNAMIC_FORM_UI_BASIC;

    constructor(relationService: DynamicFormRelationService) {
        super(relationService);
    }
}