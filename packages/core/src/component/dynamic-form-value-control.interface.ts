import { EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { DynamicFormControlCustomEvent } from "./dynamic-form-control.event";
import { DynamicFormControlValue, DynamicFormValueControlModel } from "../model/dynamic-form-value-control.model";
import { DynamicFormLayout } from "../service/dynamic-form-layout.service";

export interface DynamicFormValueControlInterface {

    bindId: boolean;
    group: FormGroup;
    layout: DynamicFormLayout;
    model: DynamicFormValueControlModel<DynamicFormControlValue>;

    blur: EventEmitter<any>;
    change: EventEmitter<any>;
    customEvent?: EventEmitter<DynamicFormControlCustomEvent>;
    focus: EventEmitter<any>;
}