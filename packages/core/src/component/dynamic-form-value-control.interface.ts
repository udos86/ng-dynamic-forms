import { EventEmitter, QueryList } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { DynamicFormControlCustomEvent } from "./dynamic-form-control.event";
import { DynamicFormControlValue, DynamicFormValueControlModel } from "../model/dynamic-form-value-control.model";
import { DynamicCheckboxGroupModel } from "../model/checkbox/dynamic-checkbox-group.model";
import { DynamicFormLayout } from "../service/dynamic-form-layout.service";
import { DynamicTemplateDirective } from "../directive/dynamic-template.directive";

export interface DynamicFormValueControlInterface {

    bindId: boolean;
    group: FormGroup;
    layout: DynamicFormLayout;
    model: DynamicFormValueControlModel<DynamicFormControlValue> | DynamicCheckboxGroupModel;

    blur: EventEmitter<any>;
    change: EventEmitter<any>;
    customEvent?: EventEmitter<DynamicFormControlCustomEvent>;
    focus: EventEmitter<any>;

    templates?: QueryList<DynamicTemplateDirective> | null;
}