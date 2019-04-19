import { EventEmitter, QueryList } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { DynamicFormControlCustomEvent } from "./dynamic-form-control.event";
import { DynamicFormLayout } from "../service/dynamic-form-layout.service";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { DynamicTemplateDirective } from "../directive/dynamic-template.directive";

export interface DynamicFormControl {

    group: FormGroup;
    layout: DynamicFormLayout;
    model: DynamicFormControlModel;
    templates: QueryList<DynamicTemplateDirective> | DynamicTemplateDirective[] | undefined;

    blur: EventEmitter<any>;
    change: EventEmitter<any>;
    customEvent?: EventEmitter<DynamicFormControlCustomEvent> | undefined;
    focus: EventEmitter<any>;
}