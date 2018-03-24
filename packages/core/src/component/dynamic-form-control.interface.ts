import { EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { DynamicFormControlCustomEvent } from "./dynamic-form-control.event";
import { DynamicFormLayout } from "../service/dynamic-form-layout.service";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";

export interface DynamicFormControl {

    bindId: boolean;
    group: FormGroup;
    layout: DynamicFormLayout;
    model: DynamicFormControlModel;

    blur: EventEmitter<any>;
    change: EventEmitter<any>;
    customEvent?: EventEmitter<DynamicFormControlCustomEvent>;
    focus: EventEmitter<any>;
}