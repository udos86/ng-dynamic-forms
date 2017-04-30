import { Component, Input, Output, EventEmitter, QueryList, ContentChildren } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    DynamicFormControlComponent,
    DynamicFormControlModel,
    DynamicFormControlEvent,
    DynamicFormRelationService,
    DynamicTemplateDirective
} from "@ng2-dynamic-forms/core";

export const enum NGBootstrapFormControlType {

    Array = 1,
    Checkbox = 2,
    DatePicker = 3,
    Group = 4,
    Input = 5,
    RadioGroup = 6,
    Select = 7,
    TextArea = 8,
    TimePicker = 9
}

@Component({

    moduleId: module.id,
    selector: "dynamic-form-ng-bootstrap-control",
    templateUrl: "./dynamic-form-ng-bootstrap.component.html"
})

export class DynamicFormNGBootstrapComponent extends DynamicFormControlComponent {

    @Input() bindId: boolean = true;

    @Input()set controlGroup(group: FormGroup) {
        this.group = group;
        console.warn("[controlGroup] is deprecated. Use [group] instead.");
    }

    @Input() asBootstrapFormGroup: boolean = true;
    @Input() group: FormGroup;
    @Input() hasErrorMessaging: boolean = false;
    @Input() model: DynamicFormControlModel;
    @Input() nestedTemplates: QueryList<DynamicTemplateDirective>;

    @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ContentChildren(DynamicTemplateDirective) templates: QueryList<DynamicTemplateDirective>;

    constructor(relationService: DynamicFormRelationService) {
        super(relationService);
    }
}