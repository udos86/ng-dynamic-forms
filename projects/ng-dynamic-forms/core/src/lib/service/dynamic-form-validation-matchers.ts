import { InjectionToken } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { DynamicFormHook } from "../model/misc/dynamic-form-control-validation.model";

export type DynamicErrorMessagesMatcher = (control: AbstractControl, model: DynamicFormControlModel, hasFocus: boolean) => boolean;

export const DEFAULT_ERROR_STATE_MATCHER: DynamicErrorMessagesMatcher =
    (control: AbstractControl, model: DynamicFormControlModel, hasFocus: boolean) => {
        return control.touched && !hasFocus;
    };

export const CHANGE_ERROR_STATE_MATCHER: DynamicErrorMessagesMatcher =
    (control: AbstractControl, model: DynamicFormControlModel, hasFocus: boolean) => {
        return (model.updateOn === DynamicFormHook.Change || model.updateOn === null) ? control.dirty : control.touched && !hasFocus;
    };

export const DYNAMIC_ERROR_MESSAGES_MATCHER = new InjectionToken<DynamicErrorMessagesMatcher>("DYNAMIC_ERROR_MESSAGES_MATCHER");
