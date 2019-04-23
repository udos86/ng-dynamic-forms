import { InjectionToken, Injector, StaticProvider } from "@angular/core";
import { FormControl } from "@angular/forms";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { DynamicFormValidationService } from "./dynamic-form-validation.service";
import {
    STATE_DISABLED,
    STATE_ENABLED,
    STATE_HIDDEN,
    STATE_OPTIONAL,
    STATE_REQUIRED,
    STATE_VISIBLE
} from "../model/misc/dynamic-form-control-relation.model";
import { isObject } from "../utils/core.utils";

export interface DynamicFormControlMatcher {

    matchState: string;
    opposingState: string | null;

    onMatch(hasMatch: boolean, model: DynamicFormControlModel, control: FormControl, injector: Injector): void;
}

export const DYNAMIC_MATCHERS = new InjectionToken<DynamicFormControlMatcher>("DYNAMIC_MATCHERS");

export const DisabledMatcher: DynamicFormControlMatcher = {

    matchState: STATE_DISABLED,
    opposingState: STATE_ENABLED,
    onMatch(hasMatch: boolean, model: DynamicFormControlModel): void {
        model.disabledUpdates.next(hasMatch);
    }
};

export const HiddenMatcher: DynamicFormControlMatcher = {

    matchState: STATE_HIDDEN,
    opposingState: STATE_VISIBLE,
    onMatch(hasMatch: boolean, model: DynamicFormControlModel): void {
        model.hidden = hasMatch;
    }
};

export const RequiredMatcher: DynamicFormControlMatcher = {

    matchState: STATE_REQUIRED,
    opposingState: STATE_OPTIONAL,
    onMatch(hasMatch: boolean, model: DynamicFormControlModel, control: FormControl, injector: Injector): void {

        let validatorsConfig = null;

        if (hasMatch) {

            validatorsConfig = isObject(model.validators) ? {
                ...model.validators,
                required: null
            } : {required: null};

        } else {

            if (isObject(model.validators)) {

                delete model.validators["required"];
                validatorsConfig = {...model.validators};
            }
        }

        injector.get(DynamicFormValidationService).updateValidators(validatorsConfig, control, model);
    }
};

export const DISABLED_MATCHER: StaticProvider = {
    provide: DYNAMIC_MATCHERS,
    useValue: DisabledMatcher,
    multi: true
};

export const HIDDEN_MATCHER: StaticProvider = {
    provide: DYNAMIC_MATCHERS,
    useValue: HiddenMatcher,
    multi: true
};

export const REQUIRED_MATCHER: StaticProvider = {
    provide: DYNAMIC_MATCHERS,
    useValue: RequiredMatcher,
    multi: true
};
