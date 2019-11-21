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
    DynamicValidatorDescriptor,
    DynamicValidatorsConfig
} from "../model/misc/dynamic-form-control-validation.model";
import { isObject, isString } from "../utils/core.utils";
import { DYNAMIC_VALIDATORS, Validator, ValidatorFactory, ValidatorsToken } from "./dynamic-form-validators";

@Injectable({
    providedIn: "root"
})
export class DynamicFormValidationService {

    constructor(@Optional() @Inject(NG_VALIDATORS) private VALIDATORS: ValidatorFn[],
                @Optional() @Inject(NG_ASYNC_VALIDATORS) private ASYNC_VALIDATORS: AsyncValidatorFn[],
                @Optional() @Inject(DYNAMIC_VALIDATORS) private DYNAMIC_VALIDATORS_MAP: Map<string, Validator | ValidatorFactory>) {
    }


    private getValidatorFn(validatorName: string, validatorArgs: any = null,
                           validatorsToken: ValidatorsToken = this.VALIDATORS): Validator | never {

        let validatorFn: ValidatorFactory | Validator | undefined;

        if (Validators.hasOwnProperty(validatorName)) { // Built-in Angular Validators

            validatorFn = (Validators as any)[validatorName];

        } else { // Custom Validators

            if (this.DYNAMIC_VALIDATORS_MAP && this.DYNAMIC_VALIDATORS_MAP.has(validatorName)) {
                validatorFn = this.DYNAMIC_VALIDATORS_MAP.get(validatorName);

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
                            validatorsToken: ValidatorsToken = this.VALIDATORS): Validator[] {

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


    private parseErrorMessageConfig(template: string, model: DynamicFormControlModel, error: any = null): string {

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


    getValidator(validatorName: string, validatorArgs: any = null): ValidatorFn {
        return this.getValidatorFn(validatorName, validatorArgs) as ValidatorFn;
    }


    getAsyncValidator(validatorName: string, validatorArgs: any = null): AsyncValidatorFn {
        return this.getValidatorFn(validatorName, validatorArgs, this.ASYNC_VALIDATORS) as AsyncValidatorFn;
    }


    getValidators(validatorsConfig: DynamicValidatorsConfig): ValidatorFn[] {
        return this.getValidatorFns(validatorsConfig) as ValidatorFn[];
    }


    getAsyncValidators(asyncValidatorsConfig: DynamicValidatorsConfig): AsyncValidatorFn[] {
        return this.getValidatorFns(asyncValidatorsConfig, this.ASYNC_VALIDATORS) as AsyncValidatorFn[];
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
        return isString(value) && ["blur", "change", "submit"].indexOf(value) !== -1;
    }


    isValidatorDescriptor(value: any): boolean {

        if (isObject(value)) {
            return value.hasOwnProperty("name") && value.hasOwnProperty("args");
        }

        return false;
    }
}
