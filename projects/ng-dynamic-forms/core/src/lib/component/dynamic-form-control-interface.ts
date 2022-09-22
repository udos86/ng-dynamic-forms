import { EventEmitter, QueryList } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { DynamicFormControlCustomEvent } from "./dynamic-form-control-event";
import { DynamicFormLayout } from "../service/dynamic-form-layout.service";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { DynamicFormControlLayout } from "../model/misc/dynamic-form-control-layout.model";
import { DynamicTemplateDirective } from "../directive/dynamic-template.directive";

export interface DynamicFormControl {
    formLayout?: DynamicFormLayout;
    group: UntypedFormGroup;
    layout?: DynamicFormControlLayout;
    model: DynamicFormControlModel;
    templates?: QueryList<DynamicTemplateDirective> | DynamicTemplateDirective[];

    blur: EventEmitter<any>;
    change: EventEmitter<any>;
    customEvent?: EventEmitter<DynamicFormControlCustomEvent> | undefined;
    focus: EventEmitter<any>;
}
