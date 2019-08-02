import { InjectionToken, Injector, ValueProvider } from "@angular/core";
import { FormControl } from "@angular/forms";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { DynamicFormValidationService } from "./dynamic-form-validation.service";
import { isObject } from "../utils/core.utils";

export const MATCH_DISABLED = "DISABLED";
export const MATCH_ENABLED = "ENABLED";
export const MATCH_HIDDEN = "HIDDEN";
export const MATCH_OPTIONAL = "OPTIONAL";
export const MATCH_REQUIRED = "REQUIRED";
export const MATCH_VISIBLE = "VISIBLE";

export const AND_OPERATOR = "AND";
export const OR_OPERATOR = "OR";

export interface DynamicFormControlMatcher {

    match: string;
    opposingMatch: string | null;

    onChange(hasMatch: boolean, model: DynamicFormControlModel, control: FormControl, injector: Injector): void;
}

export const DYNAMIC_MATCHERS = new InjectionToken<DynamicFormControlMatcher>("DYNAMIC_MATCHERS");

export const DisabledMatcher: DynamicFormControlMatcher = {

    match: MATCH_DISABLED,
    opposingMatch: MATCH_ENABLED,
    onChange(hasMatch: boolean, model: DynamicFormControlModel): void {
        model.disabledUpdates.next(hasMatch);
    }
};

export const HiddenMatcher: DynamicFormControlMatcher = {

    match: MATCH_HIDDEN,
    opposingMatch: MATCH_VISIBLE,
    onChange(hasMatch: boolean, model: DynamicFormControlModel): void {
        model.hidden = hasMatch;
    }
};

export const RequiredMatcher: DynamicFormControlMatcher = {

    match: MATCH_REQUIRED,
    opposingMatch: MATCH_OPTIONAL,
    onChange(hasMatch: boolean, model: DynamicFormControlModel, control: FormControl, injector: Injector): void {

        let validatorsConfig = null;

        if (hasMatch) {

            validatorsConfig = isObject(model.validators) ? {...model.validators, required: null} : {required: null};

        } else {

            if (isObject(model.validators)) {

                delete model.validators["required"];
                validatorsConfig = {...model.validators};
            }
        }

        injector.get(DynamicFormValidationService).updateValidators(validatorsConfig, control, model);
    }
};

export const DISABLED_MATCHER: ValueProvider = {
    provide: DYNAMIC_MATCHERS,
    useValue: DisabledMatcher,
    multi: true
};

export const HIDDEN_MATCHER: ValueProvider = {
    provide: DYNAMIC_MATCHERS,
    useValue: HiddenMatcher,
    multi: true
};

export const REQUIRED_MATCHER: ValueProvider = {
    provide: DYNAMIC_MATCHERS,
    useValue: RequiredMatcher,
    multi: true
};

export const DYNAMIC_MATCHER_PROVIDERS = [DISABLED_MATCHER, HIDDEN_MATCHER, REQUIRED_MATCHER];
