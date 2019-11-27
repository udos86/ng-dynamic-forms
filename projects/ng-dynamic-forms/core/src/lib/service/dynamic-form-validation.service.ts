import { Injectable, Inject, Optional } from "@angular/core";
import {
    AbstractControl,
    AsyncValidatorFn,
    ValidatorFn,
    Validators,
    NG_VALIDATORS,
    NG_ASYNC_VALIDATORS
} from "@angular/forms";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import {
    DynamicFormHook,
    DynamicValidatorDescriptor,
    DynamicValidatorsConfig
} from "../model/misc/dynamic-form-control-validation.model";
import { isObject, isString } from "../utils/core.utils";
import { DYNAMIC_VALIDATORS, Validator, ValidatorFactory, ValidatorsToken } from "./dynamic-form-validators";
import {
    DEFAULT_ERROR_STATE_MATCHER,
    DYNAMIC_ERROR_MESSAGES_MATCHER,
    DynamicErrorMessagesMatcher
} from "./dynamic-form-validation-matchers";

@Injectable({
    providedIn: "root"
})
export class DynamicFormValidationService {

    constructor(@Optional() @Inject(NG_VALIDATORS) private _NG_VALIDATORS: ValidatorFn[],
                @Optional() @Inject(NG_ASYNC_VALIDATORS) private _NG_ASYNC_VALIDATORS: AsyncValidatorFn[],
                @Optional() @Inject(DYNAMIC_VALIDATORS) private _DYNAMIC_VALIDATORS: Map<string, Validator | ValidatorFactory>,
                @Optional() @Inject(DYNAMIC_ERROR_MESSAGES_MATCHER) private _DYNAMIC_ERROR_MESSAGES_MATCHER: DynamicErrorMessagesMatcher) {
    }

    private getValidatorFn(validatorName: string, validatorArgs: any = null,
                           validatorsToken: ValidatorsToken = this._NG_VALIDATORS): Validator | never {

        let validatorFn: ValidatorFactory | Validator | undefined;

        if (Validators.hasOwnProperty(validatorName)) { // Built-in Angular Validators

            validatorFn = (Validators as any)[validatorName];

        } else { // Custom Validators

            if (this._DYNAMIC_VALIDATORS && this._DYNAMIC_VALIDATORS.has(validatorName)) {
                validatorFn = this._DYNAMIC_VALIDATORS.get(validatorName);

            } else if (validatorsToken) {
                validatorFn = validatorsToken.find(validator => validator.name === validatorName);
            }
        }

        if (validatorFn === undefined) { // throw when no validator could be resolved
            throw new Error(
                `validator "${validatorName}" is not provided via NG_VALIDATORS, NG_ASYNC_VALIDATORS or DYNAMIC_FORM_VALIDATORS`);
        }

        if (validatorArgs !== null) {
            return (validatorFn as ValidatorFactory)(validatorArgs);
        }

        return validatorFn as Validator;
    }

    private getValidatorFns(validatorsConfig: DynamicValidatorsConfig,
                            validatorsToken: ValidatorsToken = this._NG_VALIDATORS): Validator[] {

        let validatorFns: Validator[] = [];

        if (isObject(validatorsConfig)) {

            validatorFns = Object.keys(validatorsConfig).map(validatorConfigKey => {

                const validatorConfigValue = (validatorsConfig as DynamicValidatorsConfig)[validatorConfigKey];

                if (this.isValidatorDescriptor(validatorConfigValue)) {

                    const descriptor = validatorConfigValue as DynamicValidatorDescriptor;

                    return this.getValidatorFn(descriptor.name, descriptor.args, validatorsToken);
                }

                return this.getValidatorFn(validatorConfigKey, validatorConfigValue, validatorsToken);
            });
        }

        return validatorFns;
    }

    getValidator(validatorName: string, validatorArgs: any = null): ValidatorFn {
        return this.getValidatorFn(validatorName, validatorArgs) as ValidatorFn;
    }

    getAsyncValidator(validatorName: string, validatorArgs: any = null): AsyncValidatorFn {
        return this.getValidatorFn(validatorName, validatorArgs, this._NG_ASYNC_VALIDATORS) as AsyncValidatorFn;
    }

    getValidators(validatorsConfig: DynamicValidatorsConfig): ValidatorFn[] {
        return this.getValidatorFns(validatorsConfig) as ValidatorFn[];
    }

    getAsyncValidators(asyncValidatorsConfig: DynamicValidatorsConfig): AsyncValidatorFn[] {
        return this.getValidatorFns(asyncValidatorsConfig, this._NG_ASYNC_VALIDATORS) as AsyncValidatorFn[];
    }

    updateValidators(validatorsConfig: DynamicValidatorsConfig | null, control: AbstractControl,
                     model: DynamicFormControlModel): void {

        model.validators = validatorsConfig;

        if (validatorsConfig === null) {

            control.clearValidators();

        } else {
            control.setValidators(this.getValidators(validatorsConfig));
        }

        control.updateValueAndValidity();
    }

    updateAsyncValidators(asyncValidatorsConfig: DynamicValidatorsConfig | null, control: AbstractControl,
                          model: DynamicFormControlModel): void {

        model.asyncValidators = asyncValidatorsConfig;

        if (asyncValidatorsConfig === null) {

            control.clearAsyncValidators();

        } else {
            control.setAsyncValidators(this.getAsyncValidators(asyncValidatorsConfig));
        }

        control.updateValueAndValidity();
    }

    showErrorMessages(control: AbstractControl, model: DynamicFormControlModel, hasFocus: boolean): boolean {

        const precondition = control.invalid && model.hasErrorMessages;
        const matcher = this._DYNAMIC_ERROR_MESSAGES_MATCHER ? this._DYNAMIC_ERROR_MESSAGES_MATCHER(control, model, hasFocus) :
            DEFAULT_ERROR_STATE_MATCHER(control, model, hasFocus);

        return precondition && matcher;
    }

    parseErrorMessageConfig(template: string, model: DynamicFormControlModel, error: any = null): string {

        return template.replace(/{{\s*(.+?)\s*}}/mg, (_match: string, expression: string) => {

            let propertySource: any = model;
            let propertyName: string = expression;

            if (expression.indexOf("validator.") >= 0 && error) {

                propertySource = error;
                propertyName = expression.replace("validator.", "");
            }

            return propertySource[propertyName] !== null && propertySource[propertyName] !== undefined ?
                propertySource[propertyName] : null;
        });
    }

    createErrorMessages(control: AbstractControl, model: DynamicFormControlModel): string[] {

        const messages: string[] = [];

        if (model.hasErrorMessages) {

            const messagesConfig = model.errorMessages as DynamicValidatorsConfig;

            Object.keys(control.errors || {}).forEach(validationErrorKey => {

                let messageKey = validationErrorKey;

                if (validationErrorKey === "minlength" || validationErrorKey === "maxlength") {
                    messageKey = messageKey.replace("length", "Length");
                }

                if (messagesConfig.hasOwnProperty(messageKey)) {

                    const validationError = control.getError(validationErrorKey);
                    const messageTemplate = messagesConfig[messageKey] as string;

                    messages.push(this.parseErrorMessageConfig(messageTemplate, model, validationError));
                }
            });
        }

        return messages;
    }

    isFormHook(value: any): boolean {
        return isString(value) && Object.values(DynamicFormHook).indexOf(value) !== -1;
    }

    isValidatorDescriptor(value: any): boolean {

        if (isObject(value)) {
            return value.hasOwnProperty("name") && value.hasOwnProperty("args");
        }

        return false;
    }
}
