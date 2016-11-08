import { EventEmitter, TemplateRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { DynamicFormControlModel, DynamicFormControlComponent } from "@ng2-dynamic-forms/core";
export declare const DYNAMIC_FORM_UI_BASIC: string;
export declare class DynamicFormBasicComponent extends DynamicFormControlComponent {
    bindId: boolean;
    controlGroup: FormGroup;
    hasErrorMessaging: boolean;
    model: DynamicFormControlModel;
    nestedTemplate: TemplateRef<any>;
    blur: EventEmitter<FocusEvent>;
    change: EventEmitter<Event>;
    focus: EventEmitter<FocusEvent>;
    customTemplate: any;
    readonly type: string;
    constructor();
}
