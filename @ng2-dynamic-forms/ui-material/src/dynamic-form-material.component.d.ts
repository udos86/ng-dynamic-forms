import { EventEmitter, TemplateRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MdCheckbox, MdInput, MdRadioGroup } from "@angular/material";
import { DynamicFormControlModel } from "@ng2-dynamic-forms/core";
import { DynamicFormControlComponent } from "@ng2-dynamic-forms/core";
export declare const DYNAMIC_FORM_UI_MATERIAL: string;
export declare class DynamicFormMaterialComponent extends DynamicFormControlComponent {
    bindId: boolean;
    controlGroup: FormGroup;
    model: DynamicFormControlModel;
    nestedTemplate: TemplateRef<any>;
    blur: EventEmitter<FocusEvent>;
    change: EventEmitter<Event>;
    focus: EventEmitter<FocusEvent>;
    customTemplate: any;
    mdCheckbox: MdCheckbox;
    mdInput: MdInput;
    mdRadioGroup: MdRadioGroup;
    readonly type: string;
    constructor();
}
