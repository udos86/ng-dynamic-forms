import { Component, Input, Output, EventEmitter, QueryList, ContentChildren } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    DynamicFormControlModel,
    DynamicInputModel,
    DynamicFormControlComponent,
    DynamicFormControlEvent,
    DynamicFormRelationService,
    DynamicTemplateDirective
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
    @Input() nestedTemplates: QueryList<DynamicTemplateDirective>;

    @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ContentChildren(DynamicTemplateDirective) templates: QueryList<DynamicTemplateDirective>;

    readonly type: string = DYNAMIC_FORM_UI_BASIC;

    constructor(relationService: DynamicFormRelationService) {
        super(relationService);
    }

    get hasList(): boolean { // needed for AOT
        return (this.model as DynamicInputModel).list !== null;
    }
}